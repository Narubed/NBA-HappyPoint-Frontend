// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'Statistics',
  title: 'Statistics',
  type: 'group',
  children: [
    {
      id: 'สถิติทั้งหมด',
      title: 'สถิติทั้งหมด',
      type: 'item',
      url: '/TotalGrowthBarChart',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'รายละเอียด Point ที่ได้รับ',
      title: 'รายละเอียด Point ที่ได้รับ',
      type: 'item',
      url: '/PopularCard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
