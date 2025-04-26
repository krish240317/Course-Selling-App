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
import AddContent from './pages/AddContent'
const App = () => {
  return (
    <>
      <Provider store={Store}>


        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Protected authentication={false}><Home /></Protected>} />
            <Route path="/signup" element={<Protected authentication={false}><Signup /></Protected>} />
            <Route path="/login" element={<Protected authentication={false}><Login /></Protected>} />
            <Route path="/addcontent" element={<Protected authentication><AddContent /></Protected>} />
          </Routes>
          <Footer />
        </BrowserRouter>

      </Provider>
    </>
  )
}

export default App
