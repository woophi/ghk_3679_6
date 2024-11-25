import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { SliderInput, SliderInputProps } from '@alfalab/core-components/slider-input';
import { Typography } from '@alfalab/core-components/typography';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';

const min = 10_000;
const max = 95_000;
const step = 1000;
const range: SliderInputProps['range'] = {
  min: [min],
  max: [max],
};
const pips: SliderInputProps['pips'] = {
  mode: 'values',
  values: [min, max],
  format: {
    to: (value: number) => {
      return `${value.toLocaleString('ru')} ₽`;
    },
  },
};

const swiperValues = [
  {
    title: '1 год',
    value: 12,
  },
  {
    title: '9 мес',
    value: 9,
  },
  {
    title: '6 мес',
    value: 6,
  },
  {
    title: '3 мес',
    value: 3,
  },
  {
    title: '1 мес',
    value: 1,
  },
];

const calculatePayment = (principal: number, interestRate: number, term: number) => {
  const monthlyInterestRate = interestRate / 12;
  const exponent = Math.pow(1 + monthlyInterestRate, term);

  return Math.ceil((principal * monthlyInterestRate * exponent) / (exponent - 1));
};

export const App = () => {
  const [selectedPeriod, setPeriod] = useState(12);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<number | string>(10_000);

  const handleInputChange: SliderInputProps['onInputChange'] = (_, { value }) => {
    setValue(typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value);
  };

  const handleSliderChange: SliderInputProps['onSliderChange'] = ({ value }) => {
    setValue(value);
  };

  const numberValue = typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value;
  const handleBlur = () => {
    setValue(Math.max(min, Math.min(max, numberValue)));
  };

  const submit = () => {
    setLoading(true);
    LS.setItem(LSKeys.ShowThx, true);
    setLoading(false);
  };

  if (LS.getItem(LSKeys.ShowThx, false)) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="semibold">
          Кредит наличными
        </Typography.TitleResponsive>
        <Typography.TitleResponsive tag="h1" view="small" font="system" weight="semibold">
          На повседневные траты
        </Typography.TitleResponsive>
        <Typography.Text view="primary-medium">Получите деньги на самое нужное</Typography.Text>
        <Typography.Text view="primary-medium">Онлайн, не выходя из дома</Typography.Text>
        <div>
          <Typography.Text view="primary-medium" weight="medium">
            Сумма и срок кредита
          </Typography.Text>
          <SliderInput
            block
            value={value.toLocaleString('ru')}
            sliderValue={numberValue}
            onInputChange={handleInputChange}
            onSliderChange={handleSliderChange}
            onBlur={handleBlur}
            min={min}
            max={max}
            range={range}
            pips={pips}
            step={step}
            size={56}
            rightAddons="₽"
            fieldClassName={appSt.slider}
            sliderClassName={appSt.slid}
          />
        </div>
      </div>
      <Swiper style={{ marginLeft: '1rem' }} spaceBetween={8} slidesPerView="auto">
        {swiperValues.map(v => (
          <SwiperSlide
            onClick={() => setPeriod(v.value)}
            className={appSt.swSlide({ selected: selectedPeriod === v.value })}
            key={v.value}
          >
            {v.title}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={appSt.container}>
        <Typography.Text view="primary-medium" weight="medium">
          Ежемесячный платеж {calculatePayment(numberValue, 0.475, selectedPeriod).toLocaleString('ru')} ₽
        </Typography.Text>
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} block view="primary" onClick={submit}>
          Получить деньги
        </ButtonMobile>
      </div>
    </>
  );
};
