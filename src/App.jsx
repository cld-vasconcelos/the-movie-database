import './App.css';

import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Root from './pages/Root/Root';
import Home, { loader as homeLoader } from './pages/Home/Home';
import Search, { loader as searchLoader } from './pages/Search/Search';
import Movie, { loader as movieLoader } from './pages/Movie/Movie';
import Show, { loader as showLoader } from './pages/Show/Show';
import Person, { loader as personLoader } from './pages/Person/Person';

import Error from './pages/Error/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route errorElement={<Error />}>
        <Route index element={<Home />} loader={homeLoader} />
        <Route path="/search" element={<Search />} loader={searchLoader} />
        <Route path="/movie/:movieId" element={<Movie />} loader={movieLoader} />
        <Route path="/tv/:showId" element={<Show />} loader={showLoader} />
        <Route path="/person/:personId" element={<Person />} loader={personLoader} />
      </Route>
    </Route>

  )
);

function App() {
  return (
    <div className="app-wrapper">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
