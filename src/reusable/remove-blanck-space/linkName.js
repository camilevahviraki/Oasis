const linkName = (string) => {
  const stringArr = string.split('');
  let newStringArr = [];

  stringArr.forEach((elmnt) => {
    if(elmnt === ' '){
        newStringArr = [...newStringArr, '-'];
    }else {
        newStringArr = [...newStringArr, elmnt];
    }
  });
  return newStringArr.join('');
}

export default linkName;