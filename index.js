import 'regenerator-runtime'
import bootstrapStyle from 'bootstrap/dist/css/bootstrap.css'
import fontAwesomeStyle from './libraries/font-awesome/css/font-awesome.min.css'
import App from './javascript/main.js'

// Start application
document.addEventListener('DOMContentLoaded', main)

async function main () {
  await bootstrapStyle.use()
  await fontAwesomeStyle.use()
  await App()
}
