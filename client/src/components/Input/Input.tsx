import styles from './Input.module.css';
import InputMask from 'react-input-mask';

type InputProps = {
  type?: string;
  name: string;
  id: string;
  placeholder: string;
  errorMessage: string;
  isRequired?: boolean;
  onChange: (name: string, value: string) => void;
  value?: string;
  mask?: string;
  validateFn?: (value: string) => boolean;
};

function Input({
  type = 'text',
  name,
  id,
  value,
  isRequired,
  placeholder,
  errorMessage,
  mask,
  onChange,
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value;
    onChange(name, enteredValue);
  };

  const handleInputMaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let enteredValue = e.target.value;
    enteredValue = enteredValue.replace(/\D/g, '');
    onChange(name, enteredValue);
  };

  return (
    <div className={styles.inputWrapper}>
      {isRequired && <span className={styles.requiredMark}>*</span>}
      {mask ? (
        <InputMask
          className={styles.input}
          type={type}
          name={name}
          id={id}
          value={value || ''}
          onChange={handleInputMaskChange}
          placeholder={placeholder}
          mask={mask}
        />
      ) : (
        <input
          className={styles.input}
          type={type}
          name={name}
          id={id}
          value={value || ''}
          required={isRequired}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}

      <p className={styles.errorField}>{errorMessage}</p>
    </div>
  );
}
export default Input;
