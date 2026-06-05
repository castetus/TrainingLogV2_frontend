import { Outlet } from 'react-router';
import AppNavigation from './AppNavigation/AppNavigation';

function App() {

  return (
    <>
      <Outlet />
      <AppNavigation />
    </>
  )
}

export default App;
