//currentHeader
//metagrc
//vietech
//usingheader
//manzoorjoyia
//joyia

import React, { useState } from "react";
import { Dropdown, Modal, Select } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import AppLanguageSwitcher from "../../AppLanguageSwitcher";
import AppHeaderMessages from "../../AppHeaderMessages";
import AppNotifications from "../../AppNotifications";
import { AiOutlineMenu } from "react-icons/ai";
import PropTypes from "prop-types";
import UserInfo from "../components/UserInfo";
import { useSidebarContext } from "../../../utility/AppContextProvider/SidebarContextProvider";
import {
  StyledAppHeaderHorFixed,
  StyledAppHeaderHorFixedMain,
  StyledAppHeaderHorMainFlex,
  StyledAppHorizontalNav,
  StyledHeaderContainer,
  StyledHeaderHorFixedSecDesktop,
  StyledHeaderHorFixedSecMobile,
  StyledHeaderSelectHorFixed,
  StyledMsgAvatar,
} from "./index.styled";
import { StyledDropdownWrapper } from "../index.styled";
import { useAuthUser } from "meta/utility/AuthHooks";
import jwtAxios from "meta/services/auth/jwt-api";
import { useGetData } from "meta/services/auth/ezAPI";
import errorHandler from "meta/services/auth/errorHandler";
import successHandler from "meta/services/auth/successHandler";
import { useEffect } from "react";
import CompanyInfo from "../CompanyInfo";

const items = [
  { key: 1, label: <AppHeaderMessages /> },
  { key: 2, label: <AppNotifications /> },
  { key: 3, label: <AppLanguageSwitcher /> },
];
const { Option } = Select;
const AppHeader = ({ showDrawer }) => {
  const { sidebarColorSet } = useSidebarContext();
  const { user } = useAuthUser();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [{ apiData: branches }, { setRefreshing }] = useGetData(
    "meta/company/branch/rolebaselist",
    []
  );
  console.log(branches);
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = async (branch) => {
    setConfirmLoading(true);
    try {
      const response = await jwtAxios.put(`admin/auth/changebranch/${branch}`);
      successHandler(response);
      setIsOpen(false);
      setConfirmLoading(false);
      window.location.reload();
    } catch (error) {
      errorHandler(error);
      setConfirmLoading(false);
    }
    setIsOpen(false);
  };

  const handleFocus = () => {
    setRefreshing(true);
  };

  console.log(branches);

  useEffect(() => {
    if (branches.length > 0 && !user.currLocation) {
      setIsOpen(true);
    }
  }, [branches]);

  return (
    <StyledAppHeaderHorFixed
      style={{
        backgroundColor: sidebarColorSet.sidebarBgColor,
        color: sidebarColorSet.sidebarTextColor,
      }}
    >
      <StyledAppHeaderHorFixedMain>
        <StyledHeaderContainer>
          <StyledAppHeaderHorMainFlex>
            <div className="flex items-center">
              <a className="trigger" onClick={showDrawer}>
                <AiOutlineMenu />
              </a>
              <img src="https://metagrc-link.s3.eu-west-1.amazonaws.com/vapps.png" />

              <StyledAppHorizontalNav />
            </div>

            <Modal
              okButtonProps={{
                disabled: true,
              }}
              title="Select a location to Proceed"
              open={isOpen}
            >
              <StyledHeaderSelectHorFixed
                style={{ width: "100%" }}
                onChange={handleChange}
                onFocus={handleFocus}
                loading={confirmLoading}
                placeholder={"Select Company"}
              >
                {branches?.map((branch, i) => (
                  <Option
                    key={i}
                    value={branch._id}
                    style={{ backgroundColor: branch?.parentCompany?.color }}
                  >
                    {branch?.parentCompany?.name}
                  </Option>
                ))}
              </StyledHeaderSelectHorFixed>
            </Modal>
            <div className="flex items-center">
              <StyledHeaderHorFixedSecDesktop>
                <AppLanguageSwitcher />
                <AppHeaderMessages />
                <AppNotifications />
              </StyledHeaderHorFixedSecDesktop>
              <UserInfo />
              <CompanyInfo />
              <StyledHeaderHorFixedSecMobile>
                <StyledDropdownWrapper>
                  <Dropdown
                    menu={{ items }}
                    overlayClassName="dropdown-wrapper"
                    getPopupContainer={(triggerNode) => triggerNode}
                    trigger={["click"]}
                  >
                    <a
                      className="ant-dropdown-link-mobile"
                      onClick={(e) => e.preventDefault()}
                    >
                      <FiMoreVertical />
                    </a>
                  </Dropdown>
                </StyledDropdownWrapper>
              </StyledHeaderHorFixedSecMobile>
            </div>
          </StyledAppHeaderHorMainFlex>
        </StyledHeaderContainer>
      </StyledAppHeaderHorFixedMain>
    </StyledAppHeaderHorFixed>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  showDrawer: PropTypes.func,
};
