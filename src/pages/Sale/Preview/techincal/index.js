import React from "react";
import IntlMessages from "meta/utility/IntlMessages";
import Header from "../Header";
import Footer from "../Footer";
import InvoiceTable from "./content";
import AppCard from "meta/core/AppCard";
// import "./index.style.less";
import AppAnimateGroup from "meta/core/AppAnimateGroup";
import AppPageMetadata from "meta/core/AppPageMetadata";
import jwtAxios from "meta/services/auth/jwt-api";
import { useState } from "react";
import { saveAs } from "file-saver";

const Invoice = ({ inqData, panels }) => {
  console.log("object", inqData);
  const [downloadStatus, setDownloadStatus] = useState();
  const createAndDownloadPdf = () => {
    setDownloadStatus(true);
    jwtAxios
      .post(`pdf/create-pdf`, { data: inqData, dataSource: panels })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "invoice.pdf");
        setDownloadStatus(false);
      });
  };

  const [sendStatus, setSendStatus] = useState();
  const sendPdf = (e) => {
    e.preventDefault();
    setSendStatus(true);
    jwtAxios
      .post(`pdf/send-pdf`, { data: inqData, dataSource: panels })
      // .then(() => console.log("invoice sent successfully"))
      .then(() => setSendStatus(false))
      .catch((error) => {
        console.log(error);
        setSendStatus(false);
      });
  };
  return (
    <AppAnimateGroup type="bottom">
      <AppPageMetadata title="Invoices" />
      <div className="invoice" key="invoice1">
        <div className="invoice-container">
          <AppCard className="invoice-card no-card-space invoice-1">
            <Header
              downloadStatus={downloadStatus}
              sendStatus={sendStatus}
              sendPdf={sendPdf}
              createAndDownloadPdf={createAndDownloadPdf}
            />
            <InvoiceTable inqData={inqData} panels={panels} />
            <Footer />
          </AppCard>
        </div>
      </div>
    </AppAnimateGroup>
  );
};

export default Invoice;
