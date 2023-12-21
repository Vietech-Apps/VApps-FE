import React from "react";
import IntlMessages from "meta/utility/IntlMessages";
import AppCircularProgress from "meta/core/AppCircularProgress";
import { useIntl } from "react-intl";
import {
  StyledVisitorActionContent,
  StyledVisitorAnalysisAction,
  StyledVisitorAnalysisCard,
  StyledVisitorProgressView,
} from "./index.styled";

const VisitorAnalysis = () => {
  const { messages } = useIntl();
  return (
    <StyledVisitorAnalysisCard
      title={messages["dashboard.visitorAnalysis"]}
      heightFull
      actions={[
        <StyledVisitorAnalysisAction key={1}>
          <span className="dot" />
          <StyledVisitorActionContent>
            <p>
              <IntlMessages id="dashboard.visitorAnalysisContent" />
            </p>
          </StyledVisitorActionContent>
        </StyledVisitorAnalysisAction>,
      ]}
    >
      <StyledVisitorProgressView>
        <AppCircularProgress
          strokeColor="#F04F47"
          trailColor="rgb(214, 214, 214)"
          percent={59}
          strokeWidth={5}
          width={200}
        />
      </StyledVisitorProgressView>
    </StyledVisitorAnalysisCard>
  );
};

export default VisitorAnalysis;
