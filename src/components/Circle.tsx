import React from 'react';
import './Circle.scss';

interface CircleProps {
  num: number;
}

export const Circle: React.FC<CircleProps> = ({ num }) => {
  return (
    <div className='progress-circle' id='circle' data-progress={num === Infinity ? 0 : num}></div>
  );
};
