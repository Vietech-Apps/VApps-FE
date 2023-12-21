import React from 'react';
import {customerDetails, attentionTo, Subject,Letter} from './invoiceData2';
import '../../Invoice/index.style.less';
import '../index.style.less';

const InvoiceTable = () => {
  return (
    <div className='invoice-table'>
      <div className='customer-data mb-2'>
        <div className='d-flex justify-bet'>
          <div className='d-flex'>
            <h4 className='f-bold mr-2'>{customerDetails.srName}</h4>
            <div>
              <h4 className='f-bold'>{customerDetails.name}</h4>
              <p>{customerDetails.project}</p>
            </div>
          </div>
          <div>
            <p className='f-bold'>Ref: {customerDetails.ref}</p>
            <p>
              <div>
                <b className=''>Dated:</b> {customerDetails.dated}
              </div>
              <div className='d-flex justify-c-end'>
                {customerDetails.dated2}
              </div>
            </p>
          </div>
        </div>
      </div>
      <div className='customer-data mb-2'>
        <div className='d-flex'>
          <h4 className='mr-2 f-4'>{attentionTo.srName}</h4>
          <div>
            <h4 className='f-bold'>{attentionTo.name}</h4>
            <p> {attentionTo.lvl}</p>
            <p>Email: {attentionTo.email}</p>
            <p>Contact: {attentionTo.contact}</p>
          </div>
        </div>
      </div>
      <div className='customer-data mb-2'>
        <div className='d-flex'>
          <h4 className='mr-2 f-4'>{Subject.srName}</h4>
          <div>
            <h4 className='f-bold text-under'>{Subject.name}</h4>
            <p> {Subject.project}</p>
            <p>Enclosure make: {Subject.enclosure}</p>
          </div>
        </div>
      </div>
      <div className='customer-data mb-2'>
        <div>
          <h4 className='mr-2 f-4 mb-4'>{Letter.srName}</h4>
          <h4 className='f-bold text-under my-2'>{Letter.name}</h4>
          <p className='my-2'> {Letter.greet}</p>
          <ol className='my-2'>
            <li>{Letter.p1}</li> <li>{Letter.p2}</li>{' '}
          </ol>
          <p className='my-2'> {Letter.content}</p>
          <p className='my-2 mb-5'> {Letter.content2}</p>
          <p className='my-2 f-it mb-4'> {Letter.it}</p>
          <p className='my-2 mb-4'> {Letter.regards}</p>
          <p className='leader-detail text-l-over'> {Letter.ldName}</p>
          <p className='leader-detail'> {Letter.ldDetail}</p>
          <p className='leader-detail'> {Letter.cell}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
