import { initializeApp } from "firebase/app";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavBar';
import Home from './pages/home/home';
import Account from './pages/account/account';
import Categories from './pages/categories/categories';
import Transictions from './pages/transictions/transictions';
import TableSection from './pages/table/table';

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyASUf-PgdhfjbGlUinHE1eoS8TErb4kShs",
  authDomain: "financereact-77dac.firebaseapp.com",
  projectId: "financereact-77dac",
  storageBucket: "financereact-77dac.appspot.com",
  messagingSenderId: "257796398320",
  appId: "1:257796398320:web:8140b66dd4af3f85cf3635",
  measurementId: "G-8WPCJGQQNK"
});

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
      Component = <TableSection />;
      break;
    default:
      break;
  }

  return (
    <>
      <NavigationBar />
      {Component}
    </>
  )
}

export default App
