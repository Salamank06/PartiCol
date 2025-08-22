import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const dummyLocations = [
  {
    id: 1,
    position: [4.7110, -74.0721], // Bogotá, Colombia
    name: 'Sede Partido A',
    description: 'Oficina principal del Partido A',
  },
  {
    id: 2,
    position: [6.2442, -75.5812], // Medellín, Colombia
    name: 'Oficina Regional Partido B',
    description: 'Representación del Partido B en Antioquia',
  },
  {
    id: 3,
    position: [3.4516, -76.5320], // Cali, Colombia
    name: 'Centro de Campaña Partido C',
    description: 'Punto de encuentro para la campaña del Partido C',
  },
];

function MapView() {
  const theme = useTheme();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mapa Interactivo
      </Typography>
      <Paper
        elevation={3}
        sx={{
          height: '600px',
          width: '100%',
          mt: 2,
          borderRadius: '12px',
          overflow: 'hidden', // Ensures map corners are rounded
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <MapContainer center={[4.5709, -74.2973]} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {dummyLocations.map((location) => (
            <Marker key={location.id} position={location.position}>
              <Popup>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>{location.name}</Typography>
                <Typography variant="body2" color="text.secondary">{location.description}</Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Paper>
    </Box>
  );
}

export default MapView;