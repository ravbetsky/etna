var Level = function(scene) {
  this.scene = scene
}

/* global THREE */
Level.prototype.load = function() {
  console.log(THREE.GLTF2Loader)
  var loader = new THREE.GLTF2Loader();
  var self = this;
  
  // Load a glTF resource
  loader.load('/dist/levels/lab_01/level-test.gltf', function (gltf) {
  	self.scene.add(gltf.scene);
  	console.log(self.scene);
  });
}