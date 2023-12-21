const title = "Role";
const dataRoute = "meta/permission";
const navPath = "/admin/employees/permission";

export const roleInfo = {
  formTitle: title,
  LogTitle: title,
  tableTitle: title,
  metaData: title,
  dataRoute,
  navPath,
  title,
};

export const permissionOptions = [
  { value: "create", label: "Create" },
  { value: "read", label: "Read" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
];
