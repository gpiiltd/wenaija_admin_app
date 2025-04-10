import { createSlice } from "@reduxjs/toolkit";
import { triggerAddRole, triggerDeactivateUser, triggerEditRolesAndPermissions, triggerGetAllRoles, triggerGetPermissions, triggerListAllAccounts, triggerListASingleUser, triggerreactivateUser } from "./rbacThunks";

interface IinitialState {
  error: boolean;
  loading: boolean;
  userData: Record<string, any>[] | Record<string, any> | null; 
  message: string;
  statusCode?: number | null;
  rolesData:{
    data: Record<string, string>[] | any ;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };

  deactivateUserData:{
    data: Record<string, string>[] | any ;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  addRoleData:{
    data: Record<string, string>[] | any ;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  editRolesAndPermissionsData:{
    data: Record<string, string>[] | any ;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  }

}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: null,
  message: "",
  statusCode: null,
  rolesData:{
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null
  },
  deactivateUserData:{
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null
  },
  addRoleData:{
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null
  },
  editRolesAndPermissionsData:{
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null
  }
};

const rbacSlice = createSlice({
  name: "rbac",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.statusCode = initialState.statusCode;
    },
    resetDeactivateUserDataState: (state) => {
      state.deactivateUserData.error = initialState.deactivateUserData.error;
      state.deactivateUserData.message = initialState.deactivateUserData.message;
      state.deactivateUserData.statusCode = initialState.deactivateUserData.statusCode;
    },
    resetAddRoleDataState: (state) => {
      state.addRoleData.error = initialState.addRoleData.error;
      state.addRoleData.message = initialState.addRoleData.message;
      state.addRoleData.statusCode = initialState.addRoleData.statusCode;
    },
    resetEditRoleAndPermissionState: (state) => {
      state.editRolesAndPermissionsData.error = initialState.editRolesAndPermissionsData.error;
      state.editRolesAndPermissionsData.message = initialState.editRolesAndPermissionsData.message;
      state.editRolesAndPermissionsData.statusCode = initialState.editRolesAndPermissionsData.statusCode;
    },
  },
  extraReducers: (builder) => {
    //LIST ALL ADMIN
    builder.addCase(triggerListAllAccounts.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(
        triggerListAllAccounts.fulfilled,
      (state, action) => {
        state.loading = false;
        state.userData = action.payload?.results!;
        state.error = false;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
        triggerListAllAccounts.rejected,
      (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code ?? null;
       
      }
    );

    //get user by id
    builder.addCase(triggerListASingleUser.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(
      triggerListASingleUser.fulfilled,
      (state, action) => {
        state.loading = false;
        state.userData = action.payload?.results!;
        state.error = false;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
      triggerListASingleUser.rejected,
      (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code ?? null;
      
      }
    );

    //DEACTIVATE USER
    builder.addCase(triggerDeactivateUser.pending, (state) => {
      state.deactivateUserData.loading = true;
      state.deactivateUserData.error = false;
      state.deactivateUserData.data = {};
      state.deactivateUserData.message = "";
    });
    builder.addCase(
      triggerDeactivateUser.fulfilled,
      (state, action) => {
        state.deactivateUserData.loading = false;
        state.deactivateUserData.data = action.payload?.results!;
        state.deactivateUserData.error = false;
        state.deactivateUserData.message = action.payload?.message as unknown as string;
        state.deactivateUserData.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
      triggerDeactivateUser.rejected,
      (state, action) => {
        state.deactivateUserData.loading = false;
        state.deactivateUserData.error = true;
        state.deactivateUserData.message = action.payload?.message as unknown as string;
        state.deactivateUserData.statusCode = action.payload?.status_code ?? null;
       
      }
    );

    builder.addCase(triggerreactivateUser.pending, (state) => {
      state.deactivateUserData.loading = true;
      state.deactivateUserData.error = false;
      state.deactivateUserData.data = {};
      state.deactivateUserData.message = "";
    });
    builder.addCase(
      triggerreactivateUser.fulfilled,
      (state, action) => {
        state.deactivateUserData.loading = false;
        state.deactivateUserData.data = action.payload?.results!;
        state.deactivateUserData.error = false;
        state.deactivateUserData.message = action.payload?.message as unknown as string;
        state.deactivateUserData.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
      triggerreactivateUser.rejected,
      (state, action) => {
        state.deactivateUserData.loading = false;
        state.deactivateUserData.error = true;
        state.deactivateUserData.message = action.payload?.message as unknown as string;
        state.deactivateUserData.statusCode = action.payload?.status_code ?? null;
       
      }
    );

    //LIST ROLES
    builder.addCase(triggerGetAllRoles.pending, (state) => {
      state.rolesData.loading = true;
      state.rolesData.error = false;
      state.rolesData.data = [];
      state.rolesData.message = "";
    });
    builder.addCase(
      triggerGetAllRoles.fulfilled,
      (state, action) => {
        state.rolesData.loading = false;
        state.rolesData.data = action.payload;
        state.rolesData.error = false;
        state.rolesData.message = action.payload?.message as unknown as string;
        state.rolesData.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
      triggerGetAllRoles.rejected,
      (state, action) => {
        state.rolesData.loading = false;
        state.rolesData.error = true;
        state.rolesData.message = action.payload?.message as unknown as string;
        state.rolesData.statusCode = action.payload?.status_code ?? null;
       
      }
    );

        //ADD ROLES
        builder.addCase(triggerAddRole.pending, (state) => {
          state.addRoleData.loading = true;
          state.addRoleData.error = false;
          state.addRoleData.data = [];
          state.addRoleData.message = "";
        });
        builder.addCase(
          triggerAddRole.fulfilled,
          (state, action) => {
            state.addRoleData.loading = false;
            state.addRoleData.data = action.payload;
            state.addRoleData.error = false;
            state.addRoleData.message = action.payload?.message as unknown as string;
            state.addRoleData.statusCode = action.payload?.status_code as unknown as number;
          


          }
        );
        builder.addCase(
          triggerAddRole.rejected,
          (state, action) => {
            state.addRoleData.loading = false;
            state.addRoleData.error = true;
            state.addRoleData.message = action.payload?.message as unknown as string;
            state.addRoleData.statusCode = action.payload?.status_code ?? null;
           
          }
        );

        //list permissions
        builder.addCase(triggerGetPermissions.pending, (state) => {
          state.loading = true;
          state.error = false;
          state.userData = {};
          state.message = "";
        });
        builder.addCase(
          triggerGetPermissions.fulfilled,
          (state, action) => {
            state.loading = false;
            state.userData = action.payload?.results!;
            state.error = false;
            state.message = action.payload?.message as unknown as string;
            state.statusCode = action.payload?.status_code as unknown as number;
          }
        );
        builder.addCase(
          triggerGetPermissions.rejected,
          (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload?.message as unknown as string;
            state.statusCode = action.payload?.status_code ?? null;
          
          }
        );

        //edit roles and permissions
        builder.addCase(triggerEditRolesAndPermissions.pending, (state) => {
          state.editRolesAndPermissionsData.loading = true;
          state.editRolesAndPermissionsData.error = false;
          state.editRolesAndPermissionsData.data = {};
          state.message = "";
        });
        builder.addCase(
          triggerEditRolesAndPermissions.fulfilled,
          (state, action) => {
            state.editRolesAndPermissionsData.loading = false;
            state.editRolesAndPermissionsData.data = action.payload?.results!;
            state.editRolesAndPermissionsData.error = false;
            state.editRolesAndPermissionsData.message = action.payload?.message as unknown as string;
            state.editRolesAndPermissionsData.statusCode = action.payload?.status_code as unknown as number;
           

          }
        );
        builder.addCase(
          triggerEditRolesAndPermissions.rejected,
          (state, action) => {
            state.editRolesAndPermissionsData.loading = false;
            state.editRolesAndPermissionsData.error = true;
            state.editRolesAndPermissionsData.message = action.payload?.message as unknown as string;
            state.editRolesAndPermissionsData.statusCode = action.payload?.status_code ?? null;


          
          }
        );
  },
});

export const { resetState,resetDeactivateUserDataState,resetAddRoleDataState,resetEditRoleAndPermissionState} = rbacSlice.actions;

export default rbacSlice.reducer;
