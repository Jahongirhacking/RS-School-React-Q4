import { Link } from 'react-router-dom';
import { Routes as RoutePaths } from '../../routes';

const DetailsNotFound = () => {
  return (
    <aside className="aside">
      <h2>Details Not Found :(</h2>
      <Link to={RoutePaths.HOME} className="aside__close-btn btn">
        Close
      </Link>
    </aside>
  );
};

export default DetailsNotFound;
