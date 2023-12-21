import React from "react";
import { Typography } from "antd";
import PropTypes from "prop-types";
import {
  StyledRow,
  StyledStateCard,
  StyledStateContent,
  StyledStateThumb,
} from "./index.styled";

const { Title } = Typography;

const SaleGraph = ({ data }) => {
  const { icon, value, type, bgColor } = data;
  return (
    <StyledStateCard
      className="card-hover"
      style={{ backgroundColor: bgColor }}
    >
      <StyledRow>
        <StyledStateThumb>
          <img src={icon} alt={icon.name} />
        </StyledStateThumb>
        <StyledStateContent>
          <Title className="text-truncate" level={3}>
            {value}
          </Title>
          <p className="text-truncate text-white">{type}</p>
        </StyledStateContent>
      </StyledRow>
    </StyledStateCard>
  );
};

export default SaleGraph;

SaleGraph.propTypes = {
  data: PropTypes.object,
};
