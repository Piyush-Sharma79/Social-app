import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import {Main} from './pages/main/main.tsx';
import {Login} from './pages/login.tsx';
import {Navbar} from './component/navbar.tsx';
import {CreatePost} from './pages/create-post/createpost.tsx';
function App() {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createpost' element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App