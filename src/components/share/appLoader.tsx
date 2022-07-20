import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import colors from '../../config/colors';
import { Backdrop } from '@mui/material';


// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props: CircularProgressProps) {
  return (
    <>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? colors.secondary: '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </>
  );
}

export default function AppLoader() {
  return (
        <FacebookCircularProgress />
  );
}
