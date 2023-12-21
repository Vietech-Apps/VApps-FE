import React from 'react';

import {invoiceData4} from './invoiceData2';
// import '../../Invoice/index.style.less';
// import '../index.style.less';

const InvoiceTable = () => {
  return (
    <div className='invoice-table'>
      <div className='customer-data mb-2'>
        <div className='d-flex justify-bet'>
          <div className='terms-div'>
            <h4 className='f-bold mr-2 text-under'>Terms & Conditons</h4>
            {/* <h4 className='f-bold mr-2'>{invoiceData4.}</h4> */}

            {invoiceData4?.map((item, index) => (
              <div key={index}>
                <div className='term-head'>
                  <h4 className='f-bold'>{item.header}:</h4>
                </div>
                <div className='term-body'>
                  {item.content?.map((item, index) => (
                    <p key={index}>{`>${item}`}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
