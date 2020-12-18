const colors = [
  { "colorChip": "11151c", "name": "Rich Black FOGRA 29", "abbreviation": "RBF" },
  { "colorChip": "212d40", "name": "Prussian Blue", "abbreviation": "PB" },
  { "colorChip": "364156", "name": "Charcoal", "abbreviation": "C" },
  { "colorChip": "7d4e57", "name": "Tuscan Red", "abbreviation": "TR" },
  { "colorChip": "d66853", "name": "Copper Red", "abbreviation": "CR" },
  { "colorChip": "daddd8", "name": "Timberwolf", "abbreviation": "T" },
  { "colorChip": "c7d59f", "name": "Tea Green", "abbreviation": "TG" },
  { "colorChip": "b7ce63", "name": "June Bud", "abbreviation": "JB" },
  { "colorChip": "8fb339", "name": "Apple Green", "abbreviation": "AG" },
  { "colorChip": "4b5842", "name": "Rifle Green", "abbreviation": "RG" },
  { "colorChip": "133c55", "name": "Indigo Dye", "abbreviation": "ID" },
  { "colorChip": "386fa4", "name": "Honolulu Blue", "abbreviation": "HB" },
  { "colorChip": "59a5d8", "name": "Carolina Blue", "abbreviation": "CB" },
  { "colorChip": "84d2f6", "name": "Baby Blue", "abbreviation": "BB" },
  { "colorChip": "91e5f6", "name": "Sky Blue Crayola", "abbreviation": "SBC" },
  { "colorChip": "880d1e", "name": "Burgundy", "abbreviation": "B" },
  { "colorChip": "dd2d4a", "name": "Rusty Red", "abbreviation": "RR" },
  { "colorChip": "f26a8d", "name": "Ultra Red", "abbreviation": "UR" },
  { "colorChip": "f49cbb", "name": "Amaranth Pink", "abbreviation": "AP" },
  { "colorChip": "cbeef3", "name": "Light Cyan", "abbreviation": "LC" }
]

function getRandomNum() {
  return Math.ceil(Math.random() * 5)
}

function getRandomPrice() {
  return Math.ceil(Math.random() * 100) * 100
}

function getRandomColor(colors) {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

function getRandomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

const productTypes = ["HP", "EP", "SP", "AC"] // 耳罩式、入耳式、音響、週邊

const rawProductList = []
const productList = []
const modelList = []

let productId = 1

// 為每個顏色產生商品
for (let i = 0; i < 4; i++) {
  const type = productTypes[i]
  let name = '';
  switch (type) {
    case "HP":
      name = "Headphone";
      break;
    case "EP":
      name = "Earphone";
      break;
    case "SP":
      name = "Speaker";
      break;
    case "AC":
      name = "Accessory";
      break;
    default: break;
  }

  // 產生商品
  for (let i = 0; i < getRandomNum(); i++) {
    let serialNum = (i + 1) < 10 ? "0" + (i + 1).toString() : (i + 1).toString();

    const productName = name + "-" + serialNum
    const price = getRandomPrice()

    productList.push({
      productName,
      price,
      createdAt: new getRandomDate(new Date(2020, 0, 1), new Date(), 0, 24),
      updatedAt: new Date()
    })
    
    
    let models = []

    // 產生型號
    const modelNum = getRandomNum()
    const colorTemp = [] // 用於記錄已經產生的顏色
    for (let i = 0; i < modelNum; i++) {
      const color = getRandomColor(colors)
      if (colorTemp.indexOf(color.abbreviation) >= 0) {
        i++;
        continue;
      }
      const { colorChip, abbreviation } = color

      const modelName = productName + abbreviation
      const sell = getRandomNum() * 10
      const storage = 100 - sell

      const model = {
        modelName,
        colorChip,
        storage,
        sell,
        productId
      }
      models.push(model)
      modelList.push(model)
    }
    
    productId++
    rawProductList.push({
      productName,
      price,
      models
    })
  }
}


// for (let i = 0; i < 2; i++) {
//   const type = productTypes[i]
//   let name = '';
//   switch (type) {
//     case "HP":
//       name = "Headphone";
//       break;
//     case "EP":
//       name = "Earphone";
//       break;
//     case "SP":
//       name = "Speaker";
//       break;
//     case "AC":
//       name = "Accessory";
//       break;
//     default: break;
//   }

//   for (let i = 0; i < 20; i++) {
//     let price = Math.ceil(Math.random() * 100) * 100;
//     let total = 100;
//     let serialNum = (i + 1) < 10 ? "0" + (i + 1).toString() : (i + 1).toString();
//     let colorSet = Math.floor(Math.random() * 3)

//     if (colorSet > 0) {

//       const temp = [] // 檢查有沒有重複的顏色
//       for (let i = 0; i < colorSet; i++) {
//         let sell = Math.floor(Math.random() * 10) * 10;
//         let storage = total - sell;
//         let color = colors[Math.floor(Math.random() * colors.length)]
//         if (temp.indexOf(color) > 0) {
//           i--;
//           continue;
//         }
//         temp.push(color);
//         rawProductList.push({
//           name: `${name}-${serialNum}`,
//           model: `${type}-${serialNum}${color.abbreviation}`,
//           colorChip: color.chip,
//           price,
//           storage,
//           sell,
//           createdAt: new randomDate(new Date(2020, 0, 1), new Date(), 0, 24),
//           updatedAt: new Date()
//         })
//       }
//     } else {
//       let sell = Math.floor(Math.random() * 10) * 10;
//       let storage = total - sell;
//       rawProductList.push({
//         name: `${name}-${serialNum}`,
//         model: `${type}-${serialNum}`,
//         colorChip: null,
//         price,
//         storage,
//         sell,
//         createdAt: new randomDate(new Date(2020, 0, 1), new Date(), 0, 24),
//         updatedAt: new Date()
//       })
//     }
//   }
// }

// console.log(rawProductList);
// console.log(productList);
// console.log(modelList);

module.exports = { rawProductList, productList, modelList };