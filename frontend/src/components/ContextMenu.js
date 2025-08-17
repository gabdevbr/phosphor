import React, { useEffect } from 'react';
import { Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ContextMenu = ({ 
  anchorReference = "anchorPosition",
  anchorPosition = null,
  open,
  onClose,
  onOpen,
  onEdit,
  onDelete
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = () => {
      if (open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('contextmenu', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [open, onClose]);

  const handleOpen = () => {
    onOpen();
    onClose();
  };

  const handleEdit = () => {
    onEdit();
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Menu
      anchorReference={anchorReference}
      anchorPosition={anchorPosition}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          border: '1px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
          '& .MuiMenuItem-root': {
            fontFamily: '"Share Tech Mono", monospace',
            color: '#00ff00',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              boxShadow: 'inset 0 0 10px rgba(0, 255, 0, 0.2)'
            }
          }
        }
      }}
    >
      <MenuItem onClick={handleOpen}>
        <ListItemIcon sx={{ color: '#00ff00', minWidth: '20px !important' }}>
          ▶
        </ListItemIcon>
        <Typography variant="inherit">{t('open')}</Typography>
      </MenuItem>
      
      <MenuItem onClick={handleEdit}>
        <ListItemIcon sx={{ color: '#00ff00', minWidth: '20px !important' }}>
          ✎
        </ListItemIcon>
        <Typography variant="inherit">{t('edit')}</Typography>
      </MenuItem>
      
      <MenuItem onClick={handleDelete}>
        <ListItemIcon sx={{ color: '#00ff00', minWidth: '20px !important' }}>
          ✕
        </ListItemIcon>
        <Typography variant="inherit">{t('delete')}</Typography>
      </MenuItem>
    </Menu>
  );
};

export default ContextMenu;
