import  UAParser from 'ua-parser-js';

const UnsupportedBrowser = () => {
  const parser = new UAParser();
  const Browser = parser.getBrowser();
  if (Browser.name === "Opera") {
    if (parseFloat(Browser.version) < 12.10) {
      return true
    }
  }
  if (Browser.name === "IE") {
    if (parseFloat(Browser.major) < 11) {
      return true
    }
  }
  if (Browser.name === "Opera Mini") {
    return true
  }
  return false
}

export default UnsupportedBrowser 