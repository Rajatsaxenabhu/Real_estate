import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home' 
import About from './pages/About'
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRouter';
export default function App() {
  return (<BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
    <Route path='/SignIn' element={<SignIn/>}/>
    <Route path='/SignOut' element={<SignOut/>}/>
    <Route path='/About' element={<About/>}/>
    <Route path='/signUp' element={<SignUp/>}/>

  </Routes>

  </BrowserRouter>
  )
}