import React from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";
import { StyledIconBtn } from "./index.styled";
import clsx from "clsx";
import { getIconByName } from "meta/common/AppIcons";

const AppIconButton = ({
  title,
  kind,
  name,
  icon,
  className,
  onClick,
  ...rest
}) => {
  if (kind)
    return (
      <Tooltip title={title}>
        <Button
          className={clsx("icon-btn", className)}
          // shape="circle"
          name={name}
          type="primary"
          icon={getIconByName(icon)}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          {...rest}
        />
      </Tooltip>
    );
  if (title)
    return (
      <Tooltip title={title}>
        <StyledIconBtn
          className={clsx("icon-btn", className)}
          shape="circle"
          icon={icon}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          {...rest}
        />
      </Tooltip>
    );
  return (
    <StyledIconBtn
      className={clsx("icon-btn", className)}
      shape="circle"
      icon={icon}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      {...rest}
    />
  );
};

export default AppIconButton;

AppIconButton.propTypes = {
  icon: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.any,
  onClick: PropTypes.func,
};

AppIconButton.defaultProps = {
  onClick: () => {},
  className: "",
  title: "",
};
