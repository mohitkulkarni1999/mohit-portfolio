import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/client';

const SettingsContext = createContext({ settings: {}, ready: false });

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api.get('/settings/public')
      .then((res) => setSettings(res.data || {}))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, ready }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
