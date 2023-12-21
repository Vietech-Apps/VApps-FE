import React, { useState } from "react";
import AppInfoView from "meta/core/AppInfoView";
import FaqSideBar from "./FaqSideBar";
import FaqList from "./FaqList";
import { generalFaq } from "meta/services/db/extraPages/faqList/general";
import { installationFaq } from "meta/services/db/extraPages/faqList/installation";
import { pricingFaq } from "meta/services/db/extraPages/faqList/pricing";
import { licenseFaq } from "meta/services/db/extraPages/faqList/licenseTypes";
import { supportFaq } from "meta/services/db/extraPages/faqList/support";
import IntlMessages from "meta/utility/IntlMessages";
import AppRowContainer from "meta/core/AppRowContainer";
import { Col } from "antd";
import AppAnimate from "meta/core/AppAnimate";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { StyledFaqHeader, StyledFaqSection } from "./index.styled";

const FAQ = () => {
  const [dataValue, setDataValue] = useState(generalFaq);
  const [selectionId, setSelectionId] = useState(101);

  const onGetFaqData = (value) => {
    setSelectionId(value);
    switch (value) {
      case 101:
        setDataValue(generalFaq);
        break;

      case 102:
        setDataValue(installationFaq);
        break;

      case 103:
        setDataValue(pricingFaq);
        break;

      case 104:
        setDataValue(licenseFaq);
        break;

      case 105:
        setDataValue(supportFaq);
        break;
      default: {
        break;
      }
    }
  };

  return (
    <>
      <AppPageMetadata title="FAQ" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledFaqSection key="a">
          <StyledFaqHeader>
            <h2>
              <IntlMessages id="faq.heading" />
            </h2>
            <p>
              <IntlMessages id="faq.content" />
            </p>
          </StyledFaqHeader>

          <AppRowContainer type="bottom">
            <Col xs={24} md={8} lg={6} key="a">
              <FaqSideBar
                onGetFaqData={onGetFaqData}
                selectionId={selectionId}
              />
            </Col>

            <Col xs={24} md={16} lg={18} key="b">
              <FaqList faqList={dataValue} />
              <AppInfoView />
            </Col>
          </AppRowContainer>
        </StyledFaqSection>
      </AppAnimate>
    </>
  );
};

export default FAQ;
