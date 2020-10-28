import React from 'react';
import { IconCheck } from '../svgs';
import { Button } from '../ui';

interface SuccessProps {
  onClickNext: () => void;
}
export const Success: React.FC<SuccessProps> = ({ onClickNext }) => {
  return (
    <div className='tda__questionResult tda__questionResult--success'>
      <IconCheck />
      <h2>Правильно !</h2>
      <Button onClick={onClickNext} />
    </div>
  );
};
