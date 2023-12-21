import React from "react";
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
import AppRowContainer from "meta/core/AppRowContainer";
import { Col, Tabs } from "antd";
// import TodayTasks from "./Todos";
import DataGraph from "./GraphData";
import { AppInfoView } from "meta";
import AppPageMetadata from "meta/core/AppPageMetadata";
import SaleStatics from "pages/dashboard/ECommerce/SaleStatics";
import Application from "pages/dashboard/ECommerce/Application";
import ReportCard from "pages/dashboard/ECommerce/ReportCard";
import RecentOrders from "pages/dashboard/ECommerce/RecentOrders";
import Revenue from "pages/dashboard/ECommerce/Revenue";
import WelcomeCard from "./WelcomeCard";
import SalesState from "pages/dashboard/Analytics/SalesState";
import SaleGraph from "./General/SaleGraph";
import TinyBarChart from "../recharts/Bar/Components/TinyBarChart";
import AppCard from "meta/core/AppCard";
import SimpleRadialBarChart from "../recharts/Radial/Components/SimpleRadialBarChart";
import TwoLevelPieChart from "../recharts/Pie/Components/TwoLevelPieChart";
import ProductsGraph from "./ProductsGraph";
import { StyledDashboardTabs } from "./index.styled";
import {
  ContainerOutlined,
  DashboardOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthUser } from "meta/utility/AuthHooks";
import { useGetData } from "meta/services/auth/ezAPI";

