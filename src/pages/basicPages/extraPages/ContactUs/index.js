import React from "react";
import ContactUsForm from "./ContactUsForm";
import SendMessage from "./SendMessage";
import contactUsData from "meta/services/db/extraPages/contactUs";
import Address from "./Address";
import SimpleMap from "./SimpleMap";
import AppCard from "meta/core/AppCard";
import AppRowContainer from "meta/core/AppRowContainer";
import { Col } from "antd";
import { StyledContactSimpleMap } from "./index.styled";
import AppAnimate from "meta/core/AppAnimate";

const ContactUs = () => {
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <AppCard>
        <StyledContactSimpleMap>
          <SimpleMap />
        </StyledContactSimpleMap>
        <SendMessage sendMessage={contactUsData.sendMessage} />
        <AppRowContainer>
          <Col item xs={24} md={12}>
            <ContactUsForm />
          </Col>
          <Col item xs={24} md={12}>
            <Address />
          </Col>
        </AppRowContainer>
      </AppCard>
    </AppAnimate>
  );
};

export default ContactUs;
