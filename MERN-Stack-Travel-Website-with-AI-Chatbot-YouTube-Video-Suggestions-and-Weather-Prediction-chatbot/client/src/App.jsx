import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./pages/components/Header";
import Profile from "./pages/Profile";
import About from "./pages/About";
import PrivateRoute from "./pages/Routes/PrivateRoute";
import AdminRoute from "./pages/Routes/AdminRoute";
import ChatInterface  from "./pages/Chatbot/ChatInterface";
import Footer from "./pages/components/Footer";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Search from "./pages/Search";
import PackageCard from "./pages/PackageCard";
import Package from "./pages/Package";
import RatingsPage from "./pages/RatingsPage";
import RatingCard from "./pages/RatingCard";
import ManagePackages from "./pages/ManagePackage";

const App = () => {
  console.log("VITE_GEMINI_API_KEY:", import.meta.env.VITE_GEMINI_API_KEY);
  return (
    <div className="mx-auto lg:container">
    <BrowserRouter>

      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/manage" element={<ManagePackages />} />
        {/* user */}
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="user" element={<Profile />} />
        </Route>
        {/* admin */}
        <Route path="/profile" element={<AdminRoute />}>
          {/* <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/update-package/:id" element={<UpdatePackage />} /> */}
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
         <Route path="/package/:id" element={<Package />} />
        <Route path="/package/ratings/:id" element={<RatingsPage />} />
        {/* checking user auth before booking */}
        {/* <Route path="/booking" element={<PrivateRoute />}>
          <Route path=":packageId" element={<Booking />} />
        </Route> */}
        <Route path="/ChatInterface" element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </div>
  );
};

export default App;