const CRM = () => {
  const { user } = useAuthUser();
  const [{ apiData: taskCount }] = useGetData(
    `/scrum/todo/countList/${user?._id}`,
    []
  );
  const generalData = {
    welcomeCard: [
      {
        id: 1,
        type: "Completed tasks",
        counts: 42,
        icon: "BiTask",
      },
      {
        id: 2,
        type: "Incomplete tasks",
        counts: 144,
        icon: "MdPendingActions",
      },
      {
        id: 3,
        type: "Overdue tasks",
        counts: 12,
        icon: "FcOvertime",
      },
      {
        id: 4,
        type: "Total tasks",
        counts: 12,
        icon: "CgFileDocument",
      },
    ],
    salesState: [
      {
        id: 1,
        type: "Total Sale",
        value: "3,256",
        bgColor: "#0A8FDC",
        icon: "/assets/images/dashboard/1_sales_icon.svg",
      },
      {
        id: 2,
        type: "Last Month Sale",
        value: "6,257",
        bgColor: "#49BD65",
        icon: "/assets/images/dashboard/1_monthly_sales.svg",
      },
      {
        id: 3,
        type: "Total Revenue",
        value: "$34,650",
        bgColor: "#9E49E6",
        icon: "/assets/images/dashboard/1_revenue_icon.svg",
      },
      {
        id: 4,
        type: "Total Email Sent",
        value: "11,320",
        bgColor: "#3A3849",
        icon: "/assets/images/dashboard/1_email_sent.svg",
      },
    ],
    reportCards: [
      {
        id: 1,
        type: "This Year Sale Report",
        value: "$685K+ ",
        growth: 2.5,
        icon: "/assets/images/dashboard/icon_revenue.png",
        strokeColor: "#0A8FDC",
        graphData: [
          { month: "Aug", number: 310 },
          { month: "Sep", number: 130 },
          { month: "Oct", number: 350 },
          { month: "Nov", number: 170 },
          { month: "Dec", number: 400 },
          { month: "Nov", number: 170 },
          { month: "Dec", number: 400 },
          { month: "Nov", number: 170 },
          { month: "Dec", number: 400 },
        ],
      },
      {
        id: 2,
        type: "Yearly Profit",
        value: "$125K+",
        growth: -3.7,
        icon: "/assets/images/dashboard/icon_visits.png",
        strokeColor: "#F44D50",
        graphData: [
          { month: "Jan", number: 20 },
          { month: "Feb", number: 170 },
          { month: "Mar", number: 40 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
        ],
      },
      {
        id: 2,
        type: "Yearly Traffic",
        value: "335K+",
        growth: 3.7,
        icon: "/assets/images/dashboard/icon_visits.png",
        strokeColor: "#F49820",
        graphData: [
          { month: "Jan", number: 20 },
          { month: "Feb", number: 170 },
          { month: "Mar", number: 40 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
        ],
      },
    ],
    recentOrders: [
      {
        id: "#SK231",
        customer: "Ina Hughes",
        product: "Bicycle",
        date: "08-21-2020",
        paymentType: "COD",
        price: "$125",
        status: "Cancelled",
      },
      {
        id: "#SK232",
        customer: "Myrtie Ferguson",
        date: "08-12-2020",
        product: "Addida Shoes",
        paymentType: "Prepaid",
        price: "$100",
        status: "Delivered",
      },
      {
        id: "#SK233",
        customer: "Johnny Herrera",
        date: "07-30-2020",
        product: "Sleeve Jacket",
        price: "$1,020",
        paymentType: "Prepaid",
        status: "Pending",
      },
      {
        id: "#SK234",
        customer: "Myrtie Ferguson",
        date: "08-12-2020",
        product: "Addida Shoes",
        paymentType: "Prepaid",
        price: "$100",
        status: "Delivered",
      },
    ],
    popularProducts: [
      {
        id: 1,
        icon: "/assets/images/dashboard/product_image_1.png",
        name: "Baby Shoes",
        description: "Reference site about.",
        price: 690,
        mrp: 800,
      },
      {
        id: 2,
        icon: "/assets/images/dashboard/product_image_2.png",
        name: "Baby Shoes",
        description: "information on its origins.",
        price: 430,
        mrp: 640,
      },
      {
        id: 3,
        icon: "/assets/images/dashboard/product_image_3.png",
        name: "Headphones",
        description: "information Lipsum generator.",
        price: 230,
        mrp: 550,
      },
      {
        id: 4,
        icon: "/assets/images/dashboard/product_image_1.png",
        name: "Headphones",
        description: "Reference site about.",
        price: 679,
        mrp: 800,
      },
      {
        id: 5,
        icon: "/assets/images/dashboard/product_image_2.png",
        name: "Smart Watch",
        description: "information on its origins.",
        price: 440,
        mrp: 640,
      },
      {
        id: 6,
        icon: "/assets/images/dashboard/product_image_3.png",
        name: "Smart Watch",
        description: "information Lipsum generator.",
        price: 233,
        mrp: 550,
      },
    ],
  };
  const saleData = {
    saleChartData: [
      {
        name: "Mon",
        AS: 8000,
        Rev: 2000,
        amt: 2400,
      },
      {
        name: "Tue",
        AS: 6500,
        Rev: 1398,
        amt: 2600,
      },
      {
        name: "Web",
        AS: 9800,
        Rev: 2000,
        amt: 2290,
      },
      {
        name: "Thu",
        AS: 3908,
        Rev: 1500,
        amt: 2000,
      },
      {
        name: "Fri",
        AS: 7000,
        Rev: 3000,
        amt: 2181,
      },
      {
        name: "Sat",
        AS: 2390,
        Rev: 3800,
        amt: 2500,
      },
      {
        name: "Sun",
        AS: 8000,
        Rev: 3600,
        amt: 2100,
      },
    ],
    reportCards: [
      {
        id: 1,
        type: "This Year Sale Report",
        value: "$685K+ ",
        growth: 2.5,
        icon: "/assets/images/dashboard/icon_revenue.png",
        strokeColor: "#0A8FDC",
        graphData: [
          { month: "Aug", number: 310 },
          { month: "Sep", number: 130 },
          { month: "Oct", number: 350 },
          { month: "Nov", number: 170 },
          { month: "Dec", number: 400 },
          { month: "Nov", number: 170 },
          { month: "Dec", number: 400 },
          { month: "Nov", number: 170 },
          { month: "Dec", number: 400 },
        ],
      },
      {
        id: 2,
        type: "Yearly Profit",
        value: "$125K+",
        growth: -3.7,
        icon: "/assets/images/dashboard/icon_visits.png",
        strokeColor: "#F44D50",
        graphData: [
          { month: "Jan", number: 20 },
          { month: "Feb", number: 170 },
          { month: "Mar", number: 40 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
        ],
      },
      {
        id: 2,
        type: "Yearly Traffic",
        value: "335K+",
        growth: 3.7,
        icon: "/assets/images/dashboard/icon_visits.png",
        strokeColor: "#F49820",
        graphData: [
          { month: "Jan", number: 20 },
          { month: "Feb", number: 170 },
          { month: "Mar", number: 40 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
          { month: "Apr", number: 200 },
          { month: "May", number: 70 },
        ],
      },
    ],
    recentOrders: [
      {
        id: "#SK231",
        customer: "Ina Hughes",
        product: "Bicycle",
        date: "08-21-2020",
        paymentType: "COD",
        price: "$125",
        status: "Cancelled",
      },
      {
        id: "#SK232",
        customer: "Myrtie Ferguson",
        date: "08-12-2020",
        product: "Addida Shoes",
        paymentType: "Prepaid",
        price: "$100",
        status: "Delivered",
      },
      {
        id: "#SK233",
        customer: "Johnny Herrera",
        date: "07-30-2020",
        product: "Sleeve Jacket",
        price: "$1,020",
        paymentType: "Prepaid",
        status: "Pending",
      },
      {
        id: "#SK234",
        customer: "Myrtie Ferguson",
        date: "08-12-2020",
        product: "Addida Shoes",
        paymentType: "Prepaid",
        price: "$100",
        status: "Delivered",
      },
    ],
    popularProducts: [
      {
        id: 1,
        icon: "/assets/images/dashboard/product_image_1.png",
        name: "Baby Shoes",
        description: "Reference site about.",
        price: 690,
        mrp: 800,
      },
      {
        id: 2,
        icon: "/assets/images/dashboard/product_image_2.png",
        name: "Baby Shoes",
        description: "information on its origins.",
        price: 430,
        mrp: 640,
      },
      {
        id: 3,
        icon: "/assets/images/dashboard/product_image_3.png",
        name: "Headphones",
        description: "information Lipsum generator.",
        price: 230,
        mrp: 550,
      },
      {
        id: 4,
        icon: "/assets/images/dashboard/product_image_1.png",
        name: "Headphones",
        description: "Reference site about.",
        price: 679,
        mrp: 800,
      },
      {
        id: 5,
        icon: "/assets/images/dashboard/product_image_2.png",
        name: "Smart Watch",
        description: "information on its origins.",
        price: 440,
        mrp: 640,
      },
      {
        id: 6,
        icon: "/assets/images/dashboard/product_image_3.png",
        name: "Smart Watch",
        description: "information Lipsum generator.",
        price: 233,
        mrp: 550,
      },
    ],
  };
  const adminData = {
    salesState: [
      {
        id: 1,
        type: "Total Sale",
        value: "3,256",
        bgColor: "#0A8FDC",
        icon: "/assets/images/dashboard/1_sales_icon.svg",
      },
      {
        id: 2,
        type: "Last Month Sale",
        value: "6,257",
        bgColor: "#49BD65",
        icon: "/assets/images/dashboard/1_monthly_sales.svg",
      },
      {
        id: 3,
        type: "Total Revenue",
        value: "$34,650",
        bgColor: "#9E49E6",
        icon: "/assets/images/dashboard/1_revenue_icon.svg",
      },
      {
        id: 4,
        type: "Total Email Sent",
        value: "11,320",
        bgColor: "#3A3849",
        icon: "/assets/images/dashboard/1_email_sent.svg",
      },
    ],
  };
  const invoiceData = {
    radialChartData: [
      { name: "18-24", uv: 31.47, pv: 2400, fill: "#4299E1" },
      { name: "25-29", uv: 26.69, pv: 4567, fill: "#83a6ed" },
      { name: "30-34", uv: 15.69, pv: 1398, fill: "#8dd1e1" },
      { name: "35-39", uv: 8.22, pv: 9800, fill: "#F04F47" },
      { name: "40-49", uv: 8.63, pv: 3908, fill: "#a4de6c" },
      { name: "50+", uv: 2.63, pv: 4800, fill: "#d0ed57" },
      { name: "unknow", uv: 6.67, pv: 4800, fill: "#F04F47" },
    ],
    barChartData: [
      { name: "Page A", pv: 2400, amt: 2400 },
      { name: "Page B", pv: 1398, amt: 2210 },
      { name: "Page C", pv: 9800, amt: 2290 },
      { name: "Page D", pv: 3908, amt: 2000 },
      { name: "Page E", pv: 4800, amt: 2181 },
      { name: "Page F", pv: 3800, amt: 2500 },
      { name: "Page G", pv: 4300, amt: 2100 },
    ],
  };
  let color = [
    cyan,
    green,
    magenta,
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
  const items = [
    {
      key: "1",
      label: (
        <span>
          <DashboardOutlined />
          My Dashboard
        </span>
      ),
      children: (
        <>
          {taskCount ? (
            <AppRowContainer delay={150}>
              <Col xs={24}>
                <WelcomeCard taskCount={taskCount} color={color} />
              </Col>
              <Col xs={24} lg={16}>
                <DataGraph
                  data={taskCount?.filter((item) => item.type !== "Total")}
                  color={color}
                />
              </Col>
              <Col xs={24} lg={8}>
                <ProductsGraph
                  data={taskCount?.filter((item) => item.type !== "Total")}
                  color={color}
                />
              </Col>
              <Col xs={24}>
                <RecentOrders recentOrders={[]} />
              </Col>
            </AppRowContainer>
          ) : null}
        </>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <UserOutlined />
          Admin
        </span>
      ),
      children: (
        <>
          {" "}
          <AppRowContainer delay={150}>
            {adminData.salesState.map((data) => (
              <Col xs={24} sm={12} lg={6} key={"a" + data.id}>
                <SaleGraph data={data} />
              </Col>
            ))}
            <Col xs={24} lg={8}>
              <AppCard title={"Bar Chart"}>
                <TwoLevelPieChart data={invoiceData.radialChartData} />
              </AppCard>
            </Col>
            <Col xs={24} lg={8}>
              <AppCard title={"Bar Chart"}>
                <TinyBarChart data={invoiceData.barChartData} />
              </AppCard>
            </Col>
            <Col xs={24} lg={8}>
              <AppCard title={"Bar Chart"}>
                <TinyBarChart data={invoiceData.barChartData} />
              </AppCard>
            </Col>
            {generalData.reportCards.map((reportVal) => (
              <Col xs={24} lg={8} key={"d" + reportVal.id + Math.random()}>
                <ReportCard data={reportVal} />
              </Col>
            ))}
          </AppRowContainer>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <ShoppingCartOutlined />
          Sale
        </span>
      ),
      children: (
        <>
          {saleData ? (
            <AppRowContainer delay={150}>
              <Col xs={24} lg={18} key={"b"}>
                <SaleStatics />
              </Col>
              <Col xs={24} lg={6} key={"c"}>
                <Application />
              </Col>
              <Col xs={24} lg={8} key={"f"}>
                <Revenue />
              </Col>
              <Col xs={24} lg={16}>
                <SalesState
                  salesState={saleData.salesState}
                  saleChartData={saleData.saleChartData}
                />
              </Col>
            </AppRowContainer>
          ) : null}
        </>
      ),
    },
    {
      key: "4",
      label: (
        <span>
          <ContainerOutlined />
          Invoice
        </span>
      ),
      children: (
        <>
          <AppRowContainer delay={150}>
            <Col xs={24} lg={18}>
              <AppCard title={"Bar Chart"}>
                <TinyBarChart data={invoiceData.barChartData} />
              </AppCard>
            </Col>
            <Col xs={24} lg={6}>
              <AppCard title={"Bar Chart"}>
                <SimpleRadialBarChart data={invoiceData.radialChartData} />
              </AppCard>
            </Col>
          </AppRowContainer>
        </>
      ),
    },
  ];

  return (
    <>
      <AppPageMetadata title="Dashboard" />
      <StyledDashboardTabs defaultActiveKey="1" items={items} />
      <AppInfoView />
    </>
  );
};

export default CRM;
