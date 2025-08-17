import React, { useState } from 'react';
import { Box, Fab, Typography, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useApplications } from '../context/ApplicationContext';
import { useSettings } from '../context/SettingsContext';
import ApplicationItem from './ApplicationItem';
import EditApplicationModal from './EditApplicationModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const ApplicationGrid = ({ onAddClick }) => {
  const { t } = useTranslation();
  const { applications, loading, reorderApplications } = useApplications();
  const { settings } = useSettings();
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(applications);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    try {
      await reorderApplications(items);
    } catch (error) {
      console.error('Error reordering applications:', error);
    }
  };

  const handleEditApplication = (application) => {
    setSelectedApplication(application);
    setEditModalOpen(true);
  };

  const handleDeleteApplication = (application) => {
    setSelectedApplication(application);
    setDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedApplication(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedApplication(null);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh'
        }}
      >
        <CircularProgress sx={{ color: '#00ff00' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, pb: 10, minHeight: 'calc(100vh - 80px)' }}>
      {applications.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h5" 
            className="terminal-glow"
            sx={{ 
              mb: 2,
              fontFamily: '"Share Tech Mono", monospace'
            }}
          >
            {t('noApplications')}
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              opacity: 0.7,
              fontFamily: '"Share Tech Mono", monospace'
            }}
          >
            {t('addFirstApp')}
          </Typography>
        </Box>
      ) : (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="applications">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: 3,
                    justifyItems: 'center'
                  }}
                >
                  {applications.map((app, index) => (
                    <Draggable key={app._id} draggableId={app._id} index={index}>
                      {(provided, snapshot) => (
                        <ApplicationItem
                          application={app}
                          provided={provided}
                          isDragging={snapshot.isDragging}
                          phosphorMode={settings.phosphorIcons}
                          onEdit={handleEditApplication}
                          onDelete={handleDeleteApplication}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}

      <Fab
        color="primary"
        onClick={onAddClick}
        className="terminal-button"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)'
          }
        }}
      >
        <Add />
      </Fab>

      <EditApplicationModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        application={selectedApplication}
      />

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        application={selectedApplication}
      />
    </Box>
  );
};

export default ApplicationGrid;