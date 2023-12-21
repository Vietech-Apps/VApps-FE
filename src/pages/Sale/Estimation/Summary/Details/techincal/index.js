import React from "react";
import Header from "../Header";
import jwtAxios from "meta/services/auth/jwt-api";
import { useState } from "react";
import { saveAs } from "file-saver";
import ComposeMail from "../ComposeMail";
import { useParams } from "react-router-dom";

const Invoice = ({ enqData, panels }) => {
  const { id } = useParams();
  // const [{ apiData: panels }] = useGetData(`erp/panel/readall/${id}`, []);
  // const [{ apiData: enqData }] = useGetData(`erp/Estimation/read/${id}`, {});

  const [isComposeMail, setComposeMail] = useState(false);

  const onCloseComposeMail = () => {
    setComposeMail(false);
    setSendStatus(false);
  };
  
  const [downloadStatus, setDownloadStatus] = useState();
  const [download2Status, setDownload2Status] = useState();
  const createAndDownloadPdf = () => {
    setDownloadStatus(true);
    jwtAxios
      .get(`pdf/fetch-pdf`, {
        responseType: "blob",
        params: {
          id: id,
        },
      })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, `${enqData?.cuId}(Commercial).pdf`);
        setDownloadStatus(false);
      });
  };

  const downlaodTechnical = () => {
    setDownload2Status(true);

    jwtAxios
      .get(`pdf/fetch-technical`, {
        responseType: "blob",
        params: {
          id: id,
        },
      })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, `${enqData?.cuId}(Technical).pdf`);
        setDownload2Status(false);
      });
  };
  const [sendStatus, setSendStatus] = useState();
  const sendPdf = (e) => {
    setComposeMail(true);
  };
  return (
    <>
      <Header
        downloadStatus={downloadStatus}
        download2Status={download2Status}
        createAndDownloadPdf={createAndDownloadPdf}
        downlaodTechnical={downlaodTechnical}
        sendPdf={sendPdf}
        sendStatus={sendStatus}
      />
      {isComposeMail ? (
        <ComposeMail
          enqData={enqData}
          panels={panels}
          isComposeMail={isComposeMail}
          onCloseComposeMail={onCloseComposeMail}
        />
      ) : null}
      {isComposeMail ? (
        <ComposeMail
          enqData={enqData}
          panels={panels}
          isComposeMail={isComposeMail}
          onCloseComposeMail={onCloseComposeMail}
        />
      ) : null}
    </>
  );
};

export default Invoice;
