import { useEffect, useState } from 'react';
import Button from '../Button';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// Types
import InputProps from './interface';
// Styles
import './style.scss';

const Input = (props: InputProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { setSearchedKey, searchedKey, placeholder } = props;

  useEffect(() => {
    setInputValue(searchedKey);
  }, [searchedKey])

  return (
    <form className="input-container" onSubmit={(e) => { e.preventDefault() }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => { setInputValue(e.currentTarget.value) }}
        placeholder={placeholder || 'Type something...'}
      />

      <Button handleClick={() => {
        setSearchedKey(inputValue);
        setInputValue("");
      }}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>

      {inputValue !== inputValue.trim() && (
        <small className="input-error">Incorrect Input Value</small>
      )}
    </form>
  );
}

export default Input;