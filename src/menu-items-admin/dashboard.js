// assets
import { IconHome } from '@tabler/icons';

// constant
const icons = { IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const contacts = {
  id: 'หน้าหลัก',
  title: 'หน้าหลัก',
  type: 'group',
  children: [
    {
      id: 'หน้าหลัก',
      title: 'หน้าหลัก',
      type: 'item',
      url: '/',
      icon: icons.IconHome,
      breadcrumbs: false
    }
  ]
};

export default contacts;
