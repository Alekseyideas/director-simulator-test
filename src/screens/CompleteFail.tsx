import React from 'react';
import IconFail from '../images/depressed.svg';
import { Button } from '../components/ui';

interface CompleteFailProps {}

export const CompleteFail: React.FC<CompleteFailProps> = () => {
  return (
    <div className='tda__faildScreen'>
      <img src={IconFail} alt='IconFail' />
      <h2>
        Тест не складено. <br /> Не здавайтесь! <br />
      </h2>
      <p>
        Спробуйте скласти ще раз, або отримайте повний доступ до тренажера, <br /> щоб бути на крок
        ближче до перемоги у конкурсі.
      </p>
      <div className='tda__screenBtnWrapper tda__mt-2'>
        <Button
          onClick={() => null}
          title='Переглянути помилки'
          classes='tda__btn--blue tda__mr-3'
        />
        <a href='/' className='tda__btn'>
          Перескласти
        </a>
      </div>
    </div>
  );
};
