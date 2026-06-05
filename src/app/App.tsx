import { Outlet } from 'react-router';
import AppNavigation from './AppNavigation/AppNavigation';
import Box from '@mui/material/Box';

function App() {

  return (
    <>
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <AppNavigation />
    </Box>
    </>
  )
}

export default App;
