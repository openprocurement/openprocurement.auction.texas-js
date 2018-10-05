'use strict'
require('../build/check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.release.conf')

// Version is taken from today date
let now = new Date()
now = new Date(Date.UTC(
  now.getFullYear(), 
  now.getMonth(), 
  now.getDate(), 
  now.getHours(), 
  now.getMinutes())
)
now = now.toISOString().split('T')[0].split('-').join('.') // String representation of version

// Update config/index.js file to change place where to put static files for release
let assetsRoot = path.resolve(__dirname, '../openprocurement.auction.texas-js_' + now)
let assetsSubDirectory = 'static_texas'


const spinner = ora('building release for production...')
spinner.start()

rm(path.join(assetsRoot, assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Release Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Release Build complete with version ' + now + '.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
