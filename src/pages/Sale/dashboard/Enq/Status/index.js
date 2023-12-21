import React from "react";
import SocialVisitorsGraph from "./SocialVisitorsGraph";
import PropTypes from "prop-types";
import Categories from "./Categories";
import { useIntl } from "react-intl";
import { StyledSocialVisitorCard } from "./index.styled";
import AppSelect from "meta/core/AppSelect";
import { useGetData } from "meta/services/auth/ezAPI";

const SocialVisitors = () => {
  const [{ apiData: enqData }, { setQueryParams }] = useGetData(
    `erp/Enquiry/count`,
    undefined,
    {
      date: "This Month",
    }
  );
  var data = [];
  console.log("response.data", enqData);
  enqData?.increase?.map((p, i) => {
    console.log(p._id);
    var Increase = {};
    Increase.id = i;
    Increase.name = p._id ? p._id : "Closed";
    Increase.visitors = p.count;
    Increase.change = p.percentage;
    Increase.color = p._id == "open" ? "#52BE80" : "#CB4335";
    data.push(Increase);
  });
  const handleSelectionType = (data) => {
    setQueryParams({ date: data });
    console.log("data: ", data);
  };
  return (
    <StyledSocialVisitorCard
      heightFull
      title={`Enquaries Status Total: ${enqData?.total?.current} (${enqData?.total?.percentageIncrease}%)`}
      extra={
        <AppSelect
          menus={["This Week", "This Month", "This Year"]}
          defaultValue={"This Month"}
          onChange={handleSelectionType}
        />
      }
    >
      <SocialVisitorsGraph data={data} />

      <Categories data={data} />
    </StyledSocialVisitorCard>
  );
};

export default SocialVisitors;

SocialVisitors.defaultProps = {
  data: [],
};

SocialVisitors.propTypes = {
  data: PropTypes.array,
};
