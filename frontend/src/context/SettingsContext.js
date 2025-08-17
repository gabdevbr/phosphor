import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [settings, setSettings] = useState({
    language: 'pt',
    phosphorIcons: true
  });

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      const newSettings = response.data;
      setSettings(newSettings);
      
      if (newSettings.language && newSettings.language !== i18n.language) {
        i18n.changeLanguage(newSettings.language);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const response = await axios.put('/api/settings', newSettings);
      setSettings(response.data);
      
      if (newSettings.language && newSettings.language !== i18n.language) {
        i18n.changeLanguage(newSettings.language);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const value = {
    settings,
    updateSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};