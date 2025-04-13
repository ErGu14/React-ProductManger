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
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/products",
        children: [
          {
            path: "/products",
            element: <Product />
          },
          {
            path: "/products/create",
            element: <AddProduct />
          }
        ]
      },
    ]

  }
]
)


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)