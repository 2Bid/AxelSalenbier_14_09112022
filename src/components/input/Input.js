import React, { useState } from 'react'
import CalendarModal from '../CalendarModal/CalendarModal'

import "./input.css"

export default function Input() {

  const [isOpen,setIsOpen] = useState(false)
  
  return (
    <div className='App'
      onClick={(e)=>{
        if(e.target.className === "App") setIsOpen(false)
      }}
    >
      <div className="input__container" onClick={()=>{setIsOpen(true)}}>
        <input />
        {isOpen && <CalendarModal/>}
      </div>

    </div>
  )
}
