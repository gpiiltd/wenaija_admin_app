import apiRoutes from "../../config";
import { get, patch, post } from "../../network/https";

export class ListAllAccounts {
  static async list_all_accounts(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.allAccount,
      data: { ...data },
    });
    if (response.status === "error") {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      });
    }
    if (response.status === "success") {
      return response;
    }
  }
}

export class GetUserByID {
  static async get_a_user(id: string) {
    const response = await get({
      url: `${apiRoutes.allAccount}/${id}`,
    });
    if (response.status === "error") {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      });
    }
    if (response.status === "success") {
      return response;
    }
  }
}

export class DeactivateUser {
  static async deactivate_user(id: string, data: Record<string, string>) {
    const response = await post({
      url: `${apiRoutes.deactivateUser}/${id}/deactivate/`,
      data,
    });
    if (response.status === "error") {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      });
    }
    if (response.status === "success") {
      return response;
    }
  }
}

export class GetRoles {
  static async get_roles(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.getRoles,
      data: { ...data },
    });
    if (response.status === "error") {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      });
    }
    if (response.status === "success") {
      return response.results;
    }
  }
}

export class AddRole {
  static async add_role(data: Record<string, string | number[]>) {
    const response = await post({
      url: apiRoutes.addRoles,
      data,
    });
    if (response.status === "error") {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      });
    }
    if (response.status === "success") {
      return response;
    }
  }
}

export class GetPermissions {
  static async get_permissions(data: Record<string, string>) {
    const response = await get({
      url: apiRoutes.getPermissions,
      data: { ...data },
    });
    if (response.status === "error") {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      });
    }
    if (response.status === "success") {
      return response.results;
    }
  }
}


export class editRolesAndPermissions {
  static async edit_roles_permissions(id: number, data: Record<string, string>) {
    const response = await patch({
      url: `${apiRoutes.editRolesAndPermissions}/${id}/permissions/attach/`,
      data,
    });
    if (response.status === "error") {
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results,
      });
    }
    if (response.status === "success") {
      return response;
    }
  }
}

