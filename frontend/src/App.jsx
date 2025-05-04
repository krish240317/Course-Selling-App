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
import Dashboard from './pages/Dashboard'
import UploadContent from './pages/UploadContent'
import AppWrapper from './utils/AppWrapper'
import VideoDetails from './pages/VideoDetails'
const App = () => {
  return (
    <>
      <Provider store={Store}>


        <BrowserRouter>
          <AppWrapper>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Protected authentication={false}><Signup /></Protected>} />
              <Route path="/login" element={<Protected authentication={false}><Login /></Protected>} />
              <Route path="/dashboard" element={<Protected authentication><Dashboard /></Protected>} />
              <Route path="/addcontent" element={<Protected authentication><AddContent /></Protected>} />
              <Route path="/uploadvideo" element={<Protected authentication><UploadContent /></Protected>} />
              <Route path="/video/:id" element={<Protected authentication><VideoDetails /></Protected>} /> {/* New Route */}
            </Routes>
            <Footer />
          </AppWrapper>
        </BrowserRouter>

      </Provider>
    </>
  )
}

export default App
