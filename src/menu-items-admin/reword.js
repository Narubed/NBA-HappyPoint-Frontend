// assets
import { IconBrandGithub, IconAccessPoint } from '@tabler/icons';

// constant
const icons = { IconBrandGithub, IconAccessPoint };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const contacts = {
  id: 'จัดการสิทธิต่าง ๆ ',
  title: 'จัดการสิทธิต่าง ๆ',
  type: 'group',
  children: [
    {
      id: 'ใช้พอยท์',
      title: 'ใช้พอยท์',
      type: 'item',
      url: '/usePoint',
      icon: icons.IconAccessPoint,
      breadcrumbs: false
    },
    {
      id: 'สิทธิพิเศษ',
      title: 'สิทธิพิเศษ',
      type: 'item',
      url: '/privilege',
      icon: icons.IconBrandGithub,
      breadcrumbs: false
    }
  ]
};

export default contacts;
