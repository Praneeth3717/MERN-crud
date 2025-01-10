import GetUser from './components/getUser/GetUser'
import AddUser from './components/addUser/AddUser'
import UpdateUser from './components/updateUser/UpdateUser';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'

function App() {
  const route=createBrowserRouter([
    {
      path:'/',
      element:<GetUser/>,
    },
    {
      path:'/addUser',
      element:<AddUser/>
    },
    {
      path:'/update/:id',
      element:<UpdateUser/>
    }
  ])
  return (
    <>
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
    </>
  )
}
export default App;