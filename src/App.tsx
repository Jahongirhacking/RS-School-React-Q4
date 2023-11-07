import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// Routes
import { Routes as RoutePaths } from "./routes";
// Layouts
import RootLayout from "./layouts/RootLayout";
import HomePageLayout from "./layouts/HomePageLayout";
// Pages
import NotFound from "./pages/NotFound";
import Aside from "./pages/Aside";
// Error
import ErrorRouting from "./error/ErrorRouting";
// API
import { fetchPropertiesLoader } from "./pages/Aside";
import DetailsNotFound from "./pages/DetailsNotFound";

const router = createBrowserRouter(createRoutesFromElements(
  <Route
    path={RoutePaths.HOME}
    element={<RootLayout />}
    errorElement={<ErrorRouting />}
  >
    <Route path="" element={<HomePageLayout />} >
      <Route
        path={`${RoutePaths.DETAILS}/:id`}
        element={<Aside />}
        loader={fetchPropertiesLoader}
        errorElement={<DetailsNotFound />}
      />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route >
))

const App = () => {
  return (<RouterProvider router={router} />)
}

export default App;