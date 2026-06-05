import { Outlet } from 'react-router';
import AppNavigation from './AppNavigation';

function App() {

  return (
    <>
      <Outlet />
      <AppNavigation />
    </>
  )
}

export default App;
