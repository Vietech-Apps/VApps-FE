import { Button, Drawer, Tooltip } from "antd";
import React, { useState } from "react";
import { FiActivity } from "react-icons/fi";
import Logs from ".";
import { StyledIconButton } from "meta/JLayouts/Layout/index.style";

const LogDrawer = ({ name }) => {
  const [open, setOpen] = useState();
  return (
    <>
      <Tooltip
        placement={"bottomLeft"}
        color="cyan"
        title={`Activity log (${name}) `}
        key={"logs"}
      >
        <StyledIconButton
          icon={<FiActivity />}
          type="text"
          onClick={() => setOpen(true)}
        ></StyledIconButton>
      </Tooltip>
      <Drawer
        title={`Activity log (${name}) `}
        placement="right"
        // closable={false}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Logs name={name} reload={open} />
      </Drawer>
    </>
  );
};

export default LogDrawer;
