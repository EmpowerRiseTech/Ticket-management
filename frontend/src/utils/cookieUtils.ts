type UserToken = string | undefined;

interface UserPermissions {
  [key: string]: boolean;
}

export const setToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const setPermissions = (permissions: UserPermissions): void => {
  try {
    const cleanedPermissions = permissions.map(p => ({
      ...p,
      actions: typeof p.actions === 'string' ? JSON.parse(p.actions) : p.actions
    }));

    const json = JSON.stringify(cleanedPermissions);

    console.log("Cleaned Permissions", cleanedPermissions);
    console.log("JSON Stringified", json);

    // Store in localStorage
    localStorage.setItem('permissions', json);

    console.log("Permissions stored in localStorage");
  } catch (error) {
    console.error("Error storing permissions in localStorage:", error);
  }
};

export const getToken = (): UserToken => {
  return localStorage.getItem('authToken') ?? undefined;
};

export const removeToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('permissions');
};

export const isLoggedIn = (): boolean => {
  return !!getToken();
};

export const getPermissions = (): UserPermissions => {
  const permissions = localStorage.getItem('permissions');
  console.log(permissions, "permissions");

  if (!permissions || permissions === 'undefined') {
    return {};
  }

  if (permissions) {
    try {
      const isAllowed = JSON.parse(permissions);
      return isAllowed;
    } catch (err) {
      console.error('Failed to parse permissions from localStorage:', err);
      return {};
    }
  } else {
    return {};
  }
};

export const hasPermission = (permission: string): boolean => {
  const permissions = getPermissions();
  return permissions[permission] ?? false;
};
