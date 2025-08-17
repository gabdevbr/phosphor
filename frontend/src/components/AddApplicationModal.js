import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useApplications } from '../context/ApplicationContext';

const AddApplicationModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { addApplication } = useApplications();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon: null
  });
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (field) => (event) => {
    if (field === 'icon') {
      setFormData(prev => ({
        ...prev,
        icon: event.target.files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value
      }));
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        icon: file
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDropAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.url) return;

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('url', formData.url);
      
      if (formData.icon) {
        submitData.append('icon', formData.icon);
      }

      await addApplication(submitData);
      
      setFormData({ name: '', url: '', icon: null });
      onClose();
    } catch (error) {
      console.error('Error adding application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ name: '', url: '', icon: null });
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.98)',
          border: '2px solid #00ff00',
          boxShadow: '0 0 30px rgba(0, 255, 0, 0.5)'
        }
      }}
    >
      <DialogTitle 
        className="terminal-glow"
        sx={{ 
          fontFamily: '"Share Tech Mono", monospace',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        {t('addApplication')}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <TextField
            label={t('applicationName')}
            value={formData.name}
            onChange={handleChange('name')}
            variant="outlined"
            fullWidth
            className="terminal-input"
            required
          />
          
          <TextField
            label={t('applicationUrl')}
            value={formData.url}
            onChange={handleChange('url')}
            variant="outlined"
            fullWidth
            className="terminal-input"
            type="url"
            required
          />
          
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 1,
                fontFamily: '"Share Tech Mono", monospace'
              }}
            >
              {t('applicationIcon')}
            </Typography>
            
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            
            {/* Drop area */}
            <Box
              onClick={handleDropAreaClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`terminal-drop-area ${dragOver ? 'drag-over' : ''}`}
              sx={{
                border: `2px dashed ${dragOver ? '#00ff00' : 'rgba(0, 255, 0, 0.5)'}`,
                borderRadius: '4px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: dragOver ? 'rgba(0, 255, 0, 0.05)' : 'transparent',
                transition: 'all 0.3s ease',
                position: 'relative',
                minHeight: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  borderColor: '#00ff00',
                  backgroundColor: 'rgba(0, 255, 0, 0.05)',
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)'
                }
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"Share Tech Mono", monospace',
                  color: dragOver ? '#00ff00' : 'rgba(0, 255, 0, 0.8)',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '0.5px'
                }}
              >
                {formData.icon ? formData.icon.name : t('dropImageHere')}
              </Typography>
              
              {!formData.icon && (
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: '"Share Tech Mono", monospace',
                    color: 'rgba(0, 255, 0, 0.6)',
                    fontSize: '0.7rem'
                  }}
                >
                  {t('orClickToSelect')}
                </Typography>
              )}
              
              {formData.icon && (
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: '"Share Tech Mono", monospace',
                    color: 'rgba(0, 255, 0, 0.6)',
                    fontSize: '0.7rem'
                  }}
                >
                  {t('clickToChange')}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button 
          onClick={handleClose}
          className="terminal-button"
          disabled={loading}
        >
          {t('cancel')}
        </Button>
        <Button 
          onClick={handleSubmit}
          className="terminal-button"
          disabled={loading || !formData.name || !formData.url}
        >
          {loading ? '...' : t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddApplicationModal;