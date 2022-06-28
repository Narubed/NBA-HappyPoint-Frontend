// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from '../../../../menu-items';
import menuItemAdmin from '../../../../menu-items-admin';

// ==============================|| SIDEBAR MENU LIST ||============================== //

function MenuList() {
  const members = localStorage.getItem('members');
  const admins = localStorage.getItem('admins');
  const tokenMembers = JSON.parse(members);
  const tokenAdmins = JSON.parse(admins);
  let dataNavItems = [];
  if (tokenMembers) {
    dataNavItems = menuItem;
  } else if (tokenAdmins) {
    dataNavItems = menuItemAdmin;
  }
  const navItems = dataNavItems.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
}

export default MenuList;
