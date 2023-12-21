import React, { createRef, useEffect } from "react";
import MailDetailHeader from "./MailDetailHeader";
import MailDetailBody from "./MailDetailBody";
import { useParams } from "react-router-dom";
import AppsContent from "meta/core/AppsContainer/AppsContent";
import AppsHeader from "meta/core/AppsContainer/AppsHeader";
import { MailDetailSkeleton } from "meta/core/AppSkeleton/MailDetailSkeleton";
import { StyledMailDetail } from "./index.styled";
import AppAnimate from "meta/core/AppAnimate";
import { useGetDataApi } from "meta/utility/APIHooks";

const MailDetail = () => {
  const contentRef = createRef();

  const { id } = useParams();

  const [{ apiData: selectedMail }, { setQueryParams, setData }] =
    useGetDataApi("/api/mailApp/mail/", undefined, { id: id }, false);

  useEffect(() => {
    setQueryParams({ id });
  }, [id]);

  const onUpdateSelectedMail = (data) => {
    setData(data);
  };

  if (!selectedMail) {
    return <MailDetailSkeleton />;
  }

  return (
    <StyledMailDetail ref={contentRef}>
      <AppsHeader>
        <MailDetailHeader
          selectedMail={selectedMail}
          onUpdateSelectedMail={onUpdateSelectedMail}
        />
      </AppsHeader>
      <AppsContent isDetailView>
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <MailDetailBody
            selectedMail={selectedMail}
            key={"mail_detail"}
            onUpdateSelectedMail={onUpdateSelectedMail}
          />
        </AppAnimate>
      </AppsContent>
    </StyledMailDetail>
  );
};

export default MailDetail;
