import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import Appointments from "./Pages/Appointments/Appointments";
import AppointmentDetails from "./Pages/Appointments/AppointmentDetails";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";


const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
         <Footer/>
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/Appointments",
          element: <Appointments />,
        },
        {
          path: "/appointment-details",
          element: <AppointmentDetails />,
        },

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;