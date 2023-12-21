import {PlusSquareFilled} from '@ant-design/icons';
import {BiCar} from 'react-icons/bi';
import {RiFilterOffLine} from 'react-icons/ri';
import {FaUserTie} from 'react-icons/fa';
import {IoIosRefresh} from 'react-icons/io';
import {
  GiOrganigram,
  GiGasPump,
  GiMoneyStack,
  GiLevelEndFlag,
  GiTruck,
} from 'react-icons/gi';
import {useIntl} from 'react-intl';
import {
  Button,
  PageHeader,
  Col,
  Row,
  Select,
  DatePicker,
  Tooltip,
  Input,
} from 'antd';
import React from 'react';
import ExportExcel from './ExportExcel';

const App = ({
  list2,
  handleVisible,
  titleForm,
  ProcessList,
  setFilter1,
  filter1,
  setFilter2,
  filter2,
  setFilter3,
  filter3,
  setFilter4,
  filter4,
  setFilter5,
  filter5,
  setFilter6,
  filter6,
  setFilter7,
  filter7,
  listData,
  list1,
  setInquery,
  inquery,
  setStart,
  setEnd,
}) => {
  const {Option} = Select;
  const {Search} = Input;
  const {messages} = useIntl();

  const handleFilter1 = (e) => {
    setFilter1(e);
    setInquery(inquery + 1);
  };
  const handleFilter2 = (e) => {
    setFilter2(e);
    setInquery(inquery + 1);
  };
  const handleFilter3 = (e) => {
    setFilter3(e);
    setInquery(inquery + 1);
  };
  const handleFilter4 = (e) => {
    setFilter4(e);
    setInquery(inquery + 1);
  };
  const handleFilter5 = (e) => {
    setFilter5(e);
    setInquery(inquery + 1);
  };
  const handleFilter6 = (e) => {
    setFilter6(e);
    setInquery(inquery + 1);
  };
  const handleFilter7 = (e) => {
    setFilter7(e);
    setInquery(inquery + 1);
  };
  const [range, setRange] = React.useState(null);
  const handleReset = () => {
    setInquery(1);
    //setFilter1();
    // setFilter2();
    // setFilter3();
    // setFilter4();
    // setFilter5();
    // setFilter6();
    // setFilter7();

    setStart();
    setEnd();
    setRange(null);
  };
  const {RangePicker} = DatePicker;
  const handleRange = (e) => {
    setStart(e == null ? null : e[0]);
    setEnd(e == null ? null : e[1]);
    setInquery(inquery + 1);
    setRange(e == null ? null : e);
  };
  return (
    <div>
      <PageHeader
        ghost={false}
        title={'Tasks'}
        footer={
          <>
            <Row gutter={10} style={{marginBottom: -15}}>
              <Col xs={24} md={6}>
                <RangePicker
                  placement={'bottomRight'}
                  size='small'
                  onChange={handleRange}
                  value={range == null ? null : range}
                />
              </Col>
            </Row>
          </>
        }
        extra={[
          <Tooltip key='10' title={'Refresh Data'}>
            <Button
              icon={<IoIosRefresh />}
              key='9'
              type='primary'
              onClick={handleReset}
            />
          </Tooltip>,
          //<ExportExcel data={listData} key='5' />,
          <Button
            key='99'
            type='primary'
            icon={<PlusSquareFilled />}
            onClick={handleVisible}>
            {titleForm}
          </Button>,
        ]}
      />
    </div>
  );
};

export default App;
