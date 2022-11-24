import React, { useEffect, useState } from 'react'
import { getcurrentMonth, getcurrentYear } from '../../services/getDate'

import "./calendarModal.css"

import Homelogo from "../../home.png"

export default function CalendarModal() {

  const month = getcurrentMonth()
  const year = getcurrentYear()

  const [currentDay, setCurrentDay] = useState("")
  const [currentMonth, setCurrentMonth] = useState("")
  const [currentYear, setCurrentYear] = useState("")

  const [currentDate, setCurrentDate] = useState("")

  useEffect(()=>{
    setCurrentMonth(month)
    setCurrentYear(year)
  },[])

  {/* 

    Recuperer l'infos sur le jour du premier mois

  */}

  return (
    <div className='calendarModal'>
      <div className='calendarModal__nav'>
        <span className='calendarModal__nav--nav calendarModal__nav--prev'></span>

        <div className='calendarModal__nav--reset'>
          <img src={Homelogo} alt="bouton de reinitialisation du calendrier"/>
        </div>

        <select className='calendarModal__nav--month'>
          <option defaultValue={currentMonth}>{currentMonth}</option>
        </select>

        <select className='calendarModal__nav--year'>
          <option defaultValue={currentYear}>{currentYear}</option>
        </select>

        <span className='calendarModal__nav--nav calendarModal__nav--next'></span>
      </div>

      <table className='calendarModal__table'>
        <thead className='calendarModal__table-head'>
          <tr>
            <th data-day="Sun">Sun</th>
            <th data-day="Mon">Mon</th>
            <th data-day="Tue">Tue</th>
            <th data-day="Wed">Wed</th>
            <th data-day="Thu">Thu</th>
            <th data-day="Fri">Fri</th>
            <th data-day="Sat">Sat</th>
          </tr>
        </thead>

        <tbody className='calendarModal__table-body'>
        </tbody>
      </table>
    </div>
  )
  
}
