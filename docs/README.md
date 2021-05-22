# bii-labs

## Environment
node 10.16.3

npm 6.9.0

yarn 1.22.4

## Usage
1. install dev dependencies (install一次就好)
  ```
  yarn
  ```
2. start dev server (每次使用都要)
  ```
  yarn start 
  ```

3. 打開localhost:3000
    

4. html檔案請在 `/src/*.html` 編輯；
   
   style檔案請在 `/sass/*.scss` 編輯；
   
   js檔案請在 `/js/*.js` 編輯；
   
   onSave時會將這三者自動處理至/dist/，處理細節詳見[Folders](#Folders)。

5. images, icon, favicon.ico放在/static

6. 此localhost server的根目錄會是[/dist, /static]， 
   e.g:
   ```
   /src/about.html => /dist/about.html => "http://localhost:3000/about"
   /js/a.js => /dist/js/a.min.js => <script src="/js/a.min.js"></script>
   /sass/b.scss => /dist/css/b.css => <link href="/css/b.css" />
   /static/assets/i.png => <img src="/assets/i.png" />
   ```


## Folders

### /gulpfile.js
關於編譯sass, js, html的規則、開啟localhost的設定等。

### /src/
放各個html檔案，在經過header, footer等inject後會被放在/dist/。

### /js/
放各個js原始碼，minify後會被放在/dist/js/。

### /sass/
放各個sass原始碼，編譯後會被放在/dist/css/。

### /static/
放不需處理的靜態資源檔，像是images, icons, favicon.ico等等。

### /dist/
放各個處理過的js, css, html檔案。*不需編輯、不需進git*

### /design/
放各頁設計圖檔。

### /deploy/
```yarn build```完後產生此folder，可直接將folder內的所有東西上傳至ftp。此folder的產生方式與`/dist/`幾乎一樣，唯一差在js檔會被drop console。*不需編輯、不需進git*



## Libraries

### [bootstrap 4.4.1](https://getbootstrap.com/docs/4.4/getting-started/introduction/)
各種css class

### [fontawesome 5.13.0](https://fontawesome.com/icons?d=gallery)
一些常用圖案

### modernizr 2.8.3
會根據裝置的不同，在`<html class="~"\>`增加不同的class

### [jquery 3.4.1](https://api.jquery.com/)
各種dom api

### [popper.js 1.16.0](https://popper.js.org/docs/v1/)
各種dom api

### [jquery-i18n 1.0.7](https://api.jquery.com/)
切換語言







