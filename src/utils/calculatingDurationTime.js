const calculatingDurationTime =  (startTime,endTime) =>{
  // finding the interval between 2 points of date
  return (Math.trunc(Date.parse(endTime)) - Math.trunc(Date.parse(startTime))) / 1000
}
export default calculatingDurationTime