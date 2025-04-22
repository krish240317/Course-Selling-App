import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import AppLayout from './components/AppLayout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Store from "./store/store"
import { Provider } from 'react-redux'
const App = () => {
  return (
    <>
      <Provider store={Store}>


        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Addcontent" element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        
      </Provider>
    </>
  )
}

export default App
