var Game = function() {
  this.name = 'etna'
}
/* global THREE */
Game.prototype.start = function() {
  // Создаем сцену
  var self = this;
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
   // Создаем канвас для WebGL, добавляем к документу и создаем рендерер
  this.renderer = new THREE.WebGLRenderer();
  this.requestResize()
  document.body.appendChild(this.renderer.domElement);
  
  window.onresize = this.requestResize.bind(this);

  this.init()
  
  render()

  function render() {
    self.gameLoop();
	  self.renderer.render(self.scene, self.camera);
	  
	  requestAnimationFrame(render);
  }
}

Game.prototype.init = function() {
  // Создаем зелены кубик
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  this.cube = new THREE.Mesh( geometry, material );

  // Добавляем кубик на сцену
  this.scene.add(this.cube);

  // Cмещаем камеру чтобы увидеть кубик
  this.camera.position.z = 6; 
}

Game.prototype.requestResize = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
}

Game.prototype.gameLoop = function(scene, camera) {
  this.cube.rotation.x += 0.05
  this.cube.rotation.z += 0.05
}

var game = new Game()

game.start()

