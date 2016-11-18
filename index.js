var app = angular.module('app',[]);

var images_trousers = ['trousers.bmp','trousers-color.bmp'];
var images_shirts = ['shirt.bmp','shirt-color.bmp'];

var clothes =['','REMERA', 'PANTALON'];

app.controller('mainCtrl',function(){
	this.active = 0;
	this.cantFold=true;

	this.buttonText = "DOBLAR "+clothes[this.active];
	this.shirt_img = images_shirts[0];
	this.trousers_img= images_trousers[0];
	this.select = function(n){
		if(this.active === n){
			this.active = 0;
			this.buttonLabel="";
			this.shirt_img = images_shirts[0];
			this.trousers_img= images_trousers[0];

		}
		else{
			this.active=n;
			if(this.cantFold){
				this.buttonLabel = "No hay ninguna prenda sobre el doblador."
			}
			else{
				this.buttonLabel = "La prenda esta lista para ser doblada."
			}
			switch (n){
				case 1:
				this.shirt_img = images_shirts[1];
				this.trousers_img= images_trousers[0];
				break;

				case 2:
				this.shirt_img = images_shirts[0];
				this.trousers_img= images_trousers[1];
				break;
			}
			
			
		}
		this.buttonText = "DOBLAR "+clothes[this.active];

	};

	this.fold = function(){
		if(this.active === 0){
			window.alert("NO HAY NADA SELECCIONADO, CARETA");
		}
		else{
			console.log("DEBERIA DOBLAR: "+clothes[this.active]);

		}
	}
});

