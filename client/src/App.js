import './App.css';
import { Routes,Route, BrowserRouter, Router } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import { Provider } from 'react-redux'; 
import store from './redux/configureStore';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
