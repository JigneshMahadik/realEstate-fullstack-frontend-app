import logo from './logo.svg';
import './App.css';
import { HomePage } from './Pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import { PostPropertyPage } from './Pages/PostPropertyPage';
import { PostedPropertyPage } from './Pages/PostedPropertyPage';
import { RequestedPropertyPage } from './Pages/RequestedPropertyPage';
import { Signup } from './Pages/Signup';
import { Login } from './Pages/Login';
import { PropertyDetails } from './Pages/PropertyDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/PostPropertyPage' element={<PostPropertyPage/>}></Route>
        <Route path='/PostedPropertyPage' element={<PostedPropertyPage/>}></Route>
        <Route path='/RequestedPropertyPage' element={<RequestedPropertyPage/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/PropertyDetails/:propId' element={<PropertyDetails/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
