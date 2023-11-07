import { useRouteError, Link } from "react-router-dom"
import { Routes as RoutePaths } from "../../routes";

interface ErrorProps {
    message: string;
}
const ErrorRouting = () => {
    const error = useRouteError() as ErrorProps;
    return (
        <>
            <h2>Error</h2>
            <p>{error.message}</p>
            <Link to={RoutePaths.HOME}>Home</Link>
        </>
    )
}

export default ErrorRouting