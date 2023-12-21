import React from 'react';
import {Col, Row} from 'antd';
import './index.style.less';

const Footer = () => {
  return (
    <div className='mt-4'>
      <Row className='in-footer-card '>
        <Col span={8} className='in-footer-card-divider'>
          <h5>Head Office/Factory:</h5>
          <p className='invoice-p'>
            11KM, Raiwind Road,<br></br>
            Lahore Park stop, lahore-Pakistan. <br></br>
            UAN +92-42-111 19 19 19 cell: 0336-4810167<br></br>
            Fax: 042 35320050 Email: info@bilaleng.com
          </p>
          {/* <Divider type='vertical' /> */}
        </Col>

        <Col span={8} className='in-footer-card-divider'>
          <h5>Site Office:</h5>
          <p className='invoice-p'>
            Plot No.1, Street no. 5,muhammad nagar,<br></br>
            28-Allama iqbal road, lahore-Pakistan.<br></br>
            Tel: 92 42 36305462, 36368740,<br></br>
            36367998, 36300770 Fax: 92 42 36364217<br></br>
          </p>
        </Col>

        <Col span={8}>
          <h5>Islamabad Office:</h5>
          <p className='invoice-p'>
            Flat 07, warraich plaza, sui gas chowk,<br></br>
            1-9, Islamabad.<br></br>
            Cell: 0332-4999159<br></br>
          </p>
        </Col>
      </Row>
      <div className='invoice-footer'>www.bilaleng.com</div>
    </div>
  );
};

export default Footer;
