import React, { useEffect, useState } from 'react'
import { getAllMonth, getArrayDaysMonth, getCurrentDay, getCurrentIndexMonth, getCurrentYear, getFirstDayMonth, getLastDayMonth, getNumberDaysMonth } from '../../services/getDate'

import "./calendarModal.css"

import Homelogo from "../../home.png"

export default function CalendarModal(props) {

  //
  // STATE
  //

  const day = getCurrentDay()
  const year = getCurrentYear()
  const [currentYear, setCurrentYear] = useState(year)

  const allMonth = getAllMonth()
  const currentIndexMonth = getCurrentIndexMonth() + 1
  const [indexMonth, setIndexMonth] = useState(currentIndexMonth)

  const [currentDay, setCurrentDay] = useState(day+'-'+indexMonth)
  const [selectedDay, setSelectedDay] = useState(day + '-' + indexMonth)

  const [allDaysMonth, setAllDaysMonth] = useState([])
  const allDays = getNumberDaysMonth(currentYear, indexMonth)
  const [currentAllDays, setCurrentAllDays] = useState(allDays)

  const firstDayMonth = getFirstDayMonth(currentYear, indexMonth).getDay()
  const lastDayMonth = getLastDayMonth(currentYear, indexMonth).getDay()
  const [dayFirstDayMonth, setDayFirstDayMonth] = useState(firstDayMonth)
  const [dayLastDayMonth, setDayLastDayMonth] = useState(lastDayMonth)

  // MOIS PRECEDENT ET SUIVANT
  const allPrevDays = getNumberDaysMonth(currentYear, indexMonth)
  const [prevDaysMonth, setPrevDaysMonth] = useState(allPrevDays)
  const [nextDaysMonth, setNextDaysMonth] = useState(7 - dayLastDayMonth - 1)
  const [arrayNextDays, setArrayNextDays] = useState([])

  //
  // FONCTIONS & USEEFFECT
  //

  // update array day of the month
  useEffect(()=>{
    setArrayNextDays([])
    setCurrentAllDays(getNumberDaysMonth(currentYear, indexMonth))
    setDayFirstDayMonth(getFirstDayMonth(currentYear, indexMonth).getDay())
    setDayLastDayMonth(getLastDayMonth(currentYear, indexMonth).getDay())
    setAllDaysMonth(getArrayDaysMonth(currentYear, indexMonth))
  },[indexMonth])

  // update array day of the next month
  useEffect(()=>{
    console.log(arrayNextDays)
    for (let i = 1; i < nextDaysMonth + 1; i++) {
      setArrayNextDays([...arrayNextDays, arrayNextDays.push(i)])
    }
  },[nextDaysMonth])

  useEffect(()=>{
    setNextDaysMonth(7 - dayLastDayMonth - 1)
  },[dayLastDayMonth])

  function goToPrevMonth() {
    if(indexMonth === 1) setIndexMonth(12) && setCurrentYear(currentYear - 1); else setIndexMonth(indexMonth - 1)
  }

  function goToNextMonth() {
    if(indexMonth === 12) setIndexMonth(1) && setCurrentYear(currentYear + 1); else setIndexMonth(indexMonth + 1)
  }

  function selectDate(e,day, indexMonth, currentYear) {
    concatSelectedDay(day, indexMonth)
    props.onSelect(day+'/'+indexMonth+'/'+currentYear)
    props.close()
  } 

  function concatSelectedDay(day,month){
    setSelectedDay(day + '-' + month)
  }

  return (
    <div className='calendarModal'>
      <div className='calendarModal__nav'>
        <span className='calendarModal__nav--nav calendarModal__nav--prev' onClick={()=>goToPrevMonth()}></span>

        <div className='calendarModal__nav--reset'>
          <img src={Homelogo} alt="bouton de reinitialisation du calendrier"/>
        </div>

        <select className='calendarModal__nav--month'>
          {allMonth.map((month, index)=>{
            return (
              <option key={index} value={month} selected={index === indexMonth - 1}>{month}</option>
            )
          })}
        </select>

        <select className='calendarModal__nav--year'>
          <option defaultValue={currentYear}>{currentYear}</option>
        </select>

        <span className='calendarModal__nav--nav calendarModal__nav--next' onClick={()=>goToNextMonth()}></span>
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
              allDaysMonth.slice(0,dayFirstDayMonth).map((day, index)=>{
                return <td key={index} 
                className={`
                  calendarModal__day--prev
                  calendarModal__day
                  ${(prevDaysMonth - dayFirstDayMonth + index + 1) +'-'+(indexMonth - 1) === selectedDay ? 'selected' : ''}
                `} 
                data-month={indexMonth - 1} 
                onClick={(e)=>{
                  selectDate(e, (prevDaysMonth - dayFirstDayMonth + index + 1), indexMonth - 1, currentYear)
                }}>{prevDaysMonth - dayFirstDayMonth + index + 1}</td>
              })
            }
            {
              allDaysMonth.slice(dayFirstDayMonth,7).map((day, index)=>{
                return <td key={index} 
                className={`
                  calendarModal__day
                  ${allDaysMonth[index]}
                  ${allDaysMonth[index] +'-'+indexMonth === selectedDay ? 'selected' : ''}
                  ${allDaysMonth[index] +'-'+indexMonth === currentDay ? 'acive' : ''}
                `} 
                data-month={indexMonth} 
                onClick={(e)=>{
                  selectDate(e, allDaysMonth[index], indexMonth, currentYear)
                }}>{allDaysMonth[index]}</td>
              })
            }
          </tr>
          <tr className='calendarModal__week-2 calendarModal__week'>
            {
              allDaysMonth.slice(7 - dayFirstDayMonth, 14 - dayFirstDayMonth).map((day, index)=>{
                return <td key={index} 
                className={`
                  calendarModal__day
                  ${day}
                  ${day +'-'+indexMonth === selectedDay ? 'selected' : ''}
                  ${day +'-'+indexMonth === currentDay ? 'acive' : ''}
                `} 
                data-month={indexMonth}
                  onClick={(e)=>{
                  selectDate(e, day, indexMonth, currentYear)
                }}
                >{day}</td>
              })
            } 
          </tr>
          <tr className='calendarModal__week-3 calendarModal__week'>
            {
              allDaysMonth.slice(14 - dayFirstDayMonth, 21 - dayFirstDayMonth).map((day, index)=>{
                return <td key={index} 
                className={`
                  calendarModal__day
                  ${day}
                  ${day +'-'+indexMonth === selectedDay ? 'selected' : ''}
                  ${day +'-'+indexMonth === currentDay ? 'acive' : ''}
                `} 
                data-month={indexMonth} 
                onClick={(e)=>{
                  selectDate(e, day, indexMonth, currentYear)
                }}
                >{day}</td>
              })
            }
          </tr>
          <tr className='calendarModal__week-4 calendarModal__week'>
            {
              allDaysMonth.slice(21 - dayFirstDayMonth, 28 - dayFirstDayMonth).map((day, index)=>{
                return <td key={index} 
                className={`
                  calendarModal__day
                  ${day}
                  ${day +'-'+indexMonth === selectedDay ? 'selected' : ''}
                  ${day +'-'+indexMonth === currentDay ? 'active' : ''}
                `} 
                data-month={indexMonth} 
                onClick={(e)=>{
                  selectDate(e, day, indexMonth, currentYear)
                }}
                >{day}</td>
              })
            }
          </tr>
          <tr className='calendarModal__week-5 calendarModal__week'>
            {
              allDaysMonth.slice(28 - dayFirstDayMonth, 28 - dayFirstDayMonth + 7).map((day, index)=>{
                return <td key={index} 
                className={`
                  calendarModal__day
                  ${day}
                  ${day +'-'+indexMonth === selectedDay ? 'selected' : ''}
                  ${day +'-'+indexMonth === currentDay ? 'active' : ''}
                `} 
                data-month={indexMonth} 
                onClick={(e)=>{
                  selectDate(e, day, indexMonth, currentYear)
                }}
                >{day}</td>
              })
            }
            {
              allDaysMonth.slice(28 - dayFirstDayMonth, 28 - dayFirstDayMonth + 7).length === 7 ?
                <></>
              :
                arrayNextDays.map((day, index)=>{
                  return <td key={index} 
                  className={`
                    calendarModal__day--next
                    calendarModal__day
                    ${index + 1}
                    ${(index + 1) +'-'+ (indexMonth + 1) === selectedDay ? 'selected' : ''}
                  `} 
                  data-month={indexMonth + 1} 
                  onClick={(e)=>{
                    selectDate(e, index + 1, indexMonth + 1, currentYear)
                  }}
                  >{index + 1}</td>
                })
            }
          </tr>
          {
            (currentAllDays + dayFirstDayMonth + (7 - dayLastDayMonth - 1)) > 35 ?
            <tr className='calendarModal__week-6 calendarModal__week'>
            {
              allDaysMonth.slice(28 - dayFirstDayMonth + 7).map((day, index)=>{
                return <td key={index} 
                className={`
                  calendarModal__day
                  ${day}
                  ${day +'-'+indexMonth === selectedDay ? 'selected' : ''} 
                  ${day +'-'+indexMonth === currentDay ? 'active' : ''}
                `}
                data-month={indexMonth} 
                onClick={(e)=>{
                  selectDate(e, day, indexMonth, currentYear)
                }}
                >{day}</td>
              })
            }
            {
              arrayNextDays.map((day, index)=>{
                return <td key={index} 
                className={`
                  calendarModal__day--next
                  calendarModal__day
                  ${index + 1} 
                  ${(index + 1) +'-'+(indexMonth + 1) === selectedDay ? 'selected' : ''}
                `} 
                data-month={indexMonth + 1} 
                onClick={(e)=>{
                  selectDate(e, index + 1, indexMonth + 1, currentYear)
                }}
                >{index + 1}</td>
              })
            }
          </tr>
            :
            <></>
          }
        </tbody>
      </table>
    </div>
  )
  
}