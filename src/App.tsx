import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavBar';
import Home from './pages/home/home';
import Account from './pages/account/account';
import Categories from './pages/categories/categories';
import Transictions from './pages/transictions/transictions';
import Tables from './pages/table/table';

function App() {
  let Component;
  switch (window.location.pathname) {
    case '/':
      Component = <Home />;
      break;
    case '/accounts':
      Component = <Account />;
      break;
    case '/categories':
      Component = <Categories />;
      break;
    case '/transfections':
      Component = <Transictions />;
      break;
    case '/tables':
      Component = <Tables />;
      break;
    default:
      break;
  }

  return (
    <>
      <NavigationBar />
      {Component}
      <h1>Hello world!</h1>
    </>
  )
}

export default App
