import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const Dashboard = Loadable(lazy(() => import('../views/admins/dashboard')));
const Contacts = Loadable(lazy(() => import('../views/admins/contacts')));
const ChangeLevelMember = Loadable(lazy(() => import('../views/admins/ChangeLevelMember')));
const Privilege = Loadable(lazy(() => import('../views/admins/privilege')));
const CreatePrivilege = Loadable(
  lazy(() => import('../views/admins/privilege/component/CreatePrivilege'))
);
const EditPrivilege = Loadable(
  lazy(() => import('../views/admins/privilege/component/EditPrivilege'))
);
const UsePoint = Loadable(lazy(() => import('../views/admins/usePoint')));
const CreateUsePoint = Loadable(lazy(() => import('../views/admins/usePoint/createUsePoint')));
const EditUsePoint = Loadable(lazy(() => import('../views/admins/usePoint/editUsePoint')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));
// ReportHisrory
const UseingPoint = Loadable(lazy(() => import('../views/admins/reportHistory/useingPoint')));
const Historypoint = Loadable(lazy(() => import('../views/admins/reportHistory/historyPoint')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/contacts',
      element: <Contacts />
    },
    {
      path: '/change-level-member',
      element: <ChangeLevelMember />
    },
    {
      path: '/privilege',
      element: <Privilege />
    },
    {
      path: '/privilege/create',
      element: <CreatePrivilege />
    },
    {
      path: '/privilege/edit',
      element: <EditPrivilege />
    },
    {
      path: '/usePoint',
      element: <UsePoint />
    },
    {
      path: '/usePoint/create',
      element: <CreateUsePoint />
    },
    {
      path: '/usePoint/edit',
      element: <EditUsePoint />
    },
    {
      path: '/useing-point',
      element: <UseingPoint />
    },
    {
      path: '/history-point',
      element: <Historypoint />
    },

    {
      path: '*',
      element: <Dashboard /> // กลับมาตั้งไฟล์ 404 ด้วย
    }
  ]
};

export default MainRoutes;
