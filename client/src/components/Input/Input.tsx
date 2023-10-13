import styles from './Input.module.css';

type InputProps = {
  type: string;
  name: string;
  id: string;
  value?: string;
};

function Input() {
  return (
    <div>
      <input type='text' />
    </div>
  );
}
export default Input;
