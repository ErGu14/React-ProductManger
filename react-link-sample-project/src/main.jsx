import { createRoot } from 'react-dom/client'
import App from './App'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Product from './Pages/Product'
import AddProduct from './Pages/AddProduct'
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/home",
        element: <Home />
      },

      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/product",
        element: <Product />
      },
      {
        path: "/addproduct",
        element: <AddProduct />
      }
    ]

  }
]
)


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)