import React from "react";
import IntlMessages from "meta/utility/IntlMessages";
import PropTypes from "prop-types";
import { FiMoreVertical } from "react-icons/fi";
import { Dropdown } from "antd";
import AppIconButton from "meta/core/AppIconButton";
import { putDataApi } from "meta/utility/APIHooks";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";

const MoreOptions = (props) => {
  const { checkedMails, setCheckedMails, mailList, setData } = props;
  const infoViewActionsContext = useInfoViewActionsContext();

  let unReadOption;
  let readOption;
  let starredOption;
  let unStarredOption;

  mailList.map((mail) => {
    if (checkedMails.includes(mail.id) && mail.isRead) {
      unReadOption = true;
    }
    if (checkedMails.includes(mail.id) && !mail.isRead) {
      readOption = true;
    }
    if (checkedMails.includes(mail.id) && mail.isStarred) {
      unStarredOption = true;
    }
    if (checkedMails.includes(mail.id) && !mail.isStarred) {
      starredOption = true;
    }
    return null;
  });

  const onChangeReadStatus = (statusValue) => {
    const status = !!statusValue;
    putDataApi("/api/mailApp/update/read", infoViewActionsContext, {
      mailIds: checkedMails,
      status: status,
    })
      .then((data) => {
        setData(data);
        setCheckedMails([]);
        infoViewActionsContext.showMessage(
          `Email marked as ${status ? "read" : "unread"}`
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onChangeAllReadStatus = (statusValue) => {
    const status = !!statusValue;
    const allMails = mailList.map((mail) => mail.id);
    putDataApi("/api/mailApp/update/read", infoViewActionsContext, {
      mailIds: allMails,
      status: status,
    })
      .then((data) => {
        setData(data);
        setCheckedMails([]);
        infoViewActionsContext.showMessage(
          `Email marked as ${status ? "read" : "unread"}`
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onChangeAllStarred = (status) => {
    const allMails = mailList.map((mail) => mail.id);
    putDataApi("/api/mailApp/update/starred", infoViewActionsContext, {
      mailIds: allMails,
      status: status,
    })
      .then((data) => {
        setData(data);
        setCheckedMails([]);
        infoViewActionsContext.showMessage(
          `Email(s) marked as ${status ? "stared" : "unread"}`
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onChangeStarredStatus = (status) => {
    putDataApi("/api/mailApp/update/starred", infoViewActionsContext, {
      mailIds: checkedMails,
      status: status,
    })
      .then((data) => {
        setData(data);
        setCheckedMails([]);
        infoViewActionsContext.showMessage(
          `Email(s) marked as ${status ? "stared" : "unread"}`
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const menuViewMore = [
    {
      key: 1,
      label: readOption ? (
        <span onClick={() => onChangeReadStatus(1)}>
          <IntlMessages id="mailApp.markAsRead" />
        </span>
      ) : null,
    },
    {
      key: 2,
      label: unReadOption ? (
        <span onClick={() => onChangeReadStatus(0)}>
          <IntlMessages id="mailApp.markAsUnread" />
        </span>
      ) : null,
    },
    {
      key: 3,
      label: starredOption ? (
        <span onClick={() => onChangeStarredStatus(1)}>
          <IntlMessages id="mailApp.markAsImportant" />
        </span>
      ) : null,
    },
    {
      key: 4,
      label: unStarredOption ? (
        <span onClick={() => onChangeStarredStatus(0)}>
          <IntlMessages id="mailApp.markAsNotImportant" />
        </span>
      ) : null,
    },
  ];

  const menuViewMoreTo = [
    {
      key: "01",
      label: (
        <span onClick={() => onChangeAllReadStatus(1)}>
          <IntlMessages id="mailApp.markAllAsRead" />
        </span>
      ),
    },
    {
      key: "02",
      label: (
        <span onClick={() => onChangeAllReadStatus(0)}>
          <IntlMessages id="mailApp.markAllAsUnread" />
        </span>
      ),
    },
    {
      key: "03",
      label: (
        <span onClick={() => onChangeAllStarred(1)}>
          <IntlMessages id="mailApp.markAllAsImportant" />
        </span>
      ),
    },
    {
      key: "04",
      label: (
        <span onClick={() => onChangeAllStarred(0)}>
          <IntlMessages id="mailApp.markAllAsNotImportant" />
        </span>
      ),
    },
  ];

  return (
    <>
      {checkedMails.length > 0 ? (
        <Dropdown menu={{ items: menuViewMore }} trigger={["click"]}>
          <AppIconButton
            title={<IntlMessages id="common.more" />}
            icon={<FiMoreVertical />}
          />
        </Dropdown>
      ) : (
        <Dropdown menu={{ items: menuViewMoreTo }} trigger={["click"]}>
          <AppIconButton
            title={<IntlMessages id="common.more" />}
            icon={<FiMoreVertical />}
          />
        </Dropdown>
      )}
    </>
  );
};

export default MoreOptions;

MoreOptions.defaultProps = {
  checkedMails: [],
};

MoreOptions.propTypes = {
  checkedMails: PropTypes.array.isRequired,
  setCheckedMails: PropTypes.func,
  setData: PropTypes.func,
  path: PropTypes.any.isRequired,
  mailList: PropTypes.array,
};
