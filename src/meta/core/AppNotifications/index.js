import React from "react";
//import notification from '../../services/db/notifications/notification';
import { Badge, Dropdown } from "antd";
import IntlMessages from "../../utility/IntlMessages";
import NotificationItem from "./NotificationItem";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  StyledDrowdownWrapper,
  StyledNotifyButtonAll,
  StyledNotifyIcon,
  StyledNotifyLink,
  StyledNotifyList,
  StyledNotifyScrollSubmenu,
  StyledNotifyText,
} from "./index.styled";
import { useGetData } from "meta/services/auth/ezAPI";

const AppNotifications = () => {
  const [{ apiData: notification }, { setRefreshing }] = useGetData(
    "meta/notification/my-list",
    []
  );
  const items = [
    {
      key: 1,
      label: (
        <span className="header">
          <IntlMessages id="common.notifications" /> ({notification?.length})
        </span>
      ),
    },
    {
      key: 2,
      label: (
        <StyledNotifyScrollSubmenu>
          <StyledNotifyList
            dataSource={notification}
            renderItem={(item) => {
              return (
                <NotificationItem
                  setRefreshing={setRefreshing}
                  key={item._id}
                  item={item}
                />
              );
            }}
          />
        </StyledNotifyScrollSubmenu>
      ),
    },
    {
      key: 3,
      label: (
        <StyledNotifyButtonAll type="primary">
          <IntlMessages id="common.viewAll" />
        </StyledNotifyButtonAll>
      ),
    },
  ];
  return (
    <Badge size="small" overflowCount={20} count={notification?.length}>
      <StyledDrowdownWrapper>
        <Dropdown
          menu={{ items }}
          className="dropdown"
          overlayClassName="header-notify-messages"
          getPopupContainer={(triggerNode) => triggerNode}
          trigger={["click"]}
        >
          <StyledNotifyLink
            onClick={(e) => {
              e.preventDefault();
              setRefreshing();
            }}
          >
            <StyledNotifyIcon>
              <IoIosNotificationsOutline />
            </StyledNotifyIcon>
            <StyledNotifyText>
              <IntlMessages id="common.notifications" />
            </StyledNotifyText>
          </StyledNotifyLink>
        </Dropdown>
      </StyledDrowdownWrapper>
    </Badge>
  );
};

export default AppNotifications;
