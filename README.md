# MTR04-Express-Parlando
![](https://i.imgur.com/jqlYdUm.png)

## 簡介
此專案為 [程式導師實驗計畫第四期](https://github.com/Lidemy/mentor-program-4th) 的 Final project - Parlando 後端專案，藉由實作過程練習課程所學。團隊成員包含 [awuuu0716](https://github.com/awuuu0716), [vick12052002](https://github.com/vick12052002) 與 [huiming](https://github.com/hero19931012)，使用 React + Express 前後端分離開發，專案主題為音樂品牌官網，主要功能為使用者註冊、查看商品、加入購物車、結帳，管理員可以上架與管理商品。

[前端專案](https://github.com/awuuu0716/MTR04-Parlando)  
[作品 DEMO](https://www.parlando.tw/#/login)

## 目錄
- [使用套件](#使用套件)
- [資料庫關連](#資料庫關連)
- [API 文件](#API-文件)
- [如何使用](#如何使用)
- [聲明](#聲明)
- [資料來源](#資料來源)

## 使用套件
### axios
向第三方 API 發送請求。

### bcrypt
將使用者密碼雜湊之後存進資料庫。

### cors
設定跨域請求權限。

### dotenv
設定與取存環境變數。

### ecpay-payment
綠界金流套件。

### jsonwebtoken
簽署 token 實作使用者身分驗證。

### multer
存取來自前端的圖片資料。

### sequelize
實作資料庫的 ORM 操作。

## 資料庫關連

[連結](https://drawsql.app/lidemyfinalproject/diagrams/finalproject-db)
![](https://i.imgur.com/ZdTnG5e.png)

## API 文件
[Parlando API doc](https://hackmd.io/@GL7n1a5oR9-4-AueB1TGEw/BJS6xUipw)

## 如何使用
### 安裝套件
```bash=
npm install
```

### 建立 config/config.json
格式如下：
```json=
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "",
    "password": "",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "",
    "password": ",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
### 建立 .env 設定環境變數
格式如下：
```bash=
SECRET=
```

### 建立資料庫 table
```bash=
npm run migrate
```

### 寫入測試資料
```bash=
npm run seed
```

### 開發
```bash=
npm run start
```

### 部暑
```bash=
pm2 start app.js
```

## 聲明
本網站僅作為個人練習，註冊時請勿使用真實資料。另本網站包含之圖片與內容僅作練習使用，不作任何商業用途。

## 資料來源
[Lorem Picsum](https://picsum.photos/)  
[pxhere](https://pxhere.com/)  
[unsplash](https://unsplash.com/)  
[pexels](https://www.pexels.com/zh-tw/)  
[pixabay](https://www.pexels.com/zh-tw/@pixabay)
