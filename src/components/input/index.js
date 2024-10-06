import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  const propsOnChange = props.onChange ?? (() => {});
  const type = props.type ?? 'text';
  const theme = props.theme ?? '';
  const propsValue = props.value ?? '';

  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(propsValue);

  const onChangeDebounce = useCallback(
    debounce(value => propsOnChange(value, props.name), 600),
    [propsOnChange, props.name],
  );

  // Обработчик изменений в поле
  const onChange = event => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(propsValue), [propsValue]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme: theme })}
      name={props.name}
      value={value}
      type={type}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
};

export default memo(Input);
