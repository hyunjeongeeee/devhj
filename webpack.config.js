const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js', // 진입 파일
        output: {
            path: path.resolve(__dirname, 'build'), // 빌드 결과물 경로
            filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
            publicPath: '/', // GitHub Pages 사용 시 필요
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            open: true,
            port: 3000,
        },
        module: {
            rules: [
                {
                    test: /\.js$/, // JavaScript 파일 로드
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.css$/, // CSS 파일 로드
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader', // TailwindCSS 사용 시 필요
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|webp)$/i, // 이미지 파일 로드
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name].[hash][ext]',
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 로드
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name].[hash][ext]',
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(), // 빌드 폴더 정리
            new HtmlWebpackPlugin({
                template: './src/index.html', // HTML 템플릿 경로
                minify: isProduction
                    ? {
                        collapseWhitespace: true,
                        removeComments: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    }
                    : false,
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
            }),
        ],
        devtool: isProduction ? 'source-map' : 'eval-source-map', // 디버깅 도구
        mode: isProduction ? 'production' : 'development', // 모드 설정
    };
};