import React from "react";
import moment from "moment";
// import '../index.style.less';
// import '../../Invoice/index.style.less';

const InvoiceTable = ({ inqData, panels }) => {
  return (
    <>
      <div className="invoice-table">
        <div className="customer-data">
          <div className="d-flex justify-bet">
            <h4 className="f-bold">{inqData?.customer?.title}</h4>
          </div>
          <div className="d-flex justify-bet">
            <p>
              <span className="mr-2">Enclouser Make:</span>{" "}
              {/* {data?.project?.title} */}
              Conventional by Bilal Switchgear Engineering
            </p>
            <p>
              <b className="mr-2">INQ:</b> {inqData?.Id}
              <br></br>
              <b className="mr-2">Dated:</b> {moment().format("YYYY-MM-DD")}
            </p>
          </div>
          <h4 className="f-bold text-center my-2">Technical Specification</h4>
        </div>
        {panels?.map((items, index) => (
          <table key={items._id}>
            {index == 0 && (
              <thead>
                <tr>
                  <td>Code</td>
                  <td>Detail</td>
                  <td></td>
                  <td>Qty</td>
                  <td>Model</td>
                  <td>Make</td>
                </tr>
              </thead>
            )}

            <thead className="table-h">
              <tr>
                <td>{index + 1}</td>
                <td> {items?.name}</td>
                <td></td>
                <td>{items?.qty}</td>

                <td></td>
                <td></td>
              </tr>
            </thead>
            {items?.products?.map((item, inde) => (
              <tbody key={inde}>
                {!item.type == 1 ? (
                  <tr className="section-tr">
                    <td className="f-bold" style={{ textAlign: "left" }}>
                      {item.name}
                    </td>
                    <td></td>
                    <td></td>
                    <td>{item.qty}</td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  <tr className="map-td">
                    <td className="td-sr">{item.code}</td>
                    <td>{item.name}</td>
                    <td></td>
                    <td>{item.qty}</td>
                    <td>{item.model}</td>
                    <td>{item.make}</td>
                  </tr>
                )}
                {items.products?.length - 1 == inde && (
                  <>
                    <tr className="section-tr">
                      <td className="f-bold" style={{ textAlign: "left" }}>
                        Panel Accessories
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {items.accessories?.map((p) => (
                      <tr className="map-td" key={p._id}>
                        <td className="td-sr">{p.code}</td>
                        <td>{p.name}</td>
                        <td></td>
                        <td>{p.qty}</td>
                        <td>{p.model}</td>
                        <td>{p.make}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            ))}
          </table>
        ))}
      </div>
    </>
  );
};

export default InvoiceTable;
