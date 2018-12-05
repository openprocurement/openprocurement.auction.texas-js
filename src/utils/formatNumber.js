// format all price number to currency format and take away '$' sign
const formatNumber = number => 
  ( (new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'USD' }).format(number)).replace('$','') || " " )
export default formatNumber