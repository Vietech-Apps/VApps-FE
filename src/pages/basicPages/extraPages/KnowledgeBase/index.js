import React, { useState } from "react";
import { salesData } from "meta/services/db/extraPages/portFolio/sales";
import { installationData } from "meta/services/db/extraPages/portFolio/installation";
import IntlMessages from "meta/utility/IntlMessages";
import { useIntl } from "react-intl";
import Sales from "./Sales";
import Installation from "./Installation";
import AppAnimate from "meta/core/AppAnimate";
import AppPageMetadata from "meta/core/AppPageMetadata";
import {
  StyledKnowBase,
  StyledKnowBaseHeader,
  StyledKnowDivider,
  StyledKnowSearch,
} from "./index.styled";

const KnowledgeBase = () => {
  const { messages } = useIntl();

  const [filterText, setFilterText] = useState("");

  const saleQueries =
    filterText !== ""
      ? salesData.filter((data) => data.ques.includes(filterText))
      : salesData;

  const installationQueries =
    filterText !== ""
      ? installationData.filter((data) => data.ques.includes(filterText))
      : installationData;

  const onSearch = (value) => console.log(value);

  return (
    <StyledKnowBase>
      <AppPageMetadata title="Knowledge Base" />

      <AppAnimate
        animation="transition.slideUpIn"
        delay={200}
        style={{ height: "auto" }}
      >
        <StyledKnowBaseHeader key="a">
          <h2>
            <IntlMessages id="knowledge.howHelp" />
          </h2>

          <StyledKnowSearch
            placeholder={messages["knowledge.AppSkeleton"]}
            onSearch={onSearch}
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
          />
        </StyledKnowBaseHeader>
      </AppAnimate>
      <StyledKnowDivider />

      <Sales saleQueries={saleQueries} />

      <Installation installationQueries={installationQueries} />
    </StyledKnowBase>
  );
};

export default KnowledgeBase;
