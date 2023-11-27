// src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import BookForm from './components/BookForm';
import AuthorForm from './components/AuthorForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-light bg-light ">
          <div className="container-fluid">
            {/* Library Management System */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/books">
                    Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/authors">
                    Authors
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookForm />} />
          <Route path="/authors" element={<AuthorForm />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);