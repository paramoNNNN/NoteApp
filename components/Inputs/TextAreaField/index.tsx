import { forwardRef, ReactElement } from 'react';
import classNames from 'classnames';
import styles from './TextArea.module.css';
import InputWrapper from '../InputWrapper';

export interface InputProps extends React.ComponentPropsWithRef<'textarea'> {
  inputClassName?: string;
  /** If false be passed, input border becomes red */
  valid?: boolean;
  /** Defines if the input is disabled */
  disabled?: boolean;
  /** Add an icon element before input */
  icon?: ReactElement;
}

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => {
  const { className, inputClassName, valid, disabled, icon, ...other } = props;

  const classes = classNames(
    styles.input,
    {
      [styles.active]: valid === undefined && !disabled,
    },
    inputClassName
  );

  return (
    <InputWrapper
      className={className}
      icon={icon}
      valid={valid}
      disabled={disabled}
    >
      <textarea className={classes} ref={ref} disabled={disabled} {...other} />
    </InputWrapper>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
