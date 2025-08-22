import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const dummyTimelineEvents = [
  {
    id: 1,
    year: 2000,
    title: 'Inicio de Carrera Política',
    description: 'Elegido concejal de su ciudad natal.',
  },
  {
    id: 2,
    year: 2005,
    title: 'Representante a la Cámara',
    description: 'Asume como Representante a la Cámara por primera vez.',
  },
  {
    id: 3,
    year: 2010,
    title: 'Senador de la República',
    description: 'Elegido Senador, enfocándose en legislación ambiental.',
  },
  {
    id: 4,
    year: 2018,
    title: 'Ministro de Medio Ambiente',
    description: 'Nombrado Ministro, impulsando políticas de sostenibilidad.',
  },
];

function TimelineView() {
  const theme = useTheme();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Timeline de Político
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 2,
          borderRadius: '12px',
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Timeline position="alternate">
          {dummyTimelineEvents.map((event, index) => (
            <TimelineItem key={event.id}>
              <TimelineSeparator>
                <TimelineDot color={index % 2 === 0 ? 'primary' : 'secondary'} />
                <TimelineConnector sx={{ bgcolor: theme.palette.divider }} />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="span" sx={{ color: theme.palette.primary.main }}>
                  {event.year}: {event.title}
                </Typography>
                <Typography color="text.secondary">{event.description}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Paper>
    </Box>
  );
}

export default TimelineView;