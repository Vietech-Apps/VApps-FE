import React from "react";
import { Collapse, Tag } from "antd";
import SheetCalc from "./Calculations/Cubiclas";
import CopperCalc from "./Calculations/Copper";
import Accessories from "./Accessories";
import ProductsTable from "./ProductsTable";
import WiringCalc from "./Calculations/Wirings";
import CableTray from "./Calculations/CableTray";
import {
  StyledCollapse0,
  StyledCollapse1,
  StyledCollapse2,
  StyledCollapse3,
  StyledCollapse4,
  StyledCollapse5,
} from "../index.styled";
import { Rs } from "meta/Reusable/CalcData";

const CuFeProd = ({
  estimation,
  panels,
  setPanels,
  isCopy,
  setIsCopy,
  copied,
  setCopied,
  form,
  setCut,
  panelDetail,
}) => {
  return (
    <>
      <Collapse defaultActiveKey={["0"]}>
        {panelDetail?.type !== "Cable Tray" && (
          <StyledCollapse4
            header={<b>Components</b>}
            key="0"
            extra={
              <Tag color="default">
                <b>{Rs(panelDetail?.pCost)}</b>{" "}
              </Tag>
            }
          >
            <ProductsTable
              panelDetail={panelDetail}
              estimation={estimation}
              setCopied={setCopied}
              copied={copied}
              setIsCopy={setIsCopy}
              isCopy={isCopy}
              setCut={setCut}
              panels={panels}
              setPanels={setPanels}
            />
          </StyledCollapse4>
        )}
        <StyledCollapse3
          header={<b>Accessories </b>}
          extra={
            <Tag color="default">
              <b>
                {Rs(
                  panelDetail?.aCost ||
                    0 *
                      ((panelDetail?.mainEnclosure?.length || 0) +
                        (panelDetail?.pfiEnclosure?.length || 0) || 1)
                )}
              </b>
            </Tag>
          }
          key="3"
        >
          <Accessories
            panelDetail={panelDetail}
            estimation={estimation}
            setCopied={setCopied}
            copied={copied}
            setIsCopy={setIsCopy}
            isCopy={isCopy}
            setCut={setCut}
            panels={panels}
            setPanels={setPanels}
          />
        </StyledCollapse3>

        {panelDetail?.type !== "Cable Tray" && (
          <StyledCollapse1
            style={{ background: "#E5E7E9" }}
            header={<b>Cubicals</b>}
            extra={
              <b>
                <Tag color="default">{panelDetail?.sheetType} </Tag>
                <Tag color="default">{panelDetail?.sheetWeight || 0.0} Kg</Tag>
                <Tag color="default">{Rs(panelDetail?.sheetCost)}</Tag>
              </b>
            }
            key="1"
          >
            <SheetCalc
              estimation={estimation}
              panelDetail={panelDetail}
              panels={panels}
              setPanels={setPanels}
            />
          </StyledCollapse1>
        )}
        {panelDetail?.type !== "Cable Tray" && (
          <StyledCollapse0
            header={<b>Copper </b>}
            extra={
              <b>
                <Tag color="default">{panelDetail?.copperType} </Tag>
                <Tag color="default">{panelDetail?.copperWeight || 0.0} Kg</Tag>
                <Tag color="default">{Rs(panelDetail?.copperCost)}</Tag>
              </b>
            }
            key="2"
          >
            <CopperCalc
              form={form}
              estimation={estimation}
              panelDetail={panelDetail}
              panels={panels}
              setPanels={setPanels}
            />
          </StyledCollapse0>
        )}
        {panelDetail?.type == "Cable Tray" && (
          <StyledCollapse5
            header={<b>Cable Tray</b>}
            extra={
              <b>
                <Tag color="default">{panelDetail?.sheetType} </Tag>
                <Tag color="default">{12} Kg</Tag>
                <Tag color="default">{Rs(12)}</Tag>
              </b>
            }
            key="6"
          >
            <CableTray
              enqData={estimation}
              estimation={estimation}
              panelDetail={panelDetail}
              panels={panels}
              setPanels={setPanels}
            />
          </StyledCollapse5>
        )}
        {panelDetail?.type !== "Cable Tray" && (
          <StyledCollapse2
            header={<b>Wirings </b>}
            extra={
              <Tag color="default">
                <b>{Rs(panelDetail?.wCost)}</b>
              </Tag>
            }
            key="4"
          >
            <WiringCalc
              form={form}
              panelDetail={panelDetail}
              estimation={estimation}
              panels={panels}
              setPanels={setPanels}
            />
          </StyledCollapse2>
        )}
      </Collapse>
    </>
  );
};

export default CuFeProd;
