export const rejectOptions = [
  { value: "Campaign is over", label: "Campaign is over" },
  {
    value: "User requested deactivation",
    label: "User requested deactivation",
  },
  { value: "Violation of terms", label: "Violation of terms" },
  { value: "Suspicious activity", label: "Suspicious activity" },
  { value: "Other", label: "Other" },
];

export const adminOptions = [
  { value: "Super Admin", label: "Super Admin" },
  { value: "Admin", label: "Admin" },
  { value: "User", label: "User" },
];

export const viewAdminData = {
  id: 1,
  name: "Ekene Dullie",
  email: "ekenedulle@gmail.com",
  status: "Active",
  dateCreated: "22nd Sep 2024",
  role: "Admin",
  roleDescription:
    "This account can view and generate detailed transaction reports.",
  permissions: [
    "Add users",
    "Deactivate user",
    "Suspend user",
    "Assign roles",
    "Deactivate customer account",
  ],
};

export const rolesData = [
  {
    role: "Super Admin",
    description: "This account can create and manage Merchants",
    permissions: [
      { name: "Add users", allowed: true },
      { name: "Deactivate user", allowed: false },
      { name: "Suspend user", allowed: true },
      { name: "Assign roles", allowed: true },
      { name: "Deactivate customer account", allowed: true },
      { name: "Access all reports", allowed: false },
      { name: "Manage system settings", allowed: true },
    ],
  },
  {
    role: "Admin",
    description:
      "This account can view and generate detailed transaction reports",
    permissions: [
      { name: "Add users", allowed: true },
      { name: "Deactivate user", allowed: true },
      { name: "Suspend user", allowed: false },
      { name: "Assign roles", allowed: false },
      { name: "Deactivate customer account", allowed: false },
      { name: "Access financial reports", allowed: true },
      { name: "Manage user feedback", allowed: false },
    ],
  },
  {
    role: "User",
    description: "This account can view personal transaction history",
    permissions: [
      { name: "Add users", allowed: false },
      { name: "Deactivate user", allowed: false },
      { name: "Suspend user", allowed: false },
      { name: "Assign roles", allowed: false },
      { name: "Deactivate customer account", allowed: false },
      { name: "View personal reports", allowed: true },
      { name: "Submit feedback", allowed: true },
    ],
  },
  {
    role: "Guest",
    description: "This account has limited access to view public information",
    permissions: [
      { name: "Add users", allowed: false },
      { name: "Deactivate user", allowed: false },
      { name: "Suspend user", allowed: false },
      { name: "Assign roles", allowed: false },
      { name: "Deactivate customer account", allowed: false },
      { name: "View public reports", allowed: true },
      { name: "Submit feedback", allowed: false },
    ],
  },
];
