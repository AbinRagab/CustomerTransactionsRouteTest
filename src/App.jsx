import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import CustomerTable from './components/CustomerTable/CustomerTable';
import Layout from './components/Layout/Layout';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {

  const router = createBrowserRouter([
    {path: '/',element:<Layout />,children:[
        {path: '/', element: <CustomerTable/>},
        {path: '/customer', element: <CustomerTable/>},
        {path: '/customer/:customerId', element: <CustomerDetails/>},

        {path:"*", element: <PageNotFound/>}

    ]}
  ])
  return (
      <RouterProvider router={router} />
  );
}

export default App;

