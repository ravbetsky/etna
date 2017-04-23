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
/* global Level */
Game.prototype.init = function() {
  this.level = new Level(this.scene);
  this.level.load();
  this.camera.position.z = -5;
  this.camera.position.y = 0.6;
  this.camera.position.x = 0;
  this.camera.rotation.y = Math.PI;
  
  window.scene = this.scene;
  
  var ambient = new THREE.AmbientLight( 0x444444, 3 );
  this.scene.add( ambient );
}

Game.prototype.requestResize = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
}

Game.prototype.gameLoop = function(scene, camera) {
  // this.camera.position.x += 1 
  // this.camera.position.y += 1
  // this.camera.position.z += 1 
}

var game = new Game()

game.start()
