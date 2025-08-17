import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useApplications } from '../context/ApplicationContext';

const ConfirmDeleteModal = ({ open, onClose, application }) => {
  const { t } = useTranslation();
  const { deleteApplication } = useApplications();

  const handleConfirm = async () => {
    if (application) {
      try {
        await deleteApplication(application._id);
        onClose();
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
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
        {t('confirmDelete')}
      </DialogTitle>
      
      <DialogContent>
        <Typography
          variant="body1"
          sx={{
            fontFamily: '"Share Tech Mono", monospace',
            textAlign: 'center',
            color: '#00ff00',
            mt: 2
          }}
        >
          {t('confirmDeleteMessage')}
        </Typography>
        {application && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Share Tech Mono", monospace',
              textAlign: 'center',
              color: 'rgba(0, 255, 0, 0.7)',
              mt: 1,
              fontWeight: 'bold'
            }}
          >
            "{application.name}"
          </Typography>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 2, gap: 1, justifyContent: 'center' }}>
        <Button 
          onClick={onClose}
          className="terminal-button"
          sx={{ minWidth: '80px' }}
        >
          {t('no')}
        </Button>
        <Button 
          onClick={handleConfirm}
          className="terminal-button"
          sx={{ 
            minWidth: '80px',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              borderColor: '#ff0000'
            }
          }}
        >
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
