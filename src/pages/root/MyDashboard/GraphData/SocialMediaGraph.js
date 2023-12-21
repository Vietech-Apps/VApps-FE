import React from 'react';
import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import {StyledSocialMediaGraph} from './index.styled';

const SocialMediaGraph = ({data,color}) => {

  return (
    <StyledSocialMediaGraph>
      <ResponsiveContainer width="100%" height={370}>
        <BarChart
          barSize={10}
          data={data}
          margin={{ top: 35, right: 0, left: 0, bottom: 35 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide />
          <YAxis hide />
          <Bar dataKey="counts">
            {/*<LabelList
              dataKey='change'
              content={(x, y, value) => customizedLabel(x, y, value)}
            />*/}
            {data?.map((d, i) => (
              <Cell key={`cell-${i}`} fill={color[i][2]} />
            ))}
            {/* {socialMediaData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))} */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </StyledSocialMediaGraph>
  );
};

export default SocialMediaGraph;

SocialMediaGraph.defaultProps = {
  socialMediaData: [],
};

SocialMediaGraph.propTypes = {
  socialMediaData: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number,
  value: PropTypes.string,
};
