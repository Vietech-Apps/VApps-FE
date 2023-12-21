import React from "react";
import AppCard from "meta/core/AppCard";

import AppSelect from "meta/core/AppSelect";
import OrderTable from "./OrderTable";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

const RecentOrders = ({ recentOrders }) => {
  const { messages } = useIntl();
  const handleSelectionType = (data) => {
    console.log("data: ", data);
  };
  return (
    <AppCard
      className="no-card-space-ltr-rtl"
      title={"List"}
      extra={
        <AppSelect
          menus={[
            messages["dashboard.thisWeek"],
            messages["dashboard.lastWeeks"],
            messages["dashboard.lastMonth"],
          ]}
          defaultValue={messages["dashboard.thisWeek"]}
          onChange={handleSelectionType}
        />
      }
    >
      <OrderTable orderData={recentOrders} />
    </AppCard>
  );
};

export default RecentOrders;

RecentOrders.propTypes = {
  recentOrders: PropTypes.array,
};
