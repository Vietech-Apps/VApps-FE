import React, { useEffect, useState } from "react";
import AppPageMetadata from "meta/core/AppPageMetadata";
import Table from "./SubLevelTable";
import { RoutePermittedRole } from "shared/constants/AppEnums";
import { useGetData } from "meta/services/auth/ezAPI";
import FormLayout from "meta/JLayouts/Layout";
import { Tabs } from "antd";
import SubLevel from "./SubLevelCode";
import LogDrawer from "pages/root/Logs/LogDrawer";
import LabelPrint from "./LabelPrint";
import { dataInfo } from "./Codes";

const TableMain = () => {
  const mainRoute = "erp/warehouse/setting";


  const [{ apiData: data, loading }, { setData, setRefreshing }] = useGetData(
    `erp/BinLevel/all`,
    []
  );
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    setDataSource(data?.length > 0 ? data : dataSource);
    setCount(data?.length + 1 || dataSource?.length + 1);
    // setRefreshing(true);
  }, [data]);
  const items = [
    {
      key: "1",
      label: `SubLevels`,
      children: (
        <Table
          dataSource={dataSource}
          setDataSource={setDataSource}
          count={count}
          setCount={setCount}
          data={data}
          setRefreshing={setRefreshing}
          loading={loading}
        />
      ),
    },
    {
      key: "2",
      label: `Sublevel Codes`,
      children: <SubLevel data={data} />,
    },

    {
      key: "5",
      label: `Print Labels`,
      children: <LabelPrint data={data} />,
    },
  ];
  return (
    <>
      <AppPageMetadata title={dataInfo.metaData} />
      <FormLayout tabItems={items} codes={dataInfo} footerComponent={false}></FormLayout>
    </>
  );
};

export default TableMain;
