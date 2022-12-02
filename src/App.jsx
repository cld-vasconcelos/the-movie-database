import './App.css';

import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Root from './pages/Root/Root';
import Home, { loader as homeLoader } from './pages/Home/Home';
import Search, { loader as searchLoader} from './pages/Search/Search';
import Movie, { loader as movieLoader } from './pages/Movie/Movie';

import Error from './pages/Error/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route errorElement={<Error />}>
        <Route index element={<Home />} loader={homeLoader} />
        <Route path="/search" element={<Search />} loader={searchLoader} />
        <Route path="/movies/:movieId" element={<Movie />} loader={movieLoader} />
      </Route>
    </Route>

  )
);

function App() {
  return (
    <div className="wrapper">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
