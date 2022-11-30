import './App.css';

import { RouterProvider, Routes, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Root from './pages/Root/Root';
import Home from './pages/Home/Home';
import Movie, { loader as movieLoader } from './pages/Movie/Movie';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/movies/:movieId" element={<Movie />} loader={movieLoader} />
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
