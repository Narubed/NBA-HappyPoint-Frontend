// assets
import { IconHome } from '@tabler/icons';

// constant
const icons = { IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const contacts = {
  id: 'history',
  title: 'history',
  type: 'group',
  children: [
    {
      id: 'ประวัติการได้รับ',
      title: 'ประวัติการได้รับ',
      type: 'item',
      url: '/history-point',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: 'ประวัติการใช้แลกของ',
      title: 'ประวัติการใช้แลกของ',
      type: 'item',
      url: '/useing-point',
      icon: icons.IconHome,
      breadcrumbs: false
    }
  ]
};

export default contacts;
