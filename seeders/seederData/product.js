const colors = [
  { "chip": "11151c", "name": "Rich Black FOGRA 29", "abbreviation": "RBF" },
  { "chip": "212d40", "name": "Prussian Blue", "abbreviation": "PB" },
  { "chip": "364156", "name": "Charcoal", "abbreviation": "C" },
  { "chip": "7d4e57", "name": "Tuscan Red", "abbreviation": "TR" },
  { "chip": "d66853", "name": "Copper Red", "abbreviation": "CR" },
  { "chip": "daddd8", "name": "Timberwolf", "abbreviation": "T" },
  { "chip": "c7d59f", "name": "Tea Green", "abbreviation": "TG" },
  { "chip": "b7ce63", "name": "June Bud", "abbreviation": "JB" },
  { "chip": "8fb339", "name": "Apple Green", "abbreviation": "AG" },
  { "chip": "4b5842", "name": "Rifle Green", "abbreviation": "RG" },
  { "chip": "133c55", "name": "Indigo Dye", "abbreviation": "ID" },
  { "chip": "386fa4", "name": "Honolulu Blue", "abbreviation": "HB" },
  { "chip": "59a5d8", "name": "Carolina Blue", "abbreviation": "CB" },
  { "chip": "84d2f6", "name": "Baby Blue", "abbreviation": "BB" },
  { "chip": "91e5f6", "name": "Sky Blue Crayola", "abbreviation": "SBC" },
  { "chip": "880d1e", "name": "Burgundy", "abbreviation": "B" },
  { "chip": "dd2d4a", "name": "Rusty Red", "abbreviation": "RR" },
  { "chip": "f26a8d", "name": "Ultra Red", "abbreviation": "UR" },
  { "chip": "f49cbb", "name": "Amaranth Pink", "abbreviation": "AP" },
  { "chip": "cbeef3", "name": "Light Cyan", "abbreviation": "LC" }
]


const productTypes = ["HP", "EP", "AC"] // 耳罩式、入耳式、週邊

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

const rawProductList = []

for (let i = 0; i < 2; i++) {
  const type = productTypes[i]
  let name = '';
  switch (type) {
    case "HP":
      name = "Headphone";
      break;
    case "EP":
      name = "Earphone";
      break;
    case "AC":
      name = "Accessory";
      break;
    default: break;
  }

  for (let i = 0; i < 20; i++) {
    let price = Math.ceil(Math.random() * 100) * 100;
    let total = 100;
    let serialNum = (i + 1) < 10 ? "0" + (i + 1).toString() : (i + 1).toString();
    let colorSet = Math.floor(Math.random() * 3)

    if (colorSet > 0) {

      const temp = [] // 檢查有沒有重複的顏色
      for (let i = 0; i < colorSet; i++) {
        let sell = Math.floor(Math.random() * 10) * 10;
        let storage = total - sell;
        let color = colors[Math.floor(Math.random() * colors.length)]
        if (temp.indexOf(color) > 0) {
          i--;
          continue;
        }
        temp.push(color);
        rawProductList.push({
          name: `${name}-${serialNum}`,
          model: `${type}-${serialNum}${color.abbreviation}`,
          colorChip: color.chip,
          price,
          storage,
          sell,
          createdAt: new randomDate(new Date(2020, 0, 1), new Date(), 0, 24),
          updatedAt: new Date()
        })
      }
    } else {
      let sell = Math.floor(Math.random() * 10) * 10;
      let storage = total - sell;
      rawProductList.push({
        name: `${name}-${serialNum}`,
        model: `${type}-${serialNum}`,
        colorChip: null,
        price,
        storage,
        sell,
        createdAt: new randomDate(new Date(2020, 0, 1), new Date(), 0, 24),
        updatedAt: new Date()
      })
    }
  }
}

// console.log(rawProductList);

module.exports = { rawProductList };