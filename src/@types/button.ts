import { ChangeEvent, ReactElement } from 'react';

export default interface ButtonProps {
  handleClick: (event?: ChangeEvent | MouseEvent | undefined) => void;
  children?: string | ReactElement;
  btnName?: string;
}
