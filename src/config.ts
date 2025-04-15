interface ApiUrls {
  login: string;
  login2FA: string;
  adminInvite: string;
  passwordReset: string;
  emailVerification: string;
  createNewPassword: string;
  pinSetUp: string;
  signUpViaInvite: string;
  allAccount: string;
  deactivateUser: string;
  getRoles: string;
  addRoles: string;
  getPermissions: string;
  editRolesAndPermissions: string;
  users: string;
  userManagementMetrics: string;
}

const apiRoutes: ApiUrls = {
  login: "/api/v1/admin/request/login",
  login2FA: "/api/v1/admin/request/login/auth-pin",
  adminInvite: "/api/v1/admin/create/invite",
  passwordReset: "/api/v1/admin/request/password-reset-token",
  emailVerification: "/api/v1/admin/verify/password-reset-token",
  createNewPassword: "/api/v1/admin/process/password-reset",
  pinSetUp: "/api/v1/admin/create/auth-pin",
  signUpViaInvite: "/api/v1/admin/request/signup",
  allAccount: "/api/v1/admin/accounts",
  deactivateUser: "/api/v1/admin",
  getRoles: "/api/v1/admin/roles",
  addRoles: "/api/v1/admin/roles/",
  getPermissions: "/api/v1/admin/permissions/",
  editRolesAndPermissions: "/api/v1/admin/roles",
  users: "/api/v1/admin/agents",
  userManagementMetrics: "/api/v1/admin/dashboard/user-management-metrics/",
};

export default apiRoutes;
