import { Link } from "react-router-dom";
import React from "react";
import routesConfig from "../../pages/routeConfig";
import { useIntl } from "react-intl";
import { useAuthUser } from "./AuthHooks";

const renderMenuItemChildren = (item) => {
  const { icon, messageId, path } = item;
  const { messages } = useIntl();

  if (path && path.includes("/"))
    return {
      key: item.id,
      icon:
        icon &&
        (React.isValidElement(icon) ? (
          <span className="ant-menu-item-icon">{icon}</span>
        ) : (
          <icon className="ant-menu-item-icon" />
        )),
      label: (
        <Link to={path}>
          <span data-testid={messageId.toLowerCase + "-nav"}>
            {messages[messageId]}
          </span>
        </Link>
      ),
    };
  else {
    return {
      key: item.id,
      icon:
        icon &&
        (React.isValidElement(icon) ? (
          <span className="ant-menu-item-icon">{icon}</span>
        ) : (
          <icon className="ant-menu-item-icon" />
        )),
      label: (
        <span data-testid={messageId.toLowerCase + "-nav"}>
          {messages[messageId]}
        </span>
      ),
    };
  }
};

const renderMenuItem = (item) => {
  const { user } = useAuthUser();
  const userRole = user?.power;
  const isAdmin = user?.isAdmin;
  const { permittedRole } = item;
  if (
    isAdmin ||
    permittedRole=="user"||
      Object.prototype.hasOwnProperty.call(userRole, permittedRole) &&
        userRole[permittedRole].length > 0
    )
   {
    return item.type === "collapse"
      ? {
          key: item.id,
          ...renderMenuItemChildren(item),
          children: item.children.map((item) => renderMenuItem(item)),
          type: "collapse",
        }
      : {
          key: item.id,
          ...renderMenuItemChildren(item),
        };
  }
};

const renderMenu = (item) => {
  const { user } = useAuthUser();
  const userRole = user?.power;
  const isAdmin = user?.isAdmin;
  const { permittedRole } = item;
  if (
    isAdmin ||
    permittedRole == "user" ||
    (Object.prototype.hasOwnProperty.call(userRole, permittedRole) &&
      userRole[permittedRole].length > 0)
  ) {
    return item.type === "group"
      ? {
          key: item.path ? item.path : item.id,
          ...renderMenuItemChildren(item),
          children: item.children.map((item) => renderMenuItem(item)),
          type: "group",
        }
      : {
          key: item.id,
          exact: item.exact,
          ...renderMenuItemChildren(item),
        };
  }
};

export const getRouteMenus = () => {
  return routesConfig.map((route) => renderMenu(route));
};
