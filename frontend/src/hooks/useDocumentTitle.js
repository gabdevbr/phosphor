import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

export const useDocumentTitle = () => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  useEffect(() => {
    const title = settings.customTitle || t('title');
    document.title = title;
  }, [settings.customTitle, t]);
};
