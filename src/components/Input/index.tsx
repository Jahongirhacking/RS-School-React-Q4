import { useEffect, useState } from 'react';
import Button from '../Button';
// Types
import InputProps from './interface';
// Styles
import './style.scss';

const Input = ({
  setSearchedKey,
  searchedKey,
  placeholder,
  type,
  className,
  btnContent
}: InputProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(searchedKey);
  }, [searchedKey])

  return (
    <form className="input-container" onSubmit={(e) => { e.preventDefault() }}>
      <input
        className={className}
        type={type}
        value={inputValue}
        onChange={(e) => { setInputValue(e.currentTarget.value) }}
        placeholder={placeholder || 'Type something...'}
      />

      <Button handleClick={() => {
        setSearchedKey(inputValue);
        setInputValue("");
      }}>
        {btnContent}
      </Button>

      {inputValue !== inputValue.trim() && (
        <small className="input-error">Incorrect Input Value</small>
      )}
    </form>
  );
}

export default Input;