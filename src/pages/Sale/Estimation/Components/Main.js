import { Col, Form, InputNumber, Row, Select, Space } from "antd";
import { GrandTotal } from "meta/Reusable/CalcData";
import React, { useEffect, useState } from "react";
import { EstFooterForm } from "../index.styled";
import Panels from "./Panels";
import { useGetData } from "meta/services/auth/ezAPI";
import TaxModal from "meta/Reusable/TaxModal";
import TaxAndRoundOff from "meta/Reusable/TaxAndRoundOff";

const Main = ({ form, panels, estimation, setEstimation, setPanels }) => {
  // useEffect(() => {
  //   let grand = Number(GrandTotal(estimation, panels)) || 0;

  //   form.setFieldsValue({
  //     totalOverHead: GrandTotal(estimation, panels, "oh"),
  //     totalMargin: GrandTotal(estimation, panels, "margin"),
  //     netSubTotal: GrandTotal(estimation, panels),
  //     grandTotal: Number(grand?.toFixed(0)),
  //   });
  // }, [estimation, panels]);

  return (
    <>
      <Panels
        form={form}
        panels={panels}
        setPanels={setPanels}
        estimation={estimation}
        setEstimation={setEstimation}
      />

      <TaxAndRoundOff
        estimation={true}
        subTotal={Number(GrandTotal(estimation, panels))}
        margin={GrandTotal(estimation, panels, "margin")}
        oh={GrandTotal(estimation, panels, "oh")}
        form={form}
      />
    </>
  );
};

export default Main;
