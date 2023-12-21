import React from "react";
import MailsList from "./MailsList";
import MailDetail from "./MailDetail";
import PropTypes from "prop-types";
import AppsContainer from "meta/core/AppsContainer";
import MailSidebar from "./MailSideBar";
import { useIntl } from "react-intl";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useParams } from "react-router-dom";

const Mail = () => {
  const { id } = useParams();

  const onGetMainComponent = () => {
    if (id) {
      return <MailDetail />;
    } else {
      return <MailsList />;
    }
  };

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages["mailApp.mail"]}
      sidebarContent={<MailSidebar />}
    >
      <AppPageMetadata title="Mail App" />
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default Mail;

Mail.defaultProps = {
  match: null,
};

Mail.propTypes = {
  match: PropTypes.object,
};
