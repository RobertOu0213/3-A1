# 餐廳清單 + CRUD + 登入系統 :wink:

![A1 image](https://github.com/RobertOu0213/3-A1/assets/115865251/122a5e4f-41e8-4409-b0b0-20eec380a224)


![A1-image-2](https://github.com/RobertOu0213/3-A1/assets/115865251/697f639d-1520-4241-8a93-08e9805408d1)



<h1> 功能 </h1>

1. 查看所有餐廳

2. 瀏覽餐廳的詳細資訊

3. 新增餐廳

4. 修改餐廳

5. 刪除餐廳

6. 搜尋餐廳
   
7. 建立登入系統

# 開始使用

1. 請先確認有安裝 node.js 與 npm

2. 將專案 clone 到本地

3. 在本地開啟之後，透過終端機進入資料夾，輸入：

```
npm install
```

4. 依據.env.example, 請自行帶入以下參數

```
   # Mongo db connect info
    MONGODB_URI=<YOUR OWN connect string>
    
   # Session secret
    SESSION_SECRET=<YOUR_SESSION_SECRET>

   # Facebook App info
    FACEBOOK_ID=SKIP
    FACEBOOK_SECRET=SKIP

```

5. 安裝完畢後，繼續輸入：

```
npm run start
```

6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

```
Listening on http://localhost:3000
```

7. 請輸入種子資料

```
npm run seed
```

 ### 種子資料使用者email及密碼如下

 email: user1@example.com  
 password: 12345678

 email: user2@example.com  
 password: 12345678

# 開發工具

- node 14.16.0
- Express 4.16.4
- Express-Handlebars 3.0.0
- mongoose 5.9.7
- 其餘工具請去package.json確認
