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
    setFilter1();
    setFilter2();
    setFilter3();
    setFilter4();
    setFilter5();
    setFilter6();
    setFilter7();

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
        title={'Man Hours Report'}
        // subTitle={
        //   <Search
        //     key='9'
        //     //className='bitBucket-header-search'
        //     placeholder={messages['common.searchHere']}
        //     onClick={handleReset}
        //   />
        // }
        footer={
          <>
            <Row gutter={10} style={{marginBottom: -15}}>
              <Col xs={12} md={6}>
                <Select
                  onSelect={handleFilter1}
                  showSearch
                  allowClear={filter1}
                  value={filter1}
                  //size='small'
                  onClear={() => {
                    setFilter1();
                    setInquery(inquery + 1);
                  }}
                  placeholder='By Project'
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  style={{
                    width: '100%',
                  }}
                  suffixIcon={<FaUserTie style={{fontSize: '14px'}} />}>
                  {list1?.map((p) => (
                    <Select.Option key={p._id} value={p._id}>
                      {`${p.name}>${p.process.title}`}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col xs={12} md={6}>
                <Select
                  onSelect={handleFilter2}
                  showSearch
                  allowClear={filter2}
                  value={filter2}
                  //size='small'
                  onClear={() => {
                    setFilter2();
                    setInquery(inquery + 1);
                  }}
                  placeholder='By progress'
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  style={{
                    width: '100%',
                  }}>
                 
                    <Option value='Completed'>Completed</Option>
                    <Option value='In Process'>In Process</Option>
                    <Option value='On Hold'>On Hold</Option>
                    <Option value='Submitted'>Submitted</Option>
                  </Select>
                
              </Col>

              <Col xs={24} md={6}>
                <RangePicker
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
              onClick={() => setInquery(inquery + 1)}></Button>
          </Tooltip>,
          // <ExportExcel data={listData} key='5' />,
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
