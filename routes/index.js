var express = require('express');
var router = express.Router();

var SerialPort = require('serialport');
var ldr_data="0";
// list serial ports:
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});

var port = new SerialPort("COM5", {
  baudRate: 9600
});

/** 
*@method onData
*@description Manejador de eventos: datos recibidos.
*/
port.on('data', function (data) {

  ldr_data = data.toString();

});

/** 
*@method onOpen
*@description Manejador de eventos: puerto abierto.
*/
port.on('open',function(){
	console.log(port);
});

/** 
*@method onError
*@description Manejador de eventos: error en puerto.
*/
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

/** GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/** 
*@method doblarRemera
*@description Dobla la prenda seleccionada.
*/
router.post('/doblarRemera',function(req,res){
  port.write('d');
  res.send("Remera doblada")  ;
});

/** 
*@method doblarPantalon
*@description Dobla la prenda seleccionada.
*/
router.post('/doblarPantalon',function(req,res){
  port.write('p');
  res.send("Pantalon doblada");
});

/** 
*@method cerrar
*@description Dobla la prenda seleccionada.
*/
router.post('/cerrar',function(req,res){
  port.write('c');
  res.send("Doblador Cerrado");
});

/** 
*@method abrir
*@description Dobla la prenda seleccionada.
*/
router.post('/abrir',function(req,res){
  port.write('a');
  res.send("Doblador Abierto");
});

/** 
*@method checkLdr
*@description Dobla la prenda seleccionada.
*/
router.post('/checkLDR',function(req,res){
  res.send(ldr_data);
});


module.exports = router;
