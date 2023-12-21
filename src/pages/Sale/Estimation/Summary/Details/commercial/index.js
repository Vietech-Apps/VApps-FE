import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import AppCard from "meta/core/AppCard";
// import '../Invoice/index.style.less';
// import './index.style.less';
import AppAnimateGroup from "meta/core/AppAnimateGroup";
import AppPageMetadata from "meta/core/AppPageMetadata";
import Part2 from './Part2';
import Part1 from "./Part1";
import Part3 from "./Part3";
import { Divider } from "antd";

const Invoice2 = ({ panels, enqData }) => {
  return (
    <AppAnimateGroup type="bottom">
      <AppPageMetadata title="Invoice" />
      <div className="invoice" key="invoice2">
        <div className="invoice-container">
          <AppCard className="invoice-card no-card-space invoice-set">
            <Header />
            <Part1 />
            <Footer />
            <Divider style={{ margin: 12, padding: 12 }} />
            <Header />
            <Part2 enqData={enqData} panels={panels} />
            <Footer />
            <Divider />
            <Header />
            <Part3 />
            <Footer />
          </AppCard>
        </div>
      </div>
    </AppAnimateGroup>
  );
};

export default Invoice2;
