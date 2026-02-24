
// this function convert email to string and to lowercase and check with regex
 function validateEmail(email) {
  return String(email).toLowerCase().match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
  }

  // this function check length is correct or not for password or usernames
  function validateLength(text, min,max) {
    if(text.length > max || text.length < min) return false
    else return true;
  }

  export {
    validateEmail,
    validateLength
  }