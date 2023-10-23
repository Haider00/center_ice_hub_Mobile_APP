function handleCurrencyFormat(val) {
  let num = Number(val);
  if (val) {
    if (Math.abs(num) > 999999999) {
      return Math.sign(num) * (Math.abs(num) / 1000000000).toFixed(1) + 'B';
    } else if (Math.abs(num) > 999999) {
      return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) > 999) {
      return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K';
    } else {
      return Math.sign(num) * Math.abs(num);
    }
  } else {
    return val;
  }
}

export { handleCurrencyFormat };
