// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

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
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default contacts;
