import { PageHeader } from "@ant-design/pro-layout";
import React from "react";
const HeaderApp = ({
  className,
  title,
  subTitle,
  extra,
  footer,
  onback,
  children,
  breadcrumb,
  tag,
  avatar,
  ghost,
}) => (
  <div className="site-page-header-ghost-wrapper">
    <PageHeader
      tag={tag}
      avatar={avatar}
      className={className}
      ghost={ghost}
      title={title}
      subTitle={subTitle}
      onBack={onback ? () => window.history.back() : false}
      extra={extra}
      breadcrumb={{ breadcrumb }}
      footer={footer}
    >
      {children}
    </PageHeader>
  </div>
);

export default HeaderApp;
