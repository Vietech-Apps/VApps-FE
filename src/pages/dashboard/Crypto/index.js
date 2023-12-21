import React from "react";
import AppRowContainer from "meta/core/AppRowContainer";
import { Col } from "antd";
import TotalBalance from "./TotalBalance";
import Coins from "./Coins";
import Bitcoin from "./Bitcoin";
import BuySell from "./BuySell";
import BtcVolumeCurrency from "./BtcVolumeCurrency";
import PopularCoins from "./PopularCoins";
import LatestNews from "./LatestNews";
import CryptoMarketActivity from "./CryptoMarketActivity";
import { AppInfoView } from "meta";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useGetDataApi } from "meta/utility/APIHooks";

const Crypto = () => {
  const [{ apiData: cryptoData }] = useGetDataApi("/dashboard/crypto");

  return (
    <>
      <AppPageMetadata title="Crypto Dashboard" />
      {cryptoData ? (
        <AppRowContainer>
          <Col xs={24} lg={10} key={"a"}>
            <TotalBalance totalBalanceData={cryptoData.totalBalanceData} />
          </Col>
          <Col xs={24} lg={14} className="mb-0" key={"b"}>
            <Coins coinsData={cryptoData.coinsData} />
          </Col>
          <Col xs={24} lg={16} key={"c"}>
            <Bitcoin coinGraphData={cryptoData.coinGraphData} />
          </Col>
          <Col xs={24} lg={8} key={"d"}>
            <BuySell buySell={cryptoData.buySell} />
          </Col>
          <Col xs={24} lg={8} key={"e"}>
            <BtcVolumeCurrency data={cryptoData.btcChartData} />
          </Col>
          <Col xs={24} lg={16} key={"f"}>
            <PopularCoins popularCoins={cryptoData.popularCoins} />
          </Col>
          <Col xs={24} lg={12} key={"g"}>
            <LatestNews newsData={cryptoData.newsData} />
          </Col>
          <Col xs={24} lg={12} key={"h"}>
            <CryptoMarketActivity
              marketGraphData={cryptoData.marketGraphData}
            />
          </Col>
        </AppRowContainer>
      ) : null}

      <AppInfoView />
    </>
  );
};

export default Crypto;
