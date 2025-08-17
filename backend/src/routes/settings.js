const express = require('express');
const jsonStore = require('../database/jsonStore');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const settings = await jsonStore.getSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { language, phosphorIcons, customTitle } = req.body;
    
    const settingsData = {};
    if (language !== undefined) settingsData.language = language;
    if (phosphorIcons !== undefined) settingsData.phosphorIcons = phosphorIcons;
    if (customTitle !== undefined) settingsData.customTitle = customTitle;
    
    const settings = await jsonStore.updateSettings(settingsData);
    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;