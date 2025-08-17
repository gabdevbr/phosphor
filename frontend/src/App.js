import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ApplicationGrid from './components/ApplicationGrid';
import AddApplicationModal from './components/AddApplicationModal';
import SettingsModal from './components/SettingsModal';
import TerminalHeader from './components/TerminalHeader';
import DocumentTitleUpdater from './components/DocumentTitleUpdater';
import { ApplicationProvider } from './context/ApplicationContext';
import { SettingsProvider } from './context/SettingsContext';

const terminalTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#000000'
    },
    primary: {
      main: '#00ff00'
    },
    text: {
      primary: '#00ff00',
      secondary: '#00ff00'
    }
  },
  typography: {
    fontFamily: '"Share Tech Mono", monospace',
    allVariants: {
      color: '#00ff00'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          border: '1px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(0, 0, 0, 0.98)',
          border: '2px solid #00ff00',
          boxShadow: '0 0 30px rgba(0, 255, 0, 0.5)'
        }
      }
    }
  }
});

function App() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <ThemeProvider theme={terminalTheme}>
      <CssBaseline />
      <SettingsProvider>
        <ApplicationProvider>
          <DocumentTitleUpdater />
          <div className="terminal-body">
            <div className="terminal-scanlines"></div>
            
            <TerminalHeader 
              onSettingsClick={() => setSettingsModalOpen(true)}
            />
            
            <ApplicationGrid 
              onAddClick={() => setAddModalOpen(true)}
            />
            
            <AddApplicationModal 
              open={addModalOpen}
              onClose={() => setAddModalOpen(false)}
            />
            
            <SettingsModal 
              open={settingsModalOpen}
              onClose={() => setSettingsModalOpen(false)}
            />
          </div>
        </ApplicationProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;