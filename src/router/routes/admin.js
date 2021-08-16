import AdminView from '../../main-view/Admin.vue';
import Dashboard from '../../views/admin/Dashboard.vue';
import DeviceManagement from '../../views/admin/DeviceManagement.vue';
import UserManagement from '../../views/admin/UserManagement.vue';
import ModelVersion from '../../views/admin/ModelVersion.vue';
import TrackingManagement from '../../views/admin/TrackingManagement.vue';

const routes = [
  {
    path: '/',
    name: 'AdminMainView',
    component: AdminView,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, vi: 'Dashboard' },
      },
      {
        path: 'device-management',
        name: 'DeviceManagement',
        component: DeviceManagement,
        meta: { requiresAuth: true, vi: 'Device Management' },
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: UserManagement,
        meta: { requiresAuth: true, vi: 'User Management' },
      },
      {
        path: 'tracking-management',
        name: 'TrackingManagement',
        component: TrackingManagement,
        meta: { requiresAuth: true, vi: 'Tracking Management' },
      },
      {
        path: 'model-version-management',
        name: 'ModelVersion',
        component: ModelVersion,
        meta: { requiresAuth: true, vi: 'Model version' },
      },
    ],
    meta: {
      requiresAuth: true,
      // is_admin: true,
    },
  },
];

export default routes;
