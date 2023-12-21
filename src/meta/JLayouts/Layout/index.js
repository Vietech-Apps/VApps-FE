import { PageContainer } from "@ant-design/pro-layout";
import { Row, Col, Steps, Button, Form } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDiv,
  StepLayout,
  StyledButtonComponent,
  StyledIconButton,
  StyledLayoutCard,
  StyleLayoutBody,
} from "./index.style";
import FooterTab from "../FooterComponent/FooterTab";
import { FiActivity } from "react-icons/fi";
import { BiPrinter, BiRefresh } from "react-icons/bi";
import { ShareAltOutlined } from "@ant-design/icons";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getIconByName } from "meta/common/AppIcons";
import { usePermissions } from "meta/common/CheckPermission";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { StyledTabs } from "meta/common/FormFeilds/index.styled";

const FormLayout = ({
  children,
  extra,
  docData = {},
  title,
  codes,
  other,
  footerComponent = true,
  isTable = false,
  items = [],
  stepsprops,
  extraStep,
  tabItems,
  form,
  path,
  revision,
  handleComplete,
  selectedData,
  onSave,
  onRefresh,
  handleNew = () => {},
}) => {
  const { canCreate, canUpdate } = usePermissions(
    RoutePermittedRole[codes.permission || "admin"]
  );
  const navigate = useNavigate();
  const defaultExtra = (
    <>
      {onRefresh && (
        <StyledIconButton
          className="rounded-full"
          type="text"
          onClick={onRefresh}
          icon={<BiRefresh />}
        ></StyledIconButton>
      )}
      {canCreate && (
        <StyledIconButton
          className="rounded-full"
          type="text"
          onClick={() => {
            navigate(`${codes.navPath}/workspace`);
            handleNew();
          }}
          icon={getIconByName("create")}
        >
          New
        </StyledIconButton>
      )}
      <StyledIconButton
        className="rounded-full"
        icon={<ShareAltOutlined className="mr-2" />}
        type="text"
        disabled={Object?.keys(docData)?.length === 0}
      >
        Share / Send
      </StyledIconButton>
      <StyledIconButton
        type="text"
        className="rounded-full"
        icon={<BiPrinter className="mr-2" />}
        disabled={Object?.keys(docData)?.length === 0}
      >
        Pdf / Download
      </StyledIconButton>
      <StyledIconButton
        type="text"
        className="rounded-full"
        icon={<FiActivity />}
        disabled={Object?.keys(docData)?.length === 0}
      ></StyledIconButton>
      {extra}
    </>
  );

  // Default data for extraStep prop
  const defaultExtraStep = (
    <StyledButtonComponent>
      {/* <Button type="primary">Proceed</Button> */}
      {onSave &&
        ((docData && canUpdate) ||
          (Object?.keys(docData)?.length === 0 && canCreate)) && (
          <StyledIconButton
            onClick={onSave}
            icon={<AiOutlineCloudUpload className="mr-2" />}
          >
            Save
          </StyledIconButton>
        )}
      {extraStep}
    </StyledButtonComponent>
  );

  const mergedExtra = isTable ? extra : defaultExtra;

  return (
    <>
      <LayoutDiv>
        {codes.formTitle && (
          <Row>
            <Col xs={24} className="col-btn">
              <PageContainer
                fixedHeader
                size="small"
                title={title || isTable ? codes.tableTitle : codes.formTitle}
                ghost={false}
                onBack={() => navigate(path || codes.navPath)}
                extra={mergedExtra}
                subTitle={
                  revision
                    ? `${
                        docData?.cuId || docData?.cuIdDraft || docData?.id
                      }-${revision}`
                    : docData?.cuId || docData?.cuIdDraft || docData?.id
                }
                content={
                  <StepLayout>
                    <Row>
                      <Col xs={24} sm={12} className="col-btn">
                        {isTable ? extraStep : defaultExtraStep}
                      </Col>
                      <Col xs={24} sm={12} className="flex justify-end">
                        {items && (
                          <Steps
                            // type="navigation"
                            size="small"
                            {...stepsprops}
                            className="site-navigation-steps h-full p-0"
                            items={items}
                          />
                        )}
                      </Col>
                    </Row>
                  </StepLayout>
                }
                {...other}
              />
            </Col>
          </Row>
        )}
      </LayoutDiv>

      <StyleLayoutBody className="body-content-set">
        <StyledLayoutCard className="mt-5">{children}</StyledLayoutCard>
        {tabItems && (
          <Form form={form}>
            <StyledTabs items={tabItems} type="card" className="mt-5" />
          </Form>
        )}
      </StyleLayoutBody>
      {footerComponent && !isTable && (
        <FooterTab
          id={docData?._id}
          folder={codes?.LogTitle}
          data={docData}
          route={codes.dataRoute}
          handleSubmit={() => handleComplete("Draft")}
        />
      )}
    </>
  );
};

export default FormLayout;
