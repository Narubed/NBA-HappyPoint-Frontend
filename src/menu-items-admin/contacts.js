// assets
import { IconDashboard, IconReportSearch, IconChecklist } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconReportSearch, IconChecklist };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const contacts = {
  id: 'สมาชิก',
  title: 'สมาชิก',
  type: 'group',
  children: [
    {
      id: 'รายชื่อสมาชิก',
      title: 'รายชื่อสมาชิก',
      type: 'item',
      url: '/contacts',
      icon: icons.IconChecklist,
      breadcrumbs: false
    },
    {
      id: 'จัดการเลเวลผู้ใช้',
      title: 'จัดการเลเวลผู้ใช้',
      type: 'item',
      url: '/change-level-member',
      icon: icons.IconReportSearch,
      breadcrumbs: false
    }
  ]
};

export default contacts;
