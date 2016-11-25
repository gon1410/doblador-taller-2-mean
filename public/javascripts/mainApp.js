var app = angular.module('app',[]);

var images_trousers = ['images/trousers.bmp','images/trousers-color.bmp'];
var images_shirts = ['images/shirt.bmp','images/shirt-color.bmp'];

var clothes =['','REMERA', 'PANTALON'];
app.controller('mainCtrl',['$scope', '$http', function($scope, $http){
	$scope.active = 0;
	$scope.cantFold=true;

	$scope.buttonText = "DOBLAR "+clothes[$scope.active];
	$scope.shirt_img = images_shirts[0];
	$scope.trousers_img= images_trousers[0];

	this.select = function(n){

		if($scope.active === n){
			$scope.active = 0;
			$scope.buttonLabel="";
			$scope.shirt_img = images_shirts[0];
			$scope.trousers_img= images_trousers[0];
			$scope.cantFold = true;
		}
		else{	
			$scope.cantFold = false;
			$scope.active=n;

			$scope.buttonLabel = "Se va a doblar la prenda seleccionada."
			switch (n){
				case 1:
				$scope.shirt_img = images_shirts[1];
				$scope.trousers_img= images_trousers[0];
				console.log("Entro a 1")
				break;

				case 2:
				$scope.shirt_img = images_shirts[0];
				$scope.trousers_img= images_trousers[1];
				console.log("Entro a 2")

				break;
			}
			$scope.buttonText = "DOBLAR "+clothes[$scope.active];
		}
		
	};

	this.fold = function(){
		if($scope.active === 0){
			window.alert("NO HAY NADA SELECCIONADO, CARETA");
		}
		else{
			$http.post('/checkLDR')
			.success(function(data){
				if(data === '1')
				{
					console.log("DEBERIA DOBLAR: "+clothes[$scope.active]);

					switch ($scope.active){

						case 1: $http.post('/doblarRemera',$scope.response)
						.success(function(data){
							console.log(data);
						}).
						error(function(data){
							console.log("error")
						});break;
						case 2:$http.post('/doblarPantalon',$scope.response)
						.success(function(data){
							console.log(data);
						}).
						error(function(data){
							console.log("error")
						}); break;
					}

				}
				else
				{
					console.log("NO HAY NADA SOBRE EL APARATO");
				}

			})
			.error(function(err){
				console.log("Error de comunicación");
			});
		}
	};
}]);

