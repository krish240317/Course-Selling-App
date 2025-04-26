// filepath: c:\Users\ASUS\OneDrive\Desktop\CourseSellingApp\frontend\src\components\Logo.jsx
import React from 'react'
import { IoLogoWebComponent } from "react-icons/io5"

function Logo({ size }) { // Default size is 24 if no size is provided
  return (
    <>
      <IoLogoWebComponent style={{ height: `${size}px`, width: `${size}px` }} />
    </>
  )
}

export default Logo