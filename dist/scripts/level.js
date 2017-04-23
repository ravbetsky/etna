var Level = function(scene) {
  this.scene = scene
}

/* global THREE */
Level.prototype.load = function() {
  var loader = new THREE.ObjectLoader();
  var self = this;
  
  var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	
	var onError = function ( xhr ) { };
	
	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
  
  // console.log(self.level)
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath('levels/lab_01/');
	mtlLoader.load('level-test.mtl', function(materials) {
		materials.preload();
		console.log(materials)
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('levels/lab_01/');
		objLoader.load('level-test.obj', function (object) {
		  self.scene.add(object)
		}, onProgress, onError);
	});
}