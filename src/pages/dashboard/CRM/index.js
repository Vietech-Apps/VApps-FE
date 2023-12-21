import React from "react";
import AppRowContainer from "meta/core/AppRowContainer";
import { Col } from "antd";
import QuickStats from "./QuickStats";
import TotalRevenue from "./TotalRevenue";
import MonthlyEarning from "./MonthlyEarning";
import SocialMediaAdvertise from "./SocialMediaAdvertise";
import TodayTasks from "./TodayTasks";
import Deals from "./Deals";
import GoalProgress from "./GoalProgress";
import WebTraffic from "./WebTraffic";
import Reviews from "./Reviews";
import TicketSupport from "./TicketSupport";
import Statistics from "./Statistics";
import { AppInfoView } from "meta";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useGetDataApi } from "meta/utility/APIHooks";

const CRM = () => {
  const [{ apiData: crmData }] = useGetDataApi("/dashboard/crm");

  return (
    <>
      <AppPageMetadata title="CRM Dashboard" />
      {crmData ? (
        <AppRowContainer delay={150}>
          <Col xs={24} lg={10} key={"b"}>
            <TotalRevenue revenueData={crmData.revenueData} />
          </Col>
          <Col xs={24} lg={14} className="mb-0" key={"a"}>
            <QuickStats quickStatsData={crmData.quickStatsData} />
          </Col>
          <Col xs={24} lg={16} key={"c"}>
            <Statistics
              clientsData={crmData.statisticsGraph.clientsData}
              incomeData={crmData.statisticsGraph.incomeData}
              projectData={crmData.statisticsGraph.projectData}
            />
          </Col>
          <Col xs={24} lg={8} key={"d"}>
            <MonthlyEarning earningGraphData={crmData.earningGraphData} />
          </Col>
          <Col xs={24} lg={8} key={"e"}>
            <SocialMediaAdvertise socialMediaData={crmData.socialMediaData} />
          </Col>
          <Col xs={24} lg={16} key={"f"}>
            <TodayTasks todayTaskData={crmData.todayTaskData} />
          </Col>
          <Col xs={24} lg={16} key={"g"}>
            <Deals dealsTableData={crmData.dealsTableData} />
          </Col>
          <Col xs={24} lg={8} key={"h"}>
            <GoalProgress progressGraphData={crmData.progressGraphData} />
          </Col>
          <Col xs={24} lg={10} key={"i"}>
            <WebTraffic websiteTrafficData={crmData.websiteTrafficData} />
            <Reviews reviewGraphData={crmData.reviewGraphData} />
          </Col>
          <Col xs={24} lg={14} key={"j"}>
            <TicketSupport ticketSupportData={crmData.ticketSupportData} />
          </Col>
        </AppRowContainer>
      ) : null}

      <AppInfoView />
    </>
  );
};

export default CRM;
