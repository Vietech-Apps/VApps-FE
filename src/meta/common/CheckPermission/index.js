import { useAuthUser } from "meta/utility/AuthHooks";
import { useState, useEffect } from "react";

export const usePermissions = (moduleName) => {
  const { user } = useAuthUser();
  const [permissions, setPermissions] = useState({
    canRead: false,
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canImport: false,
    canExport: false,
  });

  useEffect(() => {
    if (
      ((!moduleName || moduleName === "admin") && user?.isAdmin) ||
      moduleName === "user"
    ) {
      setPermissions({
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canImport: true,
        canExport: true,
      });
      return;
    }
    const userRole = user?.power;
    const isAdmin = user?.isAdmin;
    if (isAdmin) {
      setPermissions({
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canImport: true,
        canExport: true,
      });
    } else if (Object.prototype.hasOwnProperty.call(userRole, moduleName)) {
      const modulePermissions = userRole[moduleName];
      setPermissions({
        canRead: modulePermissions.includes("read"),
        canCreate: modulePermissions.includes("create"),
        canUpdate: modulePermissions.includes("update"),
        canDelete: modulePermissions.includes("delete"),
        canImport: modulePermissions.includes("import"),
        canExport: modulePermissions.includes("export"),
      });
    } else {
      setPermissions({
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
        canImport: false,
        canExport: false,
      });
    }
  }, [moduleName]);

  return permissions;
};
