import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemText, IconButton, useTheme, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Routes, Route, Link } from 'react-router-dom';

import PoliticiansView from './components/PoliticiansView';
import PartiesView from './components/PartiesView';
import MapView from './components/MapView';
import TimelineView from './components/TimelineView';
import ComparatorView from './components/ComparatorView';
import SearchView from './components/SearchView';
import DashboardView from './components/DashboardView';
import { ColorModeContext } from './ThemeContext';
import theme from './theme';

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PartiCol
      </Typography>
      <List>
        <ListItem component={Link} to="/politicos" button>
          <ListItemText primary="Políticos" sx={{ color: 'text.primary' }} />
        </ListItem>
        <ListItem component={Link} to="/partidos" button>
          <ListItemText primary="Partidos" sx={{ color: 'text.primary' }} />
        </ListItem>
        <ListItem component={Link} to="/mapa" button>
          <ListItemText primary="Mapa" sx={{ color: 'text.primary' }} />
        </ListItem>
        <ListItem component={Link} to="/timeline" button>
          <ListItemText primary="Timeline" sx={{ color: 'text.primary' }} />
        </ListItem>
        <ListItem component={Link} to="/comparador" button>
          <ListItemText primary="Comparador" sx={{ color: 'text.primary' }} />
        </ListItem>
        <ListItem component={Link} to="/busqueda" button>
          <ListItemText primary="Búsqueda" sx={{ color: 'text.primary' }} />
        </ListItem>
        <ListItem component={Link} to="/dashboard" button>
          <ListItemText primary="Dashboard" sx={{ color: 'text.primary' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              PartiCol
            </Typography>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: 'background.paper' },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: 'background.paper' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}>
          <Toolbar /> {/* This adds padding below the AppBar */}
          <Routes>
            <Route path="/politicos" element={<PoliticiansView />} />
            <Route path="/partidos" element={<PartiesView />} />
            <Route path="/mapa" element={<MapView />} />
            <Route path="/timeline" element={<TimelineView />} />
            <Route path="/comparador" element={<ComparatorView />} />
            <Route path="/busqueda" element={<SearchView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/" element={<PoliticiansView />} /> {/* Default route */}
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;