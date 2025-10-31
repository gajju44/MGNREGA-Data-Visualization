import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/HomePage/Home';
function App() {
 

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      errorElement: '404 Page not found',
    },
]);


  return <RouterProvider router={router} />;
}

export default App;
