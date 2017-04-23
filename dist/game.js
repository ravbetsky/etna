var Game = function() {
  this.name = 'etna'
}
/* global THREE */
Game.prototype.start = function() {
  // Создаем сцену
  var self = this;
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  this.scene.add(new THREE.AmbientLight( 0x404040 ));
  
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
  this.level = new Level(this.scene);
  this.level.load();
}

Game.prototype.requestResize = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
}

Game.prototype.gameLoop = function(scene, camera) {
  this.camera.position.x += 5 
  this.camera.position.y += 5 
  this.camera.position.z += 5 
}

var game = new Game()

game.start()

console.log(game)

