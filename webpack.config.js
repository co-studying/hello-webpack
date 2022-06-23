const path = require("path")
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const banner = require("./banner.js")
// const apiMocker = require("connect-api-mocker")

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
    // before: app => {
    //   app.use(apiMocker("/api", "mocks/api"))
    // },
    proxy: {
      "/api": "http://localhost:8081",
    }
  },
  module: {
    rules: [
        {
            test: /\.css$/, // .css 확장자로 끝나는 모든 파일
            use: [
                process.env.NODE_ENV === "production"
                    ? MiniCssExtractPlugin.loader // 프로덕션 환경
                    : "style-loader", // 개발 환경
                "css-loader"
            ], // css-loader를 적용한다
        },
        {
            test: /\.png$/, // .png 확장자로 마치는 모든 파일
            loader: "url-loader", // 파일 로더를 적용한다
            options: {
                name: "[name].[ext]?[hash]", // 파일명 형식
                limit: 20000
            },
        },
    ],
  },
  plugins: [ 
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
        VERSION: JSON.stringify("v.1.2.3"),
        PRODUCTION: JSON.stringify(false),
        MAX_COUNT: JSON.stringify(999),
        "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html', // 템플릿 경로를 지정
        templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
          env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
        },
        minify: process.env.NODE_ENV === 'production' ? {
            collapseWhitespace: true, // 빈칸 제거
            removeComments: true, // 주석 제거
        } : false,
        hash: true,
    }),
    ...(process.env.NODE_ENV === "production"
        ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
        : []),
    new CleanWebpackPlugin()
  ],
}