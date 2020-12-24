const bcrypt = require('bcrypt');
const saltRounds = require('../../env/env')

const users = [
  "Oliver",
  "Harry",
  "George",
  "Noah",
  "Jack",
  "Olivia",
  "Leo",
  "Isla",
  "Ava",
  "Emily"
]

const userData = [
  { username: "Oliver", password: "$2b$10$jj6ePpAwjb4O4F4VL9M6eezQPT5OOQTfZHO9zQChnHfaqHFM4kCH2" },
  { username: "Harry", password: "$2b$10$E1bFzoRqItXckhHz2gQEfOiGzNA13yKmEL3ZrdZtuoEteyNltiEVK" },
  { username: "Noah", password: "$2b$10$yDBYNIF/AFxvjdF3AFiHK.xpHssouCfYCNzCPA6swIZ1uXEmZTHlm" },
  { username: "Olivia", password: "$2b$10$C3LI8ipQ9R.3h7qi265QSeb0o5TvgteN2QbWZbH6qfcmYN5Wgx9je" },
  { username: "George", password: "$2b$10$Erh/jDabCAJYfIAsj2rGJuYI85FeOYWIvZHGAeVhWe5xitKnVRTkm" },
  { username: "Isla", password: "$2b$10$cBLwG8kT80FK09V45abhTu5Zef1BPeak5z1OAWIlM0obzjUP9sM6." },
  { username: "Leo", password: "$2b$10$k.Hgev9pd4m3TnqBAlX34OMJCY0sCJl/tyzxQRnWbqRAcMz3DHybe" },
  { username: "Jack", password: "$2b$10$M.bohndeLuQzUbcLJEVaOeRv6tUOiLUWCRYox.covyfHDCYpEh3zu" },
  { username: "Emily", password: "$2b$10$1VrJm9C19JA2eL0R.MHPRekpCaRNbl5yOkeuXflmQog03gK8nUDju" },
  { username: "Ava", password: "$2b$10$RtR7IAyco/.gg/6rP8sfSeU8Pdk5.5JjdtREfGjH/Rxj8nLXVLEoa" },
]

const userList = []
for (let i = 0; i < userData.length; i++) {
  // bcrypt.hash(users[i], Number(saltRounds), (err, hash) => {
  //   if (err) {
  //     console.log(err.toString());
  //   }
  //   console.log(users[i], hash);
  // })

  userList.push({
    username: userData[i].username,
    password: userData[i].password,
    realName: userData[i].username,
    email: "email@mail.com",
    phone: "0987654321",
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

// console.log(userList);

module.exports = { userList };