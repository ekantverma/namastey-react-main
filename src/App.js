import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestraurantMenu';

const AppLayout = () => {
  return (
    <div className="app">
      <Header/>
      <Outlet/>
    </div>
  )
}
  
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    exact: true,

    children:[
      {
        path: "/",
        element: <Body/>
      },
      {
        path: "/about",
        element: <About />,
        exact: true,
      },
      {
        path: "contact",
        element: <Contact/>,
        exact: true,
      },
      {
        path:"/restaurants/:resId",
        element : <RestaurantMenu/>,
        exact:true,
      }
    ],
    errorElement: <Error/>
  }
]);

  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(<RouterProvider router={appRouter}/>);
  