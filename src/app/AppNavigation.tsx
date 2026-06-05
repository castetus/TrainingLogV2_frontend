import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FitnessCenter } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';

export default function AppNavigation () {

  const navigate = useNavigate();
  const location = useLocation();

  const changeRoute = (route: string) => {
    navigate(route);
  }

  return (
    <BottomNavigation
      showLabels
      value={location.pathname}
      onChange={(event, newValue) => {
        changeRoute(newValue);
      }}
    >
      <BottomNavigationAction value="/" label="Nearby" icon={<FitnessCenter />} />
    </BottomNavigation>
  )
};