import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import Routes from './routes';
import RoutesNoToken from './routesNoToken';
import RoutesAdmins from './routesAdmins';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const members = localStorage.getItem('members');
  const admins = localStorage.getItem('admins');
  let tokenMembers = null;
  const checkToken = JSON.parse(members);
  if (
    !checkToken ||
    !checkToken._id ||
    !checkToken.member_firstname ||
    !checkToken.member_lastname
  ) {
    tokenMembers = null;
  } else {
    tokenMembers = checkToken;
  }

  const tokenAdmins = JSON.parse(admins);
  // eslint-disable-next-line no-multi-assign
  if (process.env.NODE_ENV !== 'development') console.log = console.warn = console.error = () => {};
  if (!tokenMembers && !tokenAdmins) {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <RoutesNoToken />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
  if (tokenAdmins) {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <RoutesAdmins />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
  if (tokenMembers) {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
};

export default App;
