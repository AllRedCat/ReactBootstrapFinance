import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavBar';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App() {

  return (
    <>
      <NavigationBar />
      <h1>Hello world!</h1>
    </>
  )
}

export default App
