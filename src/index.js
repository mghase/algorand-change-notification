const  electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios');
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')

notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    var main = BrowserWindow.getFocusedWindow()
    let win = new BrowserWindow({
        webPreferences: {nodeIntegration: true},
        frame:false,
        parent:main,
        transparent:true,
        alwaysOnTop: true, 
         width: 400,
          height: 200 
        })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
  })

  var price = document.querySelector('h1')
  var targetPrice = document.getElementById('targetPrice')
  var targetPriceVal;

  const notification = {
      title: 'ALGO Alert Notification',
      body: 'ALGO just beat your target price!',
      icon: path.join(__dirname, '../assets/images/algo.png')
  }
  
function getALGO() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ALGO&tsyms=USD')
    .then(res => {
        console.log(res.data)
        const cryptos = res.data.ALGO.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')

        if (targetPrice.innerHTML != '' && targetPriceVal < res.data.ALGO.USD) {
            const myNotification = new window.Notification(notification.title, notification)
        }
    })
}



getALGO();
setInterval ( getALGO, 30000 );

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})