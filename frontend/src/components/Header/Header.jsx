import React from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Container} from "../index.js"
import "../../css/Header.css"

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ]

  return (
    <header className="header">
    <Container>
      <nav className="nav">
        <div className="logo-container">
          <Link to='/'>
            {/* <Logo width='70px' /> */}
          </Link>
        </div>
        <ul className="nav-items">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="nav-button"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              {/* <LogoutBtn /> */}
            </li>
          )}
        </ul>
      </nav>
    </Container>
  </header>
  )
}

export default Header
