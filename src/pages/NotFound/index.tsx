import { Link } from 'react-router-dom';
import { Routes as RoutPaths } from '../../routes';

const NotFound = () => {
  return (
    <>
      <h2>Page Not Found :(</h2>
      <Link to={RoutPaths.HOME}>Home</Link>
    </>
  );
};

export default NotFound;
