import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const Main = Loadable(lazy(() => import('../views/main')));
const PopularCard = Loadable(lazy(() => import('../views/statistics/PopularCard')));
const TotalGrowthBarChart = Loadable(lazy(() => import('../views/statistics/TotalGrowthBarChart')));
const PrivilegeDetail = Loadable(lazy(() => import('../views/main/usePrivilege/privilegeDetail')));
const UsePointDetail = Loadable(lazy(() => import('../views/main/usePoint/usePointDetail')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/PrivilegeDetail',
      element: <PrivilegeDetail />
    },
    {
      path: '/UsePointDetail',
      element: <UsePointDetail />
    },
    {
      path: '/PopularCard',
      element: <PopularCard />
    },
    {
      path: '/TotalGrowthBarChart',
      element: <TotalGrowthBarChart />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    {
      path: '/utils/util-typography',
      element: <UtilsTypography />
    },
    {
      path: '/utils/util-color',
      element: <UtilsColor />
    },
    {
      path: '/utils/util-shadow',
      element: <UtilsShadow />
    },
    {
      path: '/icons/tabler-icons',
      element: <UtilsTablerIcons />
    },
    {
      path: '/icons/material-icons',
      element: <UtilsMaterialIcons />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    },
    {
      path: '*',
      element: <Main /> // กลับมาตั้งไฟล์ 404 ด้วย
    }
  ]
};

export default MainRoutes;
