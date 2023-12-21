import React, {useState} from 'react';
import DealsTable from './TodoTable';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import AppCard from 'meta/core/AppCard';
import AppSelect from 'meta/core/AppSelect';
import './index.style.less';
import {useNavigate} from 'react-router-dom';
import {Button} from 'antd';

const Deals = (props) => {
  const {dealsTableData} = props;
  const [tableData, setTableData] = useState(dealsTableData);

  const handleChange = (value) => {
    if (value === messages['dashboard.allDeals']) {
      setTableData(dealsTableData);
    } else if (value === messages['todo.completed']) {
      setTableData(
        dealsTableData.filter((data) => data.progress === 'Approved'),
      );
    } else {
      setTableData(
        dealsTableData.filter((data) => data.progress === 'Pending'),
      );
    }
  };

  const {messages} = useIntl();
  const navigate = useNavigate();
  return (
    <AppCard
      className='no-card-space-ltr-rtl'
      title={
        <div className='ant-row ant-row-middle'>
          <h3 className='deals-title'>My Todos</h3>
          <AppSelect
            menus={['Today', 'Tommorow', 'Next Month']}
            defaultValue={'Today'}
            onChange={handleChange}
          />
        </div>
      }
      extra={
        <div className='total-balance-btn-view'>
          <Button
            key='99'
            onClick={() => navigate('/meta-workspace/todo-tasks')}
            shape='round'
            size='small'
            className='btn btn-light-blue'>
            View All
          </Button>
        </div>
      }
      heightFull>
      <DealsTable dealsTableData={tableData} />
    </AppCard>
  );
};

export default Deals;

Deals.defaultProps = {
  dealsTableData: [],
};

Deals.propTypes = {
  dealsTableData: PropTypes.array,
};
