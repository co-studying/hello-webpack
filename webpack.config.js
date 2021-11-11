const path = require("path")
const webpack = require('webpack')

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
        {
            test: /\.css$/, // .css 확장자로 끝나는 모든 파일
            use: [
                "style-loader",
                "css-loader"
            ], // css-loader를 적용한다
        },
        {
            test: /\.png$/, // .png 확장자로 마치는 모든 파일
            loader: "url-loader", // 파일 로더를 적용한다
            options: {
                publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
                name: "[name].[ext]?[hash]", // 파일명 형식
                limit: 20000
            },
        },
    ],
  },
  plugins: [ 
    new webpack.BannerPlugin({
        banner: () => `빌드 날짜: ${new Date().toLocaleString()}`,
    })
  ],
}