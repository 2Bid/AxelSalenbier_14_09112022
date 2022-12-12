function getFirstDayMonth(){
    const date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getLastDayMonth(){
    const date = new Date()
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function getCurrentDay(){
    return new Date().getDate()
}

const getNumberDaysMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
}

const getAllMonth = () => {
    const allMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return allMonth
}

// const getCurrentMonth = () =>{
//     const monthWord = ["January","February","March","April","May","June","July","August","September","October","November","December"];
//     const monthLetter = new Date()
//     return monthWord[monthLetter.getMonth()]
// }

const getCurrentIndexMonth = () => {
    const date = new Date()
    const currentIndexMonth = date.getMonth()
    return currentIndexMonth
}

const getCurrentYear = () => {
    return new Date().getFullYear()
}

export {getFirstDayMonth, getLastDayMonth, getCurrentDay, getNumberDaysMonth, getAllMonth, getCurrentIndexMonth, getCurrentYear}