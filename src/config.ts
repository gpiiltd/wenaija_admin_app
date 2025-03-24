interface ApiUrls {
  login: string;
  login2FA: string;
  adminInvite: string;
  passwordReset: string;
}

const apiRoutes: ApiUrls = {
  login: "/api/v1/admin/request/login",
  login2FA:"/api/v1/admin/request/login/auth-pin",
  adminInvite:"/api/v1/admin/create/invite",
  passwordReset:"/api/v1/admin/request/password-reset-token"
};

export default apiRoutes;
