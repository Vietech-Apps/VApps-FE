import React, { useEffect, useState } from "react";
import SocialMediaGraph from "./SocialMediaGraph";
import AppCard from "meta/core/AppCard";
import { useIntl } from "react-intl";
import {
  StyledSocialMediaAdvertise,
  StyledSocialMediaAdvertiseItem,
  StyledSocialMediaAdvName,
} from "./index.styled";
import { calculateCosts, GrandTotal } from "meta/Reusable/CalcData";

const SocialMediaAdvertise = ({ enqData, panels }) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData([
      {
        id: 43434,
        name: "Producs",
        revenue: calculateCosts(panels)?.productsCost,
        change: 25,
        color: "#3498DB",
      },
      {
        id: 343232,
        name: "Sheet",
        revenue: calculateCosts(panels)?.sheetCost,
        change: 10,
        color: "#BDC3C7",
      },
      {
        id: 133443,
        name: "Copper",
        revenue: calculateCosts(panels)?.copperTotal,
        change: 30,
        color: "#EB984E ",
        uv: 4000,
        pv: 2400,
      },
      {
        id: 4343,
        name: "Wiring",
        revenue: calculateCosts(panels)?.wiringTotal,
        color: "#76448A",
      },
      {
        id: 4455224,
        name: "OH",
        revenue: GrandTotal(enqData, panels, "oh"),
        change: -40,
        color: "#34495E",
      },
      {
        id: 445523,
        name: "Margin",
        revenue: GrandTotal(enqData, panels, "margin"),
        change: -40,
        color: "#27AE60",
      },
    ]);
  }, [enqData, panels]);

  return (
    <AppCard heightFull title={"Costing Summary"}>
      <SocialMediaGraph socialMediaData={data} />
      <StyledSocialMediaAdvertise>
        {data?.map((item) => {
          return (
            <StyledSocialMediaAdvertiseItem key={item.id}>
              <h4 style={{ color: item.color }}>{item.revenue}</h4>
              <StyledSocialMediaAdvName>{item.name}</StyledSocialMediaAdvName>
            </StyledSocialMediaAdvertiseItem>
          );
        })}
      </StyledSocialMediaAdvertise>
    </AppCard>
  );
};

export default SocialMediaAdvertise;
