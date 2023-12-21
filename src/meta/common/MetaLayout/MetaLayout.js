import { message } from "antd";
import AppTableContainer from "meta/core/AppTableContainer";
import jwtAxios from "meta/services/auth/jwt-api";
import React, { useEffect, useState } from "react";
import AppsPagination from "meta/core/AppsPagination";
import AppsFooter from "meta/core/AppsContainer/AppsFooter";
import AppCard from "meta/core/AppCard";
const HeaderApp = React.lazy(() => import("meta/common/Header/HeaderApp"));
const MetaLayout = ({
  subTitle,
  extra,
  footer,
  params,
  columns,
  inquery,
  setInquery,
  route,
  listData,
  setListData,
  title,
  viewCode,
  user,
  setCount,
  setCurrentPage,
  setCurrentPageSize,
  currentPage,
  currentPageSize,
  pageMetaData,
}) => {
  const [total, setTotal] = useState();
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
            setCount(response.data.count);

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
      {" "}
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
    </AppCard>
  );
};

// export default MetaLayout;
