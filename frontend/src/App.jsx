import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Store from "./store/store"
import { Provider } from 'react-redux'
import Protected from './components/AuthLayout'
import AddContent from './components/AddContent'
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
            <Route path="/Addcontent" element={<Protected ><AddContent/></Protected>} />
          </Routes>
          <Footer />
        </BrowserRouter>
        
      </Provider>
    </>
  )
}

export default App
