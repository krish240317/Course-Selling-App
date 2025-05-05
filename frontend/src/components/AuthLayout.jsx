import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)

  React.useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login")
    } else if (!authentication && authStatus !== authentication) {
      navigate("/")
    }
  }, [authStatus, navigate, authentication])


  // Render children immediately if authentication matches
  if (authentication && authStatus !== authentication) {

    return <h1>Loading...</h1>
  }
  return <>{children}</>
}