import { Outlet } from 'react-router';
import AppNavigation from '@/app/AppNavigation/AppNavigation';
import Box from '@mui/material/Box';
import AppHeader from '@/app/AppHeader';
import Snackbar from '@mui/material/Snackbar';
import { useNotificationStore } from '@/store';

export default function MainLayout() {

  const notificationStore = useNotificationStore();
  
  const handleClose = () => {
    notificationStore.hideNotification();
  };

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

      <Snackbar
        open={notificationStore.isShown}
        autoHideDuration={5000}
        onClose={handleClose}
        message={notificationStore.text}
      />

      <AppNavigation />
    </Box>
    </>
  );
};