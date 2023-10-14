export type FormState = {
  email: { value: string; error: string };
  phoneNumber: { value: string; error: string };
};

export interface IUserData {
  email: string;
  number: string;
}

export type FormProps = {
  onSearch: (searchData: IUserData) => void;
  disabled: boolean;
};
