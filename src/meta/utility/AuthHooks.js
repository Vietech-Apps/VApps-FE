import {
  useJWTAuth,
  useJWTAuthActions,
} from "../services/auth/JWTAuthProvider";

const getUserFromJwtAuth = (user) => {
  if (user) {
    const { ...rest } = user;

    return {
      ...rest,
      id: user?._id,
      uid: user?._id,
      displayName: user?.name,
      designation: user?.designation?.title,
      process: user?.process?.title,
      processId: user?.process?._id,
      powers: user?.power?.powers,
      power:
        user?.currLocation?.permissions || user?.power?.powers[0]?.permissions,
    };
  }
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
