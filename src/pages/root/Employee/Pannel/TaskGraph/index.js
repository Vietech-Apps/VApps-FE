import React from 'react';
import EarningGraph from './EarningGraph';
import PropTypes from 'prop-types';
import Categories from './Categories';
import AppCard from 'meta/core/AppCard';
import './index.style.less';
import {List} from 'antd';
import {useIntl} from 'react-intl';

export const MonthlyEarning = ({earningGraphData}) => {
  const {messages} = useIntl();
  return (
    <AppCard className='card-hover' heightFull title={'My Tasks'}>
      <div className='earning-graph'>
        <EarningGraph earningGraphData={earningGraphData} />
      </div>

      <div className='earning-list-view'>
        <List>
          {earningGraphData.map((category) => {
            if (category.name !== '') {
              return <Categories category={category} key={category.name} />;
            }
            return null;
          })}
        </List>
      </div>
    </AppCard>
  );
};

export default MonthlyEarning;

MonthlyEarning.defaultProps = {
  earningGraphData: [],
};

MonthlyEarning.propTypes = {
  earningGraphData: PropTypes.array,
};
