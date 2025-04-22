interface ApiUrls {
  login: string
  login2FA: string
  adminInvite: string
  passwordReset: string
  emailVerification: string
  createNewPassword: string
  pinSetUp: string
  signUpViaInvite: string
  allAccount: string
  deactivateUser: string
  reActivateUser: string
  getRoles: string
  addRoles: string
  getPermissions: string
  editRolesAndPermissions: string
  users: string
  userManagementMetrics: string
  institutions: string
  getAllInstitution: string
  getInstitute: string
  institutionAnalytics: string
  getSurveyQuestions: string
  getCategories: string
  createCategories: string
  createIndicators: string
  createQuestions: string
  ctMetrics: string
  hisMetrics: string
}

const apiRoutes: ApiUrls = {
  login: '/api/v1/admin/request/login',
  login2FA: '/api/v1/admin/request/login/auth-pin',
  adminInvite: '/api/v1/admin/create/invite',
  passwordReset: '/api/v1/admin/request/password-reset-token',
  emailVerification: '/api/v1/admin/verify/password-reset-token',
  createNewPassword: '/api/v1/admin/process/password-reset',
  pinSetUp: '/api/v1/admin/create/auth-pin',
  signUpViaInvite: '/api/v1/admin/request/signup',
  allAccount: '/api/v1/admin/accounts',
  deactivateUser: '/api/v1/admin',
  reActivateUser: '/api/v1/admin',
  getRoles: '/api/v1/admin/roles',
  addRoles: '/api/v1/admin/roles/',
  getPermissions: '/api/v1/admin/permissions/',
  editRolesAndPermissions: '/api/v1/admin/roles',
  users: '/api/v1/admin/agents',
  userManagementMetrics: '/api/v1/admin/dashboard/user-management-metrics/',
  institutions: '/api/v1/institutions/',
  getInstitute: '/api/v1/institutions',
  getAllInstitution: '/api/v1/get-institutions',
  institutionAnalytics: '/api/v1/admin/institutions/analytics',
  getSurveyQuestions: '/api/v1/admin/survey/questions/',
  getCategories: '/api/v1/categories',
  createCategories: '/api/v1/categories',
  createIndicators: '/api/v1/indicators',
  createQuestions: '/api/v1/admin/survey/indicators/',
  ctMetrics: '/api/v1/task/metrics',
  hisMetrics: '/api/v1/admin/survey/institutions/dashboard',
}

export default apiRoutes
