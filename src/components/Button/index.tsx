import ButtonProps from '../../@types/button';
import './style.scss';

const Button = (props: ButtonProps) => {
  const { handleClick, children, btnName } = props;
  return (
    <button className={`btn ${btnName}`} onClick={() => handleClick()}>
      {children || 'Send'}
    </button>
  );
}

export default Button;