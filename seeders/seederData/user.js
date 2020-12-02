const bcrypt = require('bcrypt');

const users = [
  "Oliver",
  "Harry",
  "George",
  "Noah",
  "Jack",
  "Jacob",
  "Leo",
  "Oscar",
  "Charlie",
  "Muhammad",
  "Olivia",
  "Amelia",
  "Isla",
  "Ava",
  "Emily",
  "Isabella",
  "Mia",
  "Poppy",
  "Ella",
  "Lily"
]

const passwords = [
  "$2b$10$pmpCwjgB2nb8Br/pBE.oZ.6Qxh6kbt6zz19gnSeVFl/EdF9AYrnEe",
  "$2b$10$UyE7mZ3cbk4I5PrNK1gJWeWiCqBxIU08iz1sdV1z2J/bhd6aZ/Hyi",
  "$2b$10$0l8wS1365mHchwhsdK8FZOkP/2vOt1Vupt3E3QsbH9FrlMk0bMx3C",
  "$2b$10$8tSmLDTY8MuRQX1RN0ScCOYxE7xQas5brBXxdIgsJiBO3n634ybLO",
  "$2b$10$hDtXJ2GewmgmV/D8rMmN9.b9O9ln.xJJ09hu6uylGbM6IZPw8y.wO",
  "$2b$10$.33V06rfMRM/encqZUFqiek2gfmxB4jVbvpiRbTFRazFiLjvrHkPq",
  "$2b$10$Z8RyAhrkLJAx3xDFTJYGiuVnmrGE0nuO.wSuPbGHnT0B61yTm52Ty",
  "$2b$10$N7frlYaW6sKZ3ReZBv12Xe5PigMCSJmrI72ztniOmEsa9nZ.bWHUe",
  "$2b$10$WSomdfVObsLOuVJjArP2du/Ifnp7YCtqlR9tjIhnrjCd/oPcRkMsS",
  "$2b$10$l3RjUaR7ZoUMxefitthdsejE9oPnNaiwDFQVNggKfiJqUWEd5gkmO",
  "$2b$10$fdYRvflyvmCGpqNPfflYYeNM7EDl8mI2n5DJbeEam4/i5wqW41ZvG",
  "$2b$10$IA6dUd3ywHXyEWl4aeWGp.nbG99lYhm.CAJ9aPePUP/UCr9o6VFeW",
  "$2b$10$0wzuWOU26iK5qL9qxKALsee1sJ537QqSuI2Tw2UQNVwQHAy2RrXFy",
  "$2b$10$8FQfiEqjEgZ1sLovGwJxaO2RGJY6U3ZfXDSuWhicFK22WUV4dQBH2",
  "$2b$10$x9GrEkfTJ/MaCD1SXPjbS.qOQpScgTvyIJ1e8OxXRJkIXMeGL/RUi",
  "$2b$10$Zj3hML38TxAqz0SfC6XY2e0JtYy5DvIRJ3Fj4zfgxrbDGnmJsnTNK",
  "$2b$10$zx/diPKXrB0dmGpCxUpDou09noeByF4dNUvESm1HS2ZujMBJsRP9G",
  "$2b$10$yrPmjAooM3jN1ytiRjooZun8ku3KuJJDMAN9eb6aP4pLyBYvnXtQW",
  "$2b$10$18YrVD8wsJgXGNDTvRgeheC0PFdqyIhnzmwnr1huBYp1S.3nQ7vgi",
  "$2b$10$xwOzpFSBN0yN6DenPgztu.1r7kXiH2UGJWt433bwIZSCpc5heFLRW"
]

const userList = []

for (let i = 0; i < 20; i++) {
  userList.push({
    username: users[i],
    password: passwords[i],
    realName: users[i],
    email: "email@mail.com",
    phone: "0987654321",
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports = { userList };