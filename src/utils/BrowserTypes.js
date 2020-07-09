// only invoke after Component Mounted!!

export const FacebookBrowser = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf("FB") > -1 ? true : false
}

export const LineBrowser = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf("Line") > -1 ? true : false
}