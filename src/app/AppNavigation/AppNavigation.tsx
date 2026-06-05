import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useLocation, useNavigate } from 'react-router';
import { navigationLinks } from './AppNavigation.constants';

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
      {navigationLinks.map((link) => {
        const Icon = link.icon;

        return (
          <BottomNavigationAction
            key={link.path}
            value={link.path}
            label={link.label}
            icon={<Icon />}
          />
        );
      })}
    </BottomNavigation>
  )
};