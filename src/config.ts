interface ApiUrls {
  login: string;
  login2FA: string;
  adminInvite: string;
  passwordReset: string;
  emailVerification:string;
  createNewPassword:string;
  pinSetUp:string;
  signUpViaInvite:string;
  allAccount:string;
}

const apiRoutes: ApiUrls = {
  login: "/api/v1/admin/request/login",
  login2FA:"/api/v1/admin/request/login/auth-pin",
  adminInvite:"/api/v1/admin/create/invite",
  passwordReset:"/api/v1/admin/request/password-reset-token",
  emailVerification:"/api/v1/admin/verify/password-reset-token",
  createNewPassword:"/api/v1/admin/process/password-reset",
  pinSetUp:"/api/v1/admin/create/auth-pin",
  signUpViaInvite:"/api/v1/admin/request/signup",
  allAccount:"/api/v1/admin/accounts"
};

export default apiRoutes;
