import { Outlet } from 'react-router';
import AppNavigation from '@/app/AppNavigation/AppNavigation';
import Box from '@mui/material/Box';
import AppHeader from '@/app/AppHeader';

export default function MainLayout() {

  return (
    <>
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppHeader />

      <Box component="main" sx={{ flexGrow: 1, padding: '12px' }}>
        <Outlet />
      </Box>

      <AppNavigation />
    </Box>
    </>
  );
};