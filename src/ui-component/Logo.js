/* eslint-disable jsx-a11y/alt-text */
// material-ui
import { useTheme } from '@mui/material/styles';

import imageLogo from '../assets/images/logo/NBAHappyPoint3.png';

const Logo = () => {
  const theme = useTheme();

  return (
    <div style={{ width: '30%', margin: 'auto' }}>
      <img style={{ width: '100%' }} src={imageLogo} />
    </div>
  );
};

export default Logo;
