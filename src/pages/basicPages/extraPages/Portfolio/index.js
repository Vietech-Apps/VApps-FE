import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import photos from "meta/services/db/gallery/photos";
import IntlMessages from "meta/utility/IntlMessages";
import AppAnimate from "meta/core/AppAnimate";
import AppPageMetadata from "meta/core/AppPageMetadata";
import {
  StyledPortfolio,
  StyledPortfolioHeader,
  StyledPortfolioTabs,
} from "./index.styled";

const shuffle = (arra1) => {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
};
const tabs = [
  {
    key: 1,
    label: <IntlMessages id="common.all" />,
    children: (
      <Gallery margin={10} photos={shuffle(photos)} direction="column" />
    ),
  },
  {
    key: 2,
    label: <IntlMessages id="portfolio.logo" />,
    children: (
      <Gallery margin={10} photos={shuffle(photos)} direction="column" />
    ),
  },
  {
    key: 3,
    label: <IntlMessages id="portfolio.painting" />,
    children: (
      <Gallery margin={10} photos={shuffle(photos)} direction="column" />
    ),
  },
  {
    key: 4,
    label: <IntlMessages id="portfolio.graphicDesign" />,
    children: (
      <Gallery margin={10} photos={shuffle(photos)} direction="column" />
    ),
  },
  {
    key: 5,
    label: <IntlMessages id="portfolio.webDesign" />,
    children: (
      <Gallery margin={10} photos={shuffle(photos)} direction="column" />
    ),
  },
  {
    key: 6,
    label: <IntlMessages id="portfolio.ui" />,
    children: (
      <Gallery margin={10} photos={shuffle(photos)} direction="column" />
    ),
  },
];

const Portfolio = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppPageMetadata title="Portfolio" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledPortfolio key="a">
          <StyledPortfolioHeader>
            <h2>
              <IntlMessages id="portfolio.heading" />
            </h2>
            <p>
              <IntlMessages id="portfolio.content" />
            </p>
          </StyledPortfolioHeader>

          <AppAnimate animation="transition.slideUpIn" delay={200}>
            <div key="b">
              <StyledPortfolioTabs
                defaultActiveKey={value}
                onChange={handleChange}
                items={tabs}
              />
            </div>
          </AppAnimate>
        </StyledPortfolio>
      </AppAnimate>
    </>
  );
};

export default Portfolio;
