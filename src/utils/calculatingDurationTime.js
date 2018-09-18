const calculatingDurationTime =  (startTime,endTime) =>{
  return (Math.trunc(Date.parse(endTime)) - Math.trunc(Date.parse(startTime))) / 1000
}
export default calculatingDurationTime