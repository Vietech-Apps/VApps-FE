import {
  useJWTAuth,
  useJWTAuthActions,
} from "../services/auth/JWTAuthProvider";

const getUserFromJwtAuth = (user) => {
  console.log("User in getUserFromJwtAuth", user);
  if (user) {
    const { _id, name, designation, process, currLocation, power } = user;

    return {
      id: _id || null,
      uid: _id || null,
      displayName: name || null,
      designation: designation?.title || null,
      process: process?.title || null,
      processId: process?._id || null,
      powers: power?.powers || null,
      power:
        currLocation?.permissions ??
        power?.powers[0]?.permissions ??
        "defaultUserRole",
    };
  }
  console.log("user in getUserfromJwtAuth before returning", user);
  return user;
};

export const useAuthUser = () => {
  const { user, isAuthenticated, isLoading } = useJWTAuth();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromJwtAuth(user),
  };
};

export const useAuthMethod = () => {
  const { signInUser, signUpUser, logout } = useJWTAuthActions();

  return {
    signInUser,
    logout,
    signUpUser,
  };
};
