import React from 'react';
import {invoiceData3, customerDetails, priceDetail} from './invoiceData2';
// import '../../Invoice/index.style.less';
// import '../index.style.less';
import {Rs, productCost, RsP, NetTotal} from '../../../Shared/CalcData';

const InvoiceTable = ({inqData, panels}) => {
  //const {sPrice, margin, overhead, sWaste, cPrice, cWaste, tax} = inqData;
  return (
    <div className='invoice-table'>
      <div className='customer-data'>
        <div className='d-flex justify-bet'>
          <h4 className='f-bold'>M/s. {customerDetails.name}</h4>
          <p className='f-bold'>Ref: {customerDetails.ref}</p>
        </div>
        <div className='d-flex justify-bet'>
          <p>
            <span className='mr-2'>
              <b>Enclouser Make:</b>
            </span>{' '}
            Conventional by Bilal Switchgear Engineering
          </p>
          <p>
            <b className='mr-2'>Dated:</b> {customerDetails.dated}
          </p>
        </div>
        <h4 className='f-bold text-center my-2'>Technical Specification</h4>
      </div>
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <td>Sr No</td>
            <td className='text-l'>Description</td>
            <td>Unit.</td>
            <td>Qty</td>
            <td>Unit Price</td>
            <td>Total Price</td>
          </tr>
        </thead>
        {panels?.map((p, index) => (
          <thead className='table-h' key={index}>
            <tr>
              <td className='text-l f-bold' style={{textALign: 'left'}}>
                {index + 1}
              </td>
              <td>{p.name}</td>
              <td>Nos</td>
              <td>{p.qty}</td>
              <td>
                {RsP(
                  p,
                  'withBoth',
                  inqData?.sPrice,
                  inqData?.sWaste / 100,
                  inqData?.cPrice,
                  inqData?.cWaste / 100,
                  inqData?.margin / 100,
                  inqData?.overhead / 100,
                )}
              </td>
              <td>
                {RsP(
                  p,
                  'withBothQty',
                  inqData?.sPrice,
                  inqData?.sWaste / 100,
                  inqData?.cPrice,
                  inqData?.cWaste / 100,
                  inqData?.margin / 100,
                  inqData?.overhead / 100,
                )}
              </td>
            </tr>
          </thead>
        ))}
      </table>
      <div
        className='d-flex justify-bet tfoot text-r mb-2'
        style={{width: '100%'}}>
        <h5>
          Note: <span className='ml-2'></span>20% GST will be charged for
          non-registered customers.
        </h5>
        <div>
          <h5 className='f-bold'>
            Net Sub Total Rs.
            <span className='ml-2 f-4'>
              {Rs(
                NetTotal(
                  panels,
                  'withBoth',
                  inqData?.sWaste / 100,
                  inqData?.sPrice,
                  inqData?.cWaste / 100,
                  inqData?.cPrice,
                  inqData?.margin / 100,
                  inqData?.overhead / 100,
                  inqData?.tax / 100,
                ),
              )}
            </span>
          </h5>
          <h5 className='f-4'>
            Sales Tax @{inqData?.tax}% Rs
            <span className='ml-2 f-4'>
              {Rs(
                NetTotal(
                  panels,
                  'tax',
                  inqData?.sWaste / 100,
                  inqData?.sPrice,
                  inqData?.cWaste / 100,
                  inqData?.cPrice,
                  inqData?.margin / 100,
                  inqData?.overhead / 100,
                  inqData?.tax / 100,
                ),
              )}
            </span>
          </h5>
          <h5 className='f-bold text-l-over'>
            Grand Total Rs.
            <span className='ml-2 f-4'>
              {Rs(
                NetTotal(
                  panels,
                  'total',
                  inqData?.sWaste / 100,
                  inqData?.sPrice,
                  inqData?.cWaste / 100,
                  inqData?.cPrice,
                  inqData?.margin / 100,
                  inqData?.overhead / 100,
                  inqData?.tax / 100,
                ),
              )}
            </span>
          </h5>
        </div>
      </div>
      <div className='d-flex justify-bet tfoot text-r' style={{width: '100%'}}>
        <h5>
          <span className='f-bold text-under'>Remarks:</span>{' '}
          <span className='ml-2'></span>The Offer is based for USD @ 228 PKR
        </h5>
        <div>
          <h5 className='f-bold'>
            Total USD + GST $
            <span className='ml-2 f-4'>
              {Rs(
                NetTotal(
                  panels,
                  'total',
                  inqData?.sWaste / 100,
                  inqData?.sPrice,
                  inqData?.cWaste / 100,
                  inqData?.cPrice,
                  inqData?.margin / 100,
                  inqData?.overhead / 100,
                  inqData?.tax / 100,
                ) / 228,
              )}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
