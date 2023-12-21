import React from 'react';
import PropTypes from 'prop-types';
import AppTableContainer from 'meta/core/AppTableContainer';
import {Avatar} from 'antd';
import '../index.style.less';

const columns = [
  {
    title: 'No.',
    dataIndex: `id`,
    key: 'id',
    render: (id) => <span>{id}.</span>,
  },
  {
    title: 'Task',
    dataIndex: 'task',
    key: 'task',
  },
  {
    title: 'Assigned By',
    dataIndex: 'name',
    key: 'name',
    render: (name) => (
      <div className='deals-user-info'>
        <Avatar src={name.logo} />
        <div className='deals-user-info-content'>
          <h3>{name.name}</h3>
        </div>
      </div>
    ),
  },
  {
    title: 'Module',
    dataIndex: 'module',
    key: 'module',
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
  },
  {
    title: 'Due',
    dataIndex: 'created',
    key: 'created',
  },
];
const DealsTable = (props) => {
  const {dealsTableData} = props;

  return (
    <AppTableContainer
      hoverColor
      className='deals-table'
      data={dealsTableData}
      columns={columns}
    />
  );
};

export default DealsTable;

DealsTable.defaultProps = {
  dealsTableData: [],
};

DealsTable.propTypes = {
  dealsTableData: PropTypes.array,
};
