import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/Home.jsx';
import Listingpage from './components/Listingpage.jsx';
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
 {
  path:"/listing",
  element:<Listingpage/>
 } 
])

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}>
    <App />
    </RouterProvider>

)
