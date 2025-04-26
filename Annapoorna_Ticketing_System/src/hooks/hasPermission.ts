import { getPermissions } from "../utils/cookieUtils";

export const hasPermission = (permissionKey: string, feature: string): boolean => {
  const permissions: Array<any> | null = getPermissions(); // Ensure it can be null

  if (!Array.isArray(permissions) || permissions.length === 0) {
    return false; // Return false if not an array or empty
  }

  console.log(permissionKey, feature);

  for (const permission of permissions) {
    if (
      permission?.Feature?.name === feature &&
      Array.isArray(permission.actions) &&
      permission.actions.includes(permissionKey)
    ) {
      return true;
    }
  }

  return false;
};

