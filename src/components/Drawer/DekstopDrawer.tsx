import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { GlobalConstants } from '../../constants/GlobalConstants';
import { FormControlLabel, Switch, Tab, Tabs } from '@mui/material';
import TabMenu from './TabMenu';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DekstopDrawer(props: any) {
    
  const { children } = props

  const [value, setValue] = React.useState(0);

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100%)` },
                ml: { sm: `${drawerWidth}px` },
                height: '120px'
            }}
            // style={{zIndex: 1301}}
        >        
                <div style={{ marginTop:'10px', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                 <Typography variant='subtitle1'>
                  {GlobalConstants.APP_Name}
                 </Typography>
                </div>
            {/* <Toolbar> */}
            {/* <FormControlLabel
                value="top"
                control={<Switch color="secondary" />}
                label=''
            /> */}
            {/* </Toolbar> */}
            <TabMenu />
        </AppBar>
        <DrawerHeader />
          <div style={{ marginTop: '120px' }}>
            {children}
          </div>
      </Box>
  );
}
