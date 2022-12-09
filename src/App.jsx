import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routes from './routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <div className="app-wrapper">
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  );
}

export default App;
