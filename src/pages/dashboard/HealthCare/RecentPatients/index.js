import React from "react";
import AppCard from "meta/core/AppCard";
import { useIntl } from "react-intl";
import AppSelect from "meta/core/AppSelect";
import PatientsTable from "./PatientsTable";
import PropTypes from "prop-types";

const RecentPatients = ({ recentPatients }) => {
  const { messages } = useIntl();
  const handleSelectionType = (data) => {
    console.log("data: ", data);
  };
  return (
    <AppCard
      className="no-card-space-ltr-rtl"
      title={messages["healthCare.recentPatient"]}
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
      <PatientsTable recentPatients={recentPatients} />
    </AppCard>
  );
};

export default RecentPatients;

RecentPatients.propTypes = {
  recentPatients: PropTypes.array,
};
