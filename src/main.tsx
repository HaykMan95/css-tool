import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from "react-router";
import App, { action as indexAction } from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    action: indexAction,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
