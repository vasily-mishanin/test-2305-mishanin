import Input from '../Input';
import { validateEmail } from '../../utils/validate';
import { useState } from 'react';
import { FormProps, FormState, IUserData } from './types';

const initialFormState = {
  email: { value: '', error: '' },
  phoneNumber: { value: '', error: '' },
};

function SearchForm({ onSearch, disabled }: FormProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const isSubmitDisabled = !!formState.email.error || !formState.email.value;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, phoneNumber } = formState;
    onSearch({ email: email.value, number: phoneNumber.value });
  };

  const handleChange = (name: string, enteredValue: string) => {
    if (name === 'email') {
      if (validateEmail(enteredValue)) {
        setFormState((prev) => ({
          ...prev,
          email: { value: enteredValue, error: '' },
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          email: { value: enteredValue, error: 'Enter valid email (required)' },
        }));
      }
    } else if (name === 'phoneNumber') {
      setFormState((prev) => ({
        ...prev,
        [name]: { value: enteredValue, error: '' },
      }));
    }
  };

  return (
    <form className='flex flex-col gap-4 mb-5' onSubmit={handleSubmit}>
      <Input
        name='email'
        type='text '
        id='email'
        placeholder='Enter email'
        isRequired
        value={formState.email.value}
        errorMessage={formState.email.error}
        onChange={handleChange}
        validateFn={validateEmail}
      />
      <Input
        name='phoneNumber'
        mask='99-99-99'
        type='text '
        id='phoneNumber'
        placeholder='Enter phone number'
        value={formState.phoneNumber?.value}
        errorMessage={formState.phoneNumber?.error || ''}
        onChange={handleChange}
        validateFn={validateEmail}
      />

      <button className='btn btn-primary' disabled={disabled}>
        Search
      </button>
    </form>
  );
}
export default SearchForm;
