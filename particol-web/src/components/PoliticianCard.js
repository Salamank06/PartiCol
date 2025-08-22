import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Link, IconButton, Avatar } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function PoliticianCard({ politician, onDelete, onEdit }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar src={politician.photo} sx={{ width: 48, height: 48, mr: 2 }} />
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {politician.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {politician.party}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {politician.cargoActual}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #E1E8ED', pt: 1 }}>
          <IconButton aria-label="edit" size="small" onClick={() => onEdit(politician.id)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => onDelete(politician.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          {politician.twitter && (
              <Link href={politician.twitter} target="_blank" rel="noopener">
                <TwitterIcon />
              </Link>
            )}
          {politician.facebook && (
            <Link href={politician.facebook} target="_blank" rel="noopener">
              <FacebookIcon />
            </Link>
          )}
          {politician.instagram && (
            <Link href={politician.instagram} target="_blank" rel="noopener">
              <InstagramIcon />
            </Link>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default PoliticianCard;