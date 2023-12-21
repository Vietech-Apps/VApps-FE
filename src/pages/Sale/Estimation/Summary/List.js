import { Button, Card, Col, Dropdown, Row, Space } from "antd";
import {
  cyan,
  green,
  volcano,
  orange,
  lime,
  gold,
  yellow,
  red,
  blue,
  purple,
  magenta,
  geekblue,
} from "@ant-design/colors";

import React, { useEffect, useState } from "react";
import ProductsGraph from "./ProductsGraph";

import { PageHeader } from "@ant-design/pro-layout";
import DataGraph from "./GraphData";
import { useNavigate, useParams } from "react-router-dom";
import Invoice from "./Details/techincal";
import { useGetData } from "meta/services/auth/ezAPI";
import {
  getUniqueBrands,
  getUniquePanels,
  getUniquness,
  mergeProducts,
  productTotal,
  productUnit,
} from "meta/Reusable/CalcData";
import getColumnSearchProps from "meta/Reusable/getColumnSearchProps";
import { FilterOutlined } from "@ant-design/icons";
import { StyledTable } from "../index.styled";
import ExportExcel from "./ExcelDownload";

const List = () => {
  const { id } = useParams();
  let color = [
    cyan,
    green,
    volcano,
    orange,
    lime,
    gold,
    yellow,
    red,
    blue,
    purple,
    magenta,
    geekblue,
  ];

  const [{ apiData }] = useGetData(`erp/summary/make-costs/${id}`, []);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [estimation, setEstimation] = useState();
  const [query, setQuery] = useState(1);
  const [panels, setPanels] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setProducts(mergeProducts(apiData?.products));
    setEstimation(apiData?.estimation);
    setFilterProducts(mergeProducts(apiData?.products));
    setPanels(apiData?.panels);
  }, [apiData, query]);

  const valueEnum = getUniqueBrands(
    products?.filter((p) => p.type == 1) || []
  )?.reduce((acc, curr) => {
    acc[curr.title] = { text: curr.title };
    return acc;
  }, {});

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      width: "8%",
      key: "code",
    },
    {
      title: "Name",
      width: "15%",
      dataIndex: "name",
      ellipsis: true,
      key: "name",
      type: "0",
      editable: true,
      ...getColumnSearchProps("name", true),
    },
    {
      title: "Model",
      dataIndex: "model",
      // editable: true,
      width: "5%",
      key: "model",
      ellipsis: true,
      type: "0",
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
      width: "5%",
      ellipsis: true,
      filters: true,
      onFilter: true,
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      valueEnum: valueEnum,
      type: "0",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      editable: true,
      type: "1",
      width: "5%",
      key: "qty",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      editable: true,
      type: "2",
      width: "6%",
      key: "currency",
      filters: true,
      onFilter: true,
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      valueEnum: {
        USD: { text: "USD" },
        Rs: { text: "Rs" },
        EURO: { text: "EURO" },
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price, p) => (p.type == 2 ? "" : price ? price?.toFixed(0) : 0),
      editable: true,
      key: "price",
      type: "1",
      width: "8%",
    },
    {
      title: "Disc",
      dataIndex: "discount",
      key: "discount",
      width: "5%",
      render: (discount, p) => (p.type == 2 ? "" : discount || 0),
      editable: true,
      type: "1",
    },
    {
      title: "Unit",
      type: "1",
      key: "unitPrice",
      width: "5%",
      dataIndex: "unitPrice",
      render: (w, p) => p.type == 1 && productUnit(p, estimation)?.toFixed(1),
    },
    {
      title: "Sub",
      width: "5%",
      key: "subtotal",
      render: (w, p) => p.type == 1 && productTotal(p, estimation)?.toFixed(1),
    },
    {
      title: "Panel",
      width: "5%",
      key: "subtotal",
      dataIndex: "panel",
      ellipsis: true,
      render: (w, d) => panels?.filter((p) => p._id == d.panelId)[0]?.name,
      filterIcon: (filtered) => (
        <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      type: "0",
    },
  ];
  const [rerender, setRerender] = useState(1);
  const handleAll = () => {
    setProducts(products);
    setQuery(query + 1);
    setRerender(rerender + 1);
  };
  const handleProducts = () => {
    setRerender(rerender + 1);
    setFilterProducts(mergeProducts(products?.filter((p) => p.type == 1)));
  };

  let items = getUniquness(panels, "name")?.map((d) => ({
    label: d.title,
    key: d._id,
    onClick: () => {
      setRerender(rerender + 1);
      setFilterProducts(products?.filter((p) => p.panelId == d._id));
    },
  }));

  return (
    <>
      <PageHeader
        ghost={false}
        title="Analytic"
        subTitle={apiData?.estimation?.cuId}
        onBack={() => navigate(-1)}
      >
        <Row gutter={24}>
          {products?.length > 0 && (
            <Col md={9} sm={24}>
              
              <ProductsGraph data={apiData?.makeCost} color={color} />
            </Col>
          )}
          <Col md={15} sm={24}>
            <DataGraph enqData={apiData?.estimation} panels={apiData?.panels} />
          </Col>
        </Row>
      </PageHeader>

      {products?.length > 0 && (
        <StyledTable
          toolBarRender={() => (
            <Space wrap>
              <Button type="primary" onClick={() => handleAll()}>
                All
              </Button>
              <Button type="primary" onClick={() => handleProducts()}>
                Products
              </Button>
              <Dropdown menu={{ items }} placement="bottomRight">
                <Button onClick={(e) => e.preventDefault()} type="primary">
                  Panels
                </Button>
              </Dropdown>
              {filterProducts?.length > 0 && (
                <ExportExcel
                  products={filterProducts ? filterProducts : products}
                  estimation={estimation}
                  rerender={rerender}
                />
              )}
            </Space>
          )}
          pagination={false}
          search={false}
          refresh={false}
          bordered={false}
          dataSource={filterProducts ? filterProducts : products}
          columns={columns}
          rowKey={(key) => key._id}
          options={{
            setting: {
              listsHeight: 100,
            },
            search: false,
            reset: false,
            refresh: false,
            fullScreen: true,
          }}
          rowClassName={(record) =>
            record.type == 2 ? "data-row-active-row-section" : ""
          }
        />
      )}
    </>
  );
};

export default List;
