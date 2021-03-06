var app = angular.module('app',[]);

var images_trousers = ['images/trousers.bmp','images/trousers-color.bmp'];
var images_shirts = ['images/shirt.bmp','images/shirt-color.bmp'];

var clothes =['','REMERA', 'PANTALON'];
app.controller('mainCtrl',['$scope', '$http', function($scope, $http){

	/** @var active 
	*@description Prenda actualmente seleccionada */
	$scope.active = 0;

	/** @var cantFold
	*@description Doblado inhabilitado */
	$scope.cantFold=true;

	/** @var shirt_img
	*@description Imagen de Remera*/
	$scope.shirt_img = images_shirts[0];

	/** @var trousers_img
	*@description Imagen de Pantalón */
	$scope.trousers_img= images_trousers[0];

	/** @var prendaDoblada
	*@description Variable de estado: Doblado exitoso */
	$scope.prendaDoblada = false;

	/** @var abrirCerrar
	*@description Variable de estado: Doblador abierto/cerrado exitosamente */
	$scope.abrirCerrar = false;

	/** 
	*@method select
	*@description Selecciona una prenda para ser doblada
	*@param n Código de la preda seleccionada
	*/
	
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
		}

	};

	/** 
	*@method fold
	*@description Dobla la prenda seleccionada.
	*/

	this.fold = function(){
		if($scope.active === 0){
			bootbox.alert("No hay ninguna prenda seleccionada. Debe seleccionar alguna antes de presionar el botón de doblar.");
		}
		else{
			$http.post('/checkLDR')
			.success(function(data){
				if(data === "1")
				{
					$scope.prendaDoblada = true;
					setTimeout(function(){ $scope.$apply(function(){$scope.prendaDoblada = false;})},3000);

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
					bootbox.alert("No hay una prenda sobre el dispositivo. Intente nuevamente.");
				}
			})
			.error(function(err){
				console.log("Error de comunicación");
			});

		}
	};
	/** 
	*@method open
	*@description Ejecuta la acción de abrir el doblador.
	*/

	this.open = function(){

		$http.post('/abrir')
		.success(function(data){

			$scope.abrirCerrar = true;
			$scope.abrirCerrarText = "Doblador abierto con éxito!";
			setTimeout(function(){ $scope.$apply(function(){$scope.abrirCerrar = false;})},1500);

		});
	};

	/** 
	*@method close
	*@description Ejecuta la acción de cerrar el doblador.
	*/

	this.close = function(){
		$http.post('/cerrar')
		.success(function(data){			
			$scope.abrirCerrar = true;
			$scope.abrirCerrarText = "Doblador cerrado con éxito!";
			setTimeout(function(){ $scope.$apply(function(){$scope.abrirCerrar = false;})},1500);
		});
	};

}]);

