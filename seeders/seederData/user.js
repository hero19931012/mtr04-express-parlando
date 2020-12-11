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
  "$2b$10$0z1Gl7Wjjx261s3sTOor7ernUp7M6LWJFquMZyuawkQdck30E6Tci",
  "$2b$10$Tc2TeTJBlCx0slfPXXuRKejQa4yz.WwLolWCNzrQbJZQAFpEz6j6C",
  "$2b$10$xQzvq00V7X336UFTzu/A0evnrpyqeO9FUyXLpPscfPWAZ6s7BGjfm",
  "$2b$10$z4Umo3QXlku0hbU28ei8k.zh3w9jfNZdQiHxpYfKA4UmTFw2p4qQO",
  "$2b$10$cryQer0U6KVEQjAfXDWFh.CAgEGbecHiZ5p1n040jLU8Jhb56f0te",
  "$2b$10$Vd0MgnqcVlvf7dFzg9yb8uFd9PwxetWTrybnV28uOVevFtXiLkbvi",
  "$2b$10$9rmDS8OIL5RrpOUqVuA8hOkNsRkNlr34eMhwc9MQNR0G3Fgt3COZq",
  "$2b$10$c6bWb9MCjk.VsA4VVORmtOw7IRJkjN0um93KKzViLX/Qi3MxML5Hi",
  "$2b$10$prxpPi.qsYFRcZryM4R0gu68fWqxv/YYyyw3XPtFQzaq1XVDQGhvS",
  "$2b$10$UTOLI4XFx0Q./J/Ti0Cv5./uZJkbyXTr29UIzPFvYsnKdwLOYDezu",
  "$2b$10$3Kd6sUpwy4Jo.0Hvp2jmHu0Da5ESYHOacpOrjkmWzaT2RXgjMBlBq",
  "$2b$10$vU3IO5OhEYJwIirSuZ18q.2hl0vHzoAfNol5FZamUtZy5jUhVKZ3W",
  "$2b$10$pI5BeRnmkmx2ZZNbRdtKAOh2BDxdWmbWE0G2p4.pZ8gewDvRX64we",
  "$2b$10$WGQ7bncRLTyy90M3EQBRj.9bF0qAU.FYeoBZ6rTCkpJrJ7yN5PwTe",
  "$2b$10$wrzyemEnOE24z0SDgGWY9.vz9Trkg1vS4cbitPO7mcPuvHJ1JRhq.",
  "$2b$10$4nY9nab/Rn/aT7pA08o4h.0jPiuh4me3jjlyWqoNeyXyLgVLKRRpm",
  "$2b$10$f9.99BRE.iJ4teRwC35G7efd3hu7shy8jldLx3wW2RIUh/W1UMRVS",
  "$2b$10$2047G13UUj9fNCpiYcSI6.ni6ntNb1Zx0h.fih8nIlnT3Eq/z7q2W",
  "$2b$10$/Ymv6XKR7y0bKAmqVZpNOOBLFLjbYUl5.sPN3IJpc0Ifsikkd.pp6",
  "$2b$10$6DdQ85iqFPiuBWU66o0JGeG2O7iUCOCCJ7UYaI4/wackdnT.1wceG"
]

const userList = []
const saltRounds = 10
for (let i = 0; i < 20; i++) {
  // bcrypt.hash(users[i], saltRounds, (err, hash) => {
  //   if (err || !hash) { return }
  //   console.log(users[i], hash);
  // })
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