const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs').promises;
const jsonStore = require('../database/jsonStore');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

async function saveImageWithHash(buffer, originalName) {
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  const ext = path.extname(originalName).toLowerCase();
  
  // Para SVG, salvar como SVG sem redimensionar
  if (ext === '.svg') {
    const filename = `${hash}.svg`;
    const filepath = path.join(__dirname, '../../uploads', filename);
    await fs.writeFile(filepath, buffer);
    return filename;
  }
  
  // Para outras imagens, processar com Sharp
  const filename = `${hash}.png`;
  const filepath = path.join(__dirname, '../../uploads', filename);
  
  await sharp(buffer)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(filepath);
    
  return filename;
}

router.get('/', async (req, res) => {
  try {
    const applications = await jsonStore.getApplications();
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', upload.single('icon'), async (req, res) => {
  try {
    const { name, url } = req.body;
    
    if (!name || !url) {
      return res.status(400).json({ error: 'Name and URL are required' });
    }
    
    let image = null;
    if (req.file) {
      image = await saveImageWithHash(req.file.buffer, req.file.originalname);
    }
    
    const applicationData = {
      name,
      url,
      image,
      order: Date.now()
    };
    
    const application = await jsonStore.saveApplication(applicationData);
    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/reorder', async (req, res) => {
  try {
    const { applications } = req.body;
    
    if (!Array.isArray(applications)) {
      return res.status(400).json({ error: 'Applications must be an array' });
    }
    
    await jsonStore.updateApplicationOrder(applications);
    res.json({ success: true });
  } catch (error) {
    console.error('Error reordering applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', upload.single('icon'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url } = req.body;
    
    if (!name || !url) {
      return res.status(400).json({ error: 'Name and URL are required' });
    }
    
    const existingApp = await jsonStore.findApplicationById(id);
    if (!existingApp) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    let image = existingApp.image;
    
    if (req.file) {
      // Delete old image if exists
      if (existingApp.image) {
        try {
          await fs.unlink(path.join(__dirname, '../../uploads', existingApp.image));
        } catch (err) {
          console.warn('Could not delete old image file:', err.message);
        }
      }
      
      image = await saveImageWithHash(req.file.buffer, req.file.originalname);
    }
    
    const applicationData = {
      ...existingApp,
      name,
      url,
      image,
      updatedAt: new Date().toISOString()
    };
    
    const application = await jsonStore.updateApplication(id, applicationData);
    res.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await jsonStore.findApplicationById(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    if (application.image) {
      try {
        await fs.unlink(path.join(__dirname, '../../uploads', application.image));
      } catch (err) {
        console.warn('Could not delete image file:', err.message);
      }
    }
    
    await jsonStore.deleteApplication(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;