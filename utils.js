function getRandomMerchantTradeNo() {
  let result = '';
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      result += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    } else {
      result += String.fromCharCode(48 + Math.floor(Math.random() * 10));
    }
  }
  return result;
};

function getDate() {
  const date = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' })
  const time = new Date().toLocaleTimeString('zh-TW', { hour12: false, timeZone: 'Asia/Taipei' })

  let [day, month, year] = date.split('/')
  month = Number(month) > 10 ? month : "0" + month
  day = Number(day) > 10 ? day : "0" + day

  const dateString = `${year}/${month}/${day} ${time}`
  return dateString
}

module.exports = { getDate, getRandomMerchantTradeNo }