import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

const SettingsModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateSettings(localSettings);
      onClose();
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setLocalSettings(settings);
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
        {t('settings')}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <TextField
            fullWidth
            label={t('customTitle')}
            value={localSettings.customTitle || ''}
            onChange={handleChange('customTitle')}
            placeholder={t('title')}
            className="terminal-input"
            sx={{
              '& .MuiInputLabel-root': {
                color: '#00ff00',
                fontFamily: '"Share Tech Mono", monospace'
              },
              '& .MuiOutlinedInput-root': {
                color: '#00ff00',
                fontFamily: '"Share Tech Mono", monospace',
                '& fieldset': {
                  borderColor: '#00ff00'
                },
                '&:hover fieldset': {
                  borderColor: '#00ff00'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ff00'
                }
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(0, 255, 0, 0.5)',
                opacity: 1
              }
            }}
            helperText={
              <Box sx={{ 
                fontFamily: '"Share Tech Mono", monospace', 
                fontSize: '0.75rem',
                color: 'rgba(0, 255, 0, 0.7)',
                mt: 0.5
              }}>
                {t('customTitleDesc')}
              </Box>
            }
          />
          
          <FormControl fullWidth className="terminal-input">
            <InputLabel sx={{ color: '#00ff00', fontFamily: '"Share Tech Mono", monospace' }}>
              {t('language')}
            </InputLabel>
            <Select
              value={localSettings.language || 'pt'}
              onChange={handleChange('language')}
              sx={{
                color: '#00ff00',
                fontFamily: '"Share Tech Mono", monospace',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00ff00'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00ff00'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00ff00'
                }
              }}
            >
              <MenuItem value="pt" sx={{ fontFamily: '"Share Tech Mono", monospace' }}>
                PORTUGUÊS
              </MenuItem>
              <MenuItem value="en" sx={{ fontFamily: '"Share Tech Mono", monospace' }}>
                ENGLISH
              </MenuItem>
              <MenuItem value="es" sx={{ fontFamily: '"Share Tech Mono", monospace' }}>
                ESPAÑOL
              </MenuItem>
            </Select>
          </FormControl>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={localSettings.phosphorIcons || false}
                onChange={handleChange('phosphorIcons')}
                sx={{
                  color: '#00ff00',
                  '&.Mui-checked': {
                    color: '#00ff00'
                  }
                }}
              />
            }
            label={
              <Box>
                <Box sx={{ fontFamily: '"Share Tech Mono", monospace', fontWeight: 'bold' }}>
                  {t('phosphorIcons')}
                </Box>
                <Box sx={{ 
                  fontFamily: '"Share Tech Mono", monospace', 
                  fontSize: '0.8rem',
                  opacity: 0.7 
                }}>
                  {t('phosphorIconsDesc')}
                </Box>
              </Box>
            }
            sx={{ 
              color: '#00ff00',
              alignItems: 'flex-start',
              '& .MuiFormControlLabel-label': {
                color: '#00ff00'
              }
            }}
          />
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
          onClick={handleSave}
          className="terminal-button"
          disabled={loading}
        >
          {loading ? '...' : t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsModal;