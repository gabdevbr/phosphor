import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

const TerminalHeader = ({ onSettingsClick }) => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const displayTitle = settings.customTitle || t('title');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid #00ff00',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }}
    >
      <Typography 
        variant="h4" 
        className="terminal-glow"
        sx={{ 
          fontFamily: '"Share Tech Mono", monospace',
          fontWeight: 'bold',
          letterSpacing: '2px'
        }}
      >
        {displayTitle}
      </Typography>
      
      <IconButton 
        onClick={onSettingsClick}
        className="terminal-button"
        sx={{ 
          color: '#00ff00',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)'
          }
        }}
      >
        <Settings />
      </IconButton>
    </Box>
  );
};

export default TerminalHeader;