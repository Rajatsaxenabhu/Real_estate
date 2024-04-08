import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home' 
import About from './pages/About'
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Header from './components/Header';
export default function App() {
  return (<BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Profile' element={<Profile/>}/>
    <Route path='/SignIn' element={<SignIn/>}/>
    <Route path='/SignOut' element={<SignOut/>}/>
    <Route path='/About' element={<About/>}/>
  </Routes>

  </BrowserRouter>
  )
}