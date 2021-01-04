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
  return Math.ceil(Math.random() * 10) * 500
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
  let typeInfo = {};
  switch (type) {
    case "HP":
      typeInfo = {
        typeName: "Headphone",
        typeNum: 1
      };
      break;
    case "EP":
      typeInfo = {
        typeName: "Earphone",
        typeNum: 2
      };
      break;
    case "SP":
      typeInfo = {
        typeName: "Speaker",
        typeNum: 3
      };
      break;
    case "AC":
      typeInfo = {
        typeName: "Accessory",
        typeNum: 4
      };
      break;
    default: break;
  }

  // 產生商品
  for (let i = 0; i < getRandomNum(); i++) {
    let serialNum = (i + 1) < 10 ? "0" + (i + 1).toString() : (i + 1).toString();

    const productName = typeInfo.typeName + "-" + serialNum
    const price = getRandomPrice()

    const createdAt = new getRandomDate(new Date(2020, 0, 1), new Date(), 0, 24)
    const updatedAt = new Date()

    productList.push({
      productName,
      price,
      type: typeInfo.typeNum,
      article: "JSON string",
      isShow: 1,
      // isDeleted: 0,
      createdAt,
      updatedAt,
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
        productId,
        isShow: 1,
        // isDeleted: 0,
        createdAt,
        updatedAt
      }
      models.push(model)
      modelList.push(model)
      colorTemp.push(color.abbreviation)
    }

    productId++
    rawProductList.push({
      productName,
      price,
      models
    })
  }
}

// console.log(rawProductList);
// console.log(productList);
// console.log(modelList);

module.exports = { rawProductList, productList, modelList, getRandomDate };