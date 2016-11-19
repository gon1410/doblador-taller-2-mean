var express = require('express');
var router = express.Router();

var SerialPort = require('serialport');
var ldr = false;
// list serial ports:
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});

var port = new SerialPort("COM3", {
  baudRate: 9600
});

// RECIBIR DATOS DEL LDR
port.on('data', function (data) {
  ldr_data = data.toString();
  if (ldr_data === '1'){
    ldr = true;
    console.log(ldr);
  }
  else
    if (ldr_data === '0'){
      ldr = false;
      console.log(ldr);
    }
  });

port.on('open',function(){
	console.log(port);
});
// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/doblarRemera',function(req,res){
  port.write("1");
  res.send("Remera doblada");
});

router.post('/checkLDR',function(req,res){
  if (ldr){
   res.send('1');
 }
 else{
  res.send('0');}

});


module.exports = router;
