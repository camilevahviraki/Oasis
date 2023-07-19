const linkName = (string) => {
  let string2 = '';
  if (string) {
    string2 = string;
  }
  const stringArr = string2.split('');
  let newStringArr = [];

  stringArr.forEach((elmnt) => {
    if (elmnt === ' ') {
      newStringArr = [...newStringArr, '-'];
    } else {
      newStringArr = [...newStringArr, elmnt];
    }
  });
  return newStringArr.join('');
};

export default linkName;
