import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { BiTask } from "react-icons/bi";
import {
  StyledSpecialTitle,
  StyledWelcomeCard,
  StyledWelcomeCardCol,
  StyledWelcomeCardColContent,
  StyledWelcomeCardColThumb,
  StyledWelcomeCardContainer,
  StyledWelcomeCardContent,
  StyledWelcomeCardHeader,
  StyledWelcomeCardInfo,
  StyledWelcomeCardRow,
  StyledWelcomeCardScroll,
  StyledWelcomeImg,
} from "./index.styled";
import { useAuthUser } from "meta/utility/AuthHooks";
import { MdPendingActions } from "react-icons/md";
import { FcOvertime } from "react-icons/fc";
import { BsListTask } from "react-icons/bs";
import { useGetData } from "meta/services/auth/ezAPI";
import { IoTodayOutline } from "react-icons/io5";

const getWelcomeIcon = (iconType) => {
  switch (iconType) {
    case "MdPendingActions":
      return <MdPendingActions color="#0A8FDC" className="icon" />;
    case "BiTask":
      return <BiTask color="#0A8FDC" className="icon" />;
    case "FcOvertime":
      return <FcOvertime color="#0A8FDC" className="icon" />;
    case "IoTodayOutline":
      return <IoTodayOutline color="#0A8FDC" className="icon" />;
    default:
      return <BsListTask color="#0A8FDC" className="icon" />;
  }
};

const WelcomeCard = ({ taskCount, color }) => {
  const { messages } = useIntl();
  const { user } = useAuthUser();

  return (
    <StyledWelcomeCard>
      <StyledWelcomeCardInfo>
        <StyledWelcomeCardContent>
          <StyledWelcomeCardHeader>
            <h5>{messages["dashboard.analytics.welcome"]}</h5>
            <h3>{`${user?.name} ${user?.lastName}!`}</h3>
          </StyledWelcomeCardHeader>
          <StyledWelcomeCardScroll scrollToTop>
            <StyledWelcomeCardContainer>
              <StyledWelcomeCardRow>
                {taskCount.map((item, index) => (
                  <StyledWelcomeCardCol key={"box-" + index}>
                    <StyledWelcomeCardColThumb>
                      <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                        {getWelcomeIcon(item.icon)}
                      </span>
                    </StyledWelcomeCardColThumb>
                    <StyledWelcomeCardColContent>
                      <StyledSpecialTitle >
                        {item.counts}
                      </StyledSpecialTitle>
                      <p>{item.type}</p>
                    </StyledWelcomeCardColContent>
                  </StyledWelcomeCardCol>
                ))}
              </StyledWelcomeCardRow>
            </StyledWelcomeCardContainer>
          </StyledWelcomeCardScroll>
        </StyledWelcomeCardContent>
        <StyledWelcomeImg>
          <img alt="welcome" src={"/assets/images/bilal/dash-user.jpg"} />
        </StyledWelcomeImg>
      </StyledWelcomeCardInfo>
    </StyledWelcomeCard>
  );
};

export default WelcomeCard;

WelcomeCard.defaultProps = {
  data: [],
};

WelcomeCard.propTypes = {
  data: PropTypes.array,
};
