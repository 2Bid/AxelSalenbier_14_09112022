function getcurrentDate(){
    const day = new Date().getDate()
    console.log(day)
}

const getcurrentMonth = () =>{
    const monthWord = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthLetter = new Date()
    return monthWord[monthLetter.getMonth()]
}

const getcurrentYear = () => {
    return new Date().getFullYear()
}

export {getcurrentMonth, getcurrentYear}