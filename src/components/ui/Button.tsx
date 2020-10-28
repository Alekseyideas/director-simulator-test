import React from 'react';

interface ButtonProps {
  onClick: () => void;
  classes?: string;
  title?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  classes,
  title = 'Наступне запитання',
}) => {
  return (
    <button type='button' className={`tda__btn ${classes || ''}`} onClick={onClick}>
      {title}
    </button>
  );
};
