import React from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Container, Logo,LogoutBtn } from "../index.js"
import "../../css/Header.css"
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap" rel="stylesheet"></link>
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Addcontent", slug: "/addcontent", active: authStatus },
    { name: "Dashboard", slug: "/dashboard", active: authStatus },
  ]

  return (
    <header className="header">
      <Container>
        <nav className="nav">
          <div className="logo-container">
            <Link to="/" className="logo-container">
              <span className="logo-text">LMS</span>
              <Logo size={31} />
            </Link>
          </div>
          <ul className="nav-items">
            {navItems.map(item =>
              item.active && (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)} className="nav-button">
                    {item.name}
                  </button>
                </li>
              )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
