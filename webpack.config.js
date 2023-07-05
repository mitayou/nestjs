const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// fork-ts-checker-webpack-plugin需要单独安装
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const entityFiles = glob.sync('./src/**/*.entity.ts').map(file => './' + file.replace(/\\/g, '/'))
// console.log('实体类文件列表', entityFiles)

module.exports = {
  entry: {
    main: './src/main.ts',
    entity: entityFiles
  },
  // 打包后的文件名称以及位置
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  // 置为空即可忽略webpack-node-externals插件
  externals: {},
  // ts文件的处理
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true }
          // 'babel-loader' // 可选，如果需要使用 Babel 进行转译
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    // 设置别名 这样配置后 @ 能够指向 src 目录
    alias: {
      '@': path.resolve('src')
    }
  },
  plugins: [
    // new CopyWebpackPlugin({
    //   // 将实体文件复制到输出目录
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/*/*.entity.ts'),
    //       to: path.resolve(__dirname, 'dist2'),
    //       globOptions: {
    //         ignore: ['**/node_modules/**']
    //       }
    //     }
    //   ]
    // }),
    // 需要进行忽略的插件
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/microservices/microservices-module',
          '@nestjs/websockets/socket-module',
          'cache-manager',
          'class-validator',
          'class-transformer'
        ]
        if (!lazyImports.includes(resource)) {
          return false
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()]
          })
        } catch (err) {
          return true
        }
        return false
      }
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
}
