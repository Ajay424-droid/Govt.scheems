import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Sidebar from "./pages/Sidebar";
import AboutUs from "./components/AboutUs";

import HeroSection from "./pages/HeroSection";
import Card from "./pages/Card";
import MVofUs from "./pages/MVofUs";

import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import AddScheme from "./pages/AddScheme";
import SchemeDetail from "./pages/SchemeDetail";
import ManageSchemes from "./pages/ManageSchemes";
import EditScheme from "./pages/EditScheme";

import Register from './components/Register';
import Login from './components/Login';
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Header />
      <div className="mb-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hero" element={<HeroSection />} />
          <Route path="/card" element={<Card />} />
          <Route path="/mvofus" element={<MVofUs />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Admin routes */}
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/adminpage" element={<AdminPage />} />

          {/* Scheme routes */}
          <Route path="/add-scheme" element={<AddScheme />} />
          <Route path="/manage-schemes" element={<ManageSchemes />} />
           <Route path="/edit-scheme/:id" element={<EditScheme />} />
          <Route path="/scheme/:id" element={<SchemeDetail />} />

          {/* User auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
