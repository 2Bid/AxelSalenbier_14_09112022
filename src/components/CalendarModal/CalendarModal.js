import React, { useEffect, useState } from 'react'
import { getAllMonth, getCurrentDay, getCurrentIndexMonth, getCurrentYear, getFirstDayMonth, getLastDayMonth, getNumberDaysMonth } from '../../services/getDate'

import "./calendarModal.css"

import Homelogo from "../../home.png"

export default function CalendarModal() {

  //
  // STATE
  //

  const day = getCurrentDay()
  const year = getCurrentYear()

  const [currentDay, setCurrentDay] = useState(day)
  const [currentYear, setCurrentYear] = useState(year)

  const allMonth = getAllMonth()
  const currentIndexMonth = getCurrentIndexMonth()
  const [indexMonth, setIndexMonth] = useState(currentIndexMonth)

  const [allDaysMonth, setAllDaysMonth] = useState([])
  const allDays = getNumberDaysMonth(currentIndexMonth, currentYear) + 1

  const firstDayMonth = getFirstDayMonth().getDay()
  const lastDayMonth = getLastDayMonth().getDay()

  const [dayFirstDayMonth, setDayFirstDayMonth] = useState(firstDayMonth)
  const [dayLastDayMonth, setDayLastDayMonth] = useState(lastDayMonth)

  // MOIS PRECEDENT ET SUIVANT
  const [prevDaysMonth, setPrevDaysMonth] = useState([])
  const [nextDaysMonth, setNextDaysMonth] = useState([])


  //
  // FONCTIONS & USEEFFECT
  //

  // mise a jour du tableau comportant les jours du mois actuel
  useEffect(()=>{
    for (let i = 1; i < allDays + 1; i++) {
      setAllDaysMonth([...allDaysMonth, allDaysMonth.push(i)])
    }
  },[indexMonth])

  useEffect(()=>{
    for (let i = 0; i < dayFirstDayMonth; i++) {
      
    }
  },[dayFirstDayMonth])

  useEffect(()=>{

  },[dayLastDayMonth])


  return (
    <div className='calendarModal'>
      <div className='calendarModal__nav'>
        <span className='calendarModal__nav--nav calendarModal__nav--prev'></span>

        <div className='calendarModal__nav--reset'>
          <img src={Homelogo} alt="bouton de reinitialisation du calendrier"/>
        </div>

        <select className='calendarModal__nav--month'>
          {allMonth.map((month, index)=>{
            return (
              <option key={index} value={month} selected={index === currentIndexMonth}>{month}</option>
            )
          })}
        </select>

        <select className='calendarModal__nav--year'>
          <option defaultValue={currentYear}>{currentYear}</option>
        </select>

        <span className='calendarModal__nav--nav calendarModal__nav--next'></span>
      </div>

      <table className='calendarModal__table'>
        <thead className='calendarModal__table-head'>
          <tr>
            <th className='calendarModal__day--head' data-day="Sun">Sun</th>
            <th className='calendarModal__day--head' data-day="Mon">Mon</th>
            <th className='calendarModal__day--head' data-day="Tue">Tue</th>
            <th className='calendarModal__day--head' data-day="Wed">Wed</th>
            <th className='calendarModal__day--head' data-day="Thu">Thu</th>
            <th className='calendarModal__day--head' data-day="Fri">Fri</th>
            <th className='calendarModal__day--head' data-day="Sat">Sat</th>
          </tr>
        </thead>

        <tbody className='calendarModal__table-body'>
          <tr className='calendarModal__week-1 calendarModal__week'>
            {
              allDaysMonth.slice(0,firstDayMonth).map((day)=>{
                return <td key={day} className={`calendarModal__day--prev calendarModal__day ${day}`}>0</td>
              })
            }
            {
              allDaysMonth.slice(firstDayMonth,7).map((day, index)=>{
                return <td key={day} className={`calendarModal__day ${day} ${day === currentDay ? 'active' : ''}`}>{allDaysMonth[index]}</td>
              })
            }
          </tr>
          <tr className='calendarModal__week-2 calendarModal__week'>
            {
              allDaysMonth.slice(7 - firstDayMonth, 14 - firstDayMonth).map((day)=>{
                return <td key={day} className={`calendarModal__day ${day} ${day === currentDay ? 'active' : ''}`}>{day}</td>
              })
            }
          </tr>
          <tr className='calendarModal__week-3 calendarModal__week'>
            {
              allDaysMonth.slice(14 - firstDayMonth, 21 - firstDayMonth).map((day)=>{
                return <td key={day} className={`calendarModal__day ${day} ${day === currentDay ? 'active' : ''}`}>{day}</td>
              })
            }
          </tr>
          <tr className='calendarModal__week-4 calendarModal__week'>
            {
              allDaysMonth.slice(21 - firstDayMonth, 28 - firstDayMonth).map((day)=>{
                return <td key={day} className={`calendarModal__day ${day} ${day === currentDay ? 'active' : ''}`}>{day}</td>
              })
            }
          </tr>
          <tr className='calendarModal__week-5 calendarModal__week'>
            {
              allDaysMonth.slice(28 - firstDayMonth, allDaysMonth.length).map((day)=>{
                return <td key={day} className={`calendarModal__day ${day} ${day === currentDay ? 'active' : ''}`}>{day}</td>
              })
            }
          </tr>
        </tbody>
      </table>
    </div>
  )
  
}
