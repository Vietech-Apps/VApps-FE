import { CaretDownOutlined } from "@ant-design/icons";
import { Col, Radio, Space, Switch, Typography } from "antd";
import {
  StyledCompanyDropdown,
  StyledMsgListItem,
  StyledMsgAvatar1,
  StyledMsgListItemContent,
  StyledText,
  StyledSelect,
} from "./index.styled";
import React, { useState } from "react";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import errorHandler from "meta/services/auth/errorHandler";
import { useAuthUser } from "meta/utility/AuthHooks";
import { useNavigate } from "react-router-dom";

const CompanyInfo = () => {
  const { Text } = Typography;
  const [branchSelect, setBranchSelect] = useState("Main Branch");
  const textWidth = { width: "140px" };
  const { user } = useAuthUser();
  const [{ apiData: branches }, { setRefreshing }] = useGetData(
    "meta/company/branch/rolebaselist",
    []
  );
  const [companySelectName, setCompanySelectName] = useState(
    user?.currLocation
  );
  const navigate = useNavigate();
  const CompanySelect = () => {
    const [selectedCompanies, setSelectedCompanies] = useState([]);

    const handleChange = async (branch) => {
      try {
        const response = await jwtAxios.put(
          `admin/auth/changebranch/${branch}`
        );
        setCompanySelectName(branches?.find((p) => p._id === branch));
        successHandler(response);
        window.location.reload();
      } catch (error) {
        errorHandler(error);
      }
    };
    const handleCompanySwitch = (companyTitle, checked) => {
      if (checked) {
        setSelectedCompanies((prevCompanies) => [
          ...prevCompanies,
          companyTitle,
        ]);
      } else {
        setSelectedCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company !== companyTitle)
        );
      }
    };
    return (
      <>
        <StyledText>Select Comapany</StyledText>
        <Radio.Group
          className="w-full"
          value={companySelectName?._id}
          onChange={(e) => handleChange(e.target.value)}
        >
          {branches?.map((item, index) => (
            <Col xs={24} sm={12} key={index}>
              <StyledMsgListItem className="item-hover flex justify-bet">
                <Radio value={item?._id}>
                  <StyledMsgListItemContent className="flex items-center">
                    <StyledMsgAvatar1 />
                    <h3 style={textWidth}>
                      <Text ellipsis>{item?.parentCompany?.name}</Text>
                    </h3>
                  </StyledMsgListItemContent>
                </Radio>
                <Switch
                  onChange={(checked) => handleCompanySwitch(item._id, checked)}
                />
              </StyledMsgListItem>
            </Col>
          ))}
        </Radio.Group>
        {/* <StyledText>Add Comapany</StyledText>
        <StyledMsgListItem className="item-hover flex justify-bet">
          <Button type="primary" icon={<PlusCircleOutlined />}></Button>
        </StyledMsgListItem> */}
      </>
    );
  };
  const items = [
    {
      key: "1",
      label: (
        <StyledMsgListItem
          style={{
            background: companySelectName?.parentCompany?.color || "#B2DFDB",
            display: "flex",
          }}
        >
          <StyledMsgAvatar1 src="https://media.licdn.com/dms/image/C510BAQHVR9ucUJs0ig/company-logo_200_200/0/1573025512895?e=2147483647&v=beta&t=ATXBaYdKBfTUoPgmZZ6a6wYLqCew05fu-LBc5xeVqxM" />
          <StyledMsgListItemContent className="fw-500 flex-grow-1">
            <div className="flex flex-col">
              <StyledSelect
                className="text-gray-700 ant-select-selector-set"
                defaultValue={branchSelect}
                onChange={(e) => setBranchSelect(e)}
                isBackground={
                  companySelectName?.parentCompany?.color || "#B2DFDB"
                }
                options={[
                  { value: "Main Branch", label: "Main Branch" },
                  { value: "Sub Branch", label: "Sub Branch" },
                ]}
              />
            </div>
          </StyledMsgListItemContent>
        </StyledMsgListItem>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <StyledMsgListItem className="flex flex-col items-start item-hover">
            <StyledMsgListItemContent>
              <h3>
                <div onClick={() => navigate(`/admin/company-setting`)}>
                  Files
                </div>
              </h3>
            </StyledMsgListItemContent>
          </StyledMsgListItem>
          <StyledMsgListItem className="flex flex-col items-start item-hover">
            <StyledMsgListItemContent>
              <div onClick={() => navigate(`/admin/company-setting`)}>
                Settings
              </div>
            </StyledMsgListItemContent>
          </StyledMsgListItem>
        </>
      ),
      // disabled: true,
    },

    {
      key: "3",
      label: (
        <>
          <CompanySelect />
        </>
      ),
    },
  ];

  return (
    <>
      <StyledCompanyDropdown
        isbackground={companySelectName?.parentCompany?.color || "#B2DFDB"}
        menu={{
          items,
        }}
        overlayClassName="styledDropDown"
        style={{
          backgroundColor: companySelectName?.parentCompany?.color || "#B2DFDB",
        }}
      >
        <a onClick={(e) => e.preventDefault()} style={{ marginLeft: "1rem" }}>
          <Space>
            <p className="flex items-center">
              <p className="flex flex-col items-start fw-500">
                <span style={textWidth}>
                  <Text ellipsis>{companySelectName?.parentCompany?.name}</Text>
                </span>
                <span className="fs-5 text-gray-700 mb-1">
                  ({branchSelect})
                </span>
              </p>
            </p>
            <CaretDownOutlined className="ml-2" />
          </Space>
        </a>
      </StyledCompanyDropdown>
    </>
  );
};
export default CompanyInfo;
