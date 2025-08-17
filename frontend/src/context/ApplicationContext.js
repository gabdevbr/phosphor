import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationContext = createContext();

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within ApplicationProvider');
  }
  return context;
};

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const addApplication = async (formData) => {
    try {
      const response = await axios.post('/api/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      await fetchApplications();
      return response.data;
    } catch (error) {
      console.error('Error adding application:', error);
      throw error;
    }
  };

  const reorderApplications = async (reorderedApps) => {
    try {
      await axios.put('/api/applications/reorder', {
        applications: reorderedApps
      });
      setApplications(reorderedApps);
    } catch (error) {
      console.error('Error reordering applications:', error);
      throw error;
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`/api/applications/${id}`);
      await fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  };

  const updateApplication = async (id, formData) => {
    try {
      const response = await axios.put(`/api/applications/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      await fetchApplications();
      return response.data;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const value = {
    applications,
    loading,
    addApplication,
    updateApplication,
    reorderApplications,
    deleteApplication,
    refreshApplications: fetchApplications
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};