import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios, { setAuthToken } from "./jwt-api";
import { useInfoViewActionsContext } from "../../utility/AppContextProvider/InfoViewContextProvider";
import { useGetData } from "./ezAPI";

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);
export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({ children, log }) => {
  const { fetchStart, fetchSuccess, fetchError } = useInfoViewActionsContext();
  const [jwtData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const getAuthUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setJWTAuthData({
        user: undefined,
        isLoading: false,
        isAuthenticated: false,
      });
      return;
    }
    setAuthToken(token);
    try {
      const { data } = await jwtAxios.get(`admin/auth`);

      setJWTAuthData({
        user: data,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      localStorage.removeItem("token");
      setJWTAuthData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      console.log("error", error);
    }
  };
  useEffect(() => {
    getAuthUser();
  }, []);

  const signInUser = async (loginAdminData) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post(
        `auth/login?timestamp=${new Date().getTime()}`,
        loginAdminData
      );
      setAuthToken(data.result.token);
      if (data.success === true) {
        setJWTAuthData({
          user: data.result.admin,
          isAuthenticated: true,
          isLoading: false,
        });
      }
      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...jwtData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error.response.data.message);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...jwtData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signInUser,
          logout,
          getAuthUser,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
