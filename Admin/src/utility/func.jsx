export const generateAbbreviation = (text) => {
  // Split the text into words
  const words = text.split(' ');

  // Get the first letter of each word and join them
  return words.map(word => word.charAt(0)).join('');
}

export const checkingAuth = () => {
  // let token = reactLocalStorage.get("token");
  let token = localStorage.getItem("token");
  console.log("TOKEn", token);
  console.log('fucking token',token)
  if (token) {
    return token;
  }
  return false;
}