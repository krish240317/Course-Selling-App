import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import Button from '../Button'
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {

        dispatch(logout())
    }

    return (
        <Button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >Logout</Button>
    )
}

export default LogoutBtn