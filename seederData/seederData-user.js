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

const userList = []

    users.forEach((user) => {
      userList.push({
        username: user,
        password: "1234",
        realName: user,
        email: "email@mail.com",
        phone: "0987654321",
        createdAt: new Date(),
        updatedAt: new Date()

      })
    })

console.log(userList);

module.exports = { userList };