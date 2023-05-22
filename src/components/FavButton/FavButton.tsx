import React from 'react';
import { Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { FavButtonProp } from './types';

const FavButton: React.FC<FavButtonProp> = ({

}) => {
  return (
    <Button
      variant="contained"
      startIcon={<Favorite />}
      sx={{backgroundColor: "red"}}
    >
      Agregar a favoritos
    </Button>
  );
};

export default FavButton;
