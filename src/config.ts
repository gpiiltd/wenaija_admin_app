interface ApiUrls {
  login: string;
  login2FA: string;
}

const apiRoutes: ApiUrls = {
  login: "/api/v1/admin/request/login",
  login2FA:"/api/v1/admin/request/login/auth-pin"
};

export default apiRoutes;
