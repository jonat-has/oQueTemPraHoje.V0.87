import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CriarBodyInicial from './Pages/PaginaInicial/Body.tsx'
import CriarBodyReceitas from './Pages/PaginaReceitas/BodyReceitas.tsx'
import CriarBodyExibirReceita from './Pages/PaginaExibirReceita/BodyExibirReceita.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <CriarBodyInicial/>,
  },
  {
    path: "/ReceitasEncontradas",
    element: <CriarBodyReceitas/>,
  },
  {
    path: "/PreparoReceita",
    element: <CriarBodyExibirReceita/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
    <RouterProvider router={router} />
    </ChakraProvider> 
  </React.StrictMode>,
)
