import React, { useEffect, useState } from "react";
import SocialMediaGraph from "./SocialMediaGraph";
import AppCard from "meta/core/AppCard";
import { useIntl } from "react-intl";
import {
  StyledSocialMediaAdvertise,
  StyledSocialMediaAdvertiseItem,
  StyledSocialMediaAdvName,
} from "./index.styled";

const SocialMediaAdvertise = ({ data, color }) => {
  return (
    <AppCard heightFull title={"Summary"}>
      <SocialMediaGraph data={data} color={color} />
      <StyledSocialMediaAdvertise>
        {data?.map((item, i) => {
          return (
            <StyledSocialMediaAdvertiseItem key={item.id}>
              <h4 style={{ color: color[i][5] }}>{item.counts}</h4>
              <StyledSocialMediaAdvName>{item.type}</StyledSocialMediaAdvName>
            </StyledSocialMediaAdvertiseItem>
          );
        })}
      </StyledSocialMediaAdvertise>
    </AppCard>
  );
};

export default SocialMediaAdvertise;
