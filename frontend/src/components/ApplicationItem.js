import React, { useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import ContextMenu from './ContextMenu';

const ApplicationItem = ({ 
  application, 
  provided, 
  isDragging, 
  phosphorMode,
  onEdit,
  onDelete 
}) => {
  const [contextMenu, setContextMenu] = useState(null);

  const handleClick = (e) => {
    // Verificar se não é clique direito
    if (e.button !== 2) {
      window.open(application.url, '_blank');
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX + 2,
            mouseY: e.clientY - 6,
          }
        : null,
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleOpen = () => {
    window.open(application.url, '_blank');
  };

  const handleEdit = () => {
    onEdit(application);
  };

  const handleDelete = () => {
    onDelete(application);
  };

  const getImageSrc = () => {
    if (application.image) {
      return `/uploads/${application.image}`;
    }
    return null;
  };

  return (
    <>
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          p: 1,
          borderRadius: 1,
          transition: 'all 0.2s ease',
          transform: isDragging ? 'rotate(5deg)' : 'none',
          opacity: isDragging ? 0.8 : 1,
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.05)',
            transform: 'scale(1.05)',
            '& .terminal-glow': {
              textShadow: '0 0 8px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00'
            }
          }
        }}
      >
        <Avatar
          src={getImageSrc()}
          alt={application.name}
          className={phosphorMode ? 'phosphor-icon' : ''}
          sx={{
            width: 64,
            height: 64,
            mb: 1,
            backgroundColor: 'transparent',
            border: '1px solid #00ff00',
            '& .MuiAvatar-img': {
              objectFit: 'contain'
            }
          }}
        >
          {application.name.charAt(0).toUpperCase()}
        </Avatar>
        
        <Typography
          variant="caption"
          className="terminal-glow"
          sx={{
            textAlign: 'center',
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: '0.7rem',
            maxWidth: '80px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {application.name.toUpperCase()}
        </Typography>
      </Box>

      <ContextMenu
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        onOpen={handleOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ApplicationItem;