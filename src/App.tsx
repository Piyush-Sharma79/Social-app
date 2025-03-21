import './App.css'; // Keeping this, assuming it’s for additional styles
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/main.tsx';
import { Login } from './pages/login.tsx';
import { Navbar } from './component/navbar.tsx';
import { CreatePost } from './pages/create-post/createpost.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Router>
        {/* Navbar stays sticky at the top */}
        <header className="sticky top-0 z-10">
          <Navbar />
        </header>
        {/* Main content area */}
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
          </Routes>
        </main>
        {/* Optional footer */}
        <footer className="bg-white text-gray-600 text-center p-4 shadow-inner">
          <p>© 2025 Social App</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;