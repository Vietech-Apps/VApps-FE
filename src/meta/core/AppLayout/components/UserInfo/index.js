import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Dropdown, Image } from "antd";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { useThemeContext } from "../../../../utility/AppContextProvider/ThemeContextProvider";
import { useAuthMethod, useAuthUser } from "../../../../utility/AuthHooks";
import { useSidebarContext } from "../../../../utility/AppContextProvider/SidebarContextProvider";
import PropTypes from "prop-types";
import {
  StyledCrUserDesignation,
  StyledCrUserInfo,
  StyledCrUserInfoAvatar,
  StyledCrUserInfoContent,
  StyledCrUserInfoInner,
  StyledUserArrow,
  StyledUsername,
  StyledUsernameInfo,
} from "./index.styled";
import ChangePassword from "pages/root/Employee/Employee/List/ChangePassword";
import { User } from "@auth0/auth0-spa-js";

const UserInfo = ({ hasColor }) => {
  const { themeMode } = useThemeContext();
  const { logout } = useAuthMethod();
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const { sidebarColorSet } = useSidebarContext();
  const { isSidebarBgImage } = useSidebarContext();

  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  const items = [
    {
      key: 1,
      label: (
        <div onClick={() => navigate(`/employee/profile/${user?._id}`)}>
          My Profile
        </div>
      ),
    },
    {
      key: 3,
      label: <ChangePassword data={user} isProfile={true} />,
    },
    {
      key: 2,
      label: <div onClick={() => logout()}>Logout</div>,
    },
  ];

  return (
    <>
      {hasColor ? (
        <StyledCrUserInfo
          style={{
            backgroundColor: isSidebarBgImage
              ? ""
              : sidebarColorSet.sidebarHeaderColor,
            color: sidebarColorSet.sidebarTextColor,
          }}
          className={clsx("cr-user-info", {
            light: themeMode === "light",
          })}
        >
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}
          >
            <StyledCrUserInfoInner className="ant-dropdown-link">
              {user?.picture.length > 0 ? (
                <StyledCrUserInfoAvatar src={user?.picture[0]?.url} />
              ) : (
                <StyledCrUserInfoAvatar>
                  {getUserAvatar()}
                </StyledCrUserInfoAvatar>
              )}
              <StyledCrUserInfoContent className="cr-user-info-content">
                <StyledUsernameInfo>
                  <StyledUsername
                    className={clsx("text-truncate", {
                      light: themeMode === "light",
                    })}
                  >
                    {`${user.name || ""} ${user.lastName || ""}`}
                  </StyledUsername>
                  <StyledUserArrow className="cr-user-arrow">
                    <FaChevronDown />
                  </StyledUserArrow>
                </StyledUsernameInfo>
                <StyledCrUserDesignation className="text-truncate">
                  @{user?.designation}
                </StyledCrUserDesignation>
              </StyledCrUserInfoContent>
            </StyledCrUserInfoInner>
          </Dropdown>
        </StyledCrUserInfo>
      ) : (
        <StyledCrUserInfo
          className={clsx("cr-user-info", {
            light: themeMode === "light",
          })}
        >
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}
          >
            <StyledCrUserInfoInner className="ant-dropdown-link">
              {user.photoURL ? (
                <StyledCrUserInfoAvatar src={user.photoURL} />
              ) : (
                // <StyledCrUserInfoAvatar>
                //   {getUserAvatar()}
                // </StyledCrUserInfoAvatar>
                <FaUserCircle
                  style={{ height: "25px", width: "25px", color: "green" }}
                />
              )}
              <StyledCrUserInfoContent className="cr-user-info-content">
                <StyledUsernameInfo>
                  <StyledUsername
                    className={clsx("text-truncate", {
                      light: themeMode === "light",
                    })}
                  >
                    {user.displayName ? user.displayName : "admin user "}
                  </StyledUsername>
                  <StyledUserArrow className="cr-user-arrow">
                    <FaChevronDown />
                  </StyledUserArrow>
                </StyledUsernameInfo>
                <StyledCrUserDesignation className="text-truncate cr-user-designation">
                  System Manager
                </StyledCrUserDesignation>
              </StyledCrUserInfoContent>
            </StyledCrUserInfoInner>
          </Dropdown>
        </StyledCrUserInfo>
      )}
    </>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  hasColor: PropTypes.bool,
};
