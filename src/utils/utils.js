// logic for getting Cookie by name from browser
const getCookieByName =  (cname) => {
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
};

// logic for deleting Cookie by name from browser
const deleteCookie = (cname) => {
  let d = new Date(); //Create an date object
  d.setTime(d.getTime() - (1000*60*60*24)); //Set the time to the past. 1000 milliseonds = 1 second
  let expires = "expires=" + d.toGMTString(); //Compose the expirartion date
  window.document.cookie = cname+"="+"; "+expires;//Set the cookie with name and the expiration date
};

// logic for setting Cookie in browser
const setCookie = (cname, cvalue, exdays) =>{
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export { getCookieByName, deleteCookie, setCookie }
