const productList = []

// function getRandomCharCode() {
//   return Math.floor(Math.random() * 26) + 65
// }

// for (let i = 0; i < 20; i++) {
//   let name = String.fromCharCode(
//     getRandomCharCode(),
//     getRandomCharCode(),
//     getRandomCharCode(),
//     getRandomCharCode(),
//     getRandomCharCode(),
//   )
//   let model = String.fromCharCode(getRandomCharCode(), getRandomCharCode()) + '-' + Math.ceil(Math.random() * 1000).toString();
//   let price = Math.ceil(Math.random() * 100) * 100
//   let total = 100
//   let sell = Math.floor(Math.random() * 10) * 10
//   let storage = total - sell;

//   productList.push({
//     name,
//     model,
//     price,
//     storage,
//     sell,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   })
// }

// console.log(productList);



const rawProductList = [
  {
    name: 'ZESEK',
    model: 'DQ-200',
    price: 7600,
    storage: 100,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'DVIER',
    model: 'KR-135',
    price: 7400,
    storage: 10,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'NOYRW',
    model: 'NO-711',
    price: 4500,
    storage: 100,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'GRCCN',
    model: 'OQ-936',
    price: 6700,
    storage: 50,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'EYHMR',
    model: 'LL-850',
    price: 5000,
    storage: 30,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'SPOGL',
    model: 'XK-357',
    price: 7800,
    storage: 90,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'FIHEP',
    model: 'CX-422',
    price: 9100,
    storage: 30,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'NMWWX',
    model: 'TS-815',
    price: 9700,
    storage: 50,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'ENMNN',
    model: 'BK-560',
    price: 4200,
    storage: 100,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'FQSNX',
    model: 'IX-702',
    price: 6500,
    storage: 40,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'JDLCT',
    model: 'OR-25',
    price: 3100,
    storage: 10,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'MNQPC',
    model: 'AX-282',
    price: 5600,
    storage: 70,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'ZSDWK',
    model: 'YF-466',
    price: 4200,
    storage: 90,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'TXRRU',
    model: 'JX-472',
    price: 8400,
    storage: 10,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'OTCCV',
    model: 'TB-506',
    price: 7900,
    storage: 50,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'VVSYU',
    model: 'GI-358',
    price: 6300,
    storage: 100,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'WPESF',
    model: 'XR-286',
    price: 2500,
    storage: 80,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'ASWWY',
    model: 'RS-349',
    price: 2200,
    storage: 20,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'RBKYJ',
    model: 'NL-766',
    price: 4900,
    storage: 30,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'QJYBN',
    model: 'DC-616',
    price: 1700,
    storage: 50,
    sell: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = { rawProductList };