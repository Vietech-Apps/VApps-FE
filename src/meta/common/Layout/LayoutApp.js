import { message } from "antd";
import AppTableContainer from "meta/core/AppTableContainer";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useEffect, useState } from "react";
import HeaderApp from "../Header/HeaderApp";
import AppsPagination from "meta/core/AppsPagination";
import AppsFooter from "meta/core/AppsContainer/AppsFooter";
import ModalForm from "../Modal/ModalForm";
import AppCard from "meta/core/AppCard";
const LayoutApp = ({
  subTitle,
  extra,
  footer,
  params,
  columns,
  inquery,
  setInquery,
  route,
  formList,
  listData,
  setListData,
  selectedData,
  setSelectedData,
  width,
  code,
  title,
  visible,
  setVisible,
  pageMetaData,
}) => {
  //pagination

  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [currentPageSize, setCurrentPageSize] = useState(10);
  //Table
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      async function getArticles() {
        setLoading(true);
        try {
          const response = await jwtAxios.get(`/${route}/list`, { params });
          if (response.data.success == true) {
            setListData(response.data.result);
            setTotal(response.data.pagination.totalCount);
            setCurrentPage(response.data.pagination.currentPage);
            setCurrentPageSize(response.data.pagination.pageSize);
            setLoading(false);
            message.success({
              content: response.data.message,
              className: "custom-class",
              style: {
                marginTop: "8vh",
              },
            });
          } else if (response.data.success === false) {
            message.info(response.data.message);
            setListData(response.data.result);
            setLoading(false);
          }
        } catch (error) {
          console.log("error", error);
          setLoading(false);
        }
      }
      getArticles();
    },
    [inquery]
  );

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    setInquery(inquery + 1);
  };

  return (
    <AppCard pageMetaData={pageMetaData}>
      <HeaderApp
        extra={extra}
        title={title}
        subTitle={subTitle}
        footer={footer}
      />

      <AppTableContainer
        className="order-transaction-table"
        data={listData ? listData : []}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        size="small"
      />

      {listData?.length > 0 && currentPage > 0 ? (
        <AppsFooter className="contact-footer">
          <AppsPagination
            count={total}
            pageSize={currentPageSize}
            page={currentPage}
            showSizeChanger
            onChange={onChange}
          />
        </AppsFooter>
      ) : (
        []
      )}
      <ModalForm
        route={route}
        formList={formList}
        listData={listData}
        setListData={setListData}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        width={width}
        code={code}
        title={title}
        visible={visible}
        setVisible={setVisible}
      />
    </AppCard>
  );
};

export default LayoutApp;
