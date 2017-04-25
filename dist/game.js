/* global THREE */
/* global Controls */
/* global Level */
/* global performance */

var Game = function() {
  this.name = 'etna'
  this.prevTime = performance.now();
}

Game.prototype.start = function() {
  // Создаем сцену
  var self = this;
  
  // Обработчик ресайза
  window.onresize = this.requestResize.bind(this);
  
  // Инициализируем сцену
  this.init()
  
  // Запускаем игровой цикл
  render()
  
  // Главный цикл
  function render() {
    self.gameLoop();
	  self.renderer.render(self.scene, self.camera);

	  requestAnimationFrame(render);
  }
}

Game.prototype.init = function() {
  this.createScene()
  this.loadLevel();
  this.gameControls = new Controls(this.controls);
  this.controls.getObject().position.z = -5;
  this.controls.getObject().position.y = 0.6;
  this.controls.getObject().position.x = 0;
  this.controls.getObject().rotation.y = Math.PI;
}

Game.prototype.createScene = function() {
  // Создаем сцену и камеру
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );  
  
  // Добавляем туман
  this.scene.fog = new THREE.Fog( 0xc7e4ff, 0, 25 );
  
  // Добавляем рэйкастер для игрока
  this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3( 0, -1, 0 ), 0, 10);
	this.controls = new THREE.PointerLockControls(this.camera);
	this.scene.add(this.controls.getObject());

  // Создаем канвас для WebGL, добавляем к документу и создаем рендерер
  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.requestResize()
  
  // Добавляем канвас к документу
  document.body.appendChild(this.renderer.domElement);
  
  // Добавляем стандартное освещение
  var ambient = new THREE.AmbientLight( 0x444444, 1 );
  this.scene.add(ambient);
  
	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	this.scene.add(light);
} 

Game.prototype.loadLevel = function() {
  this.level = new Level(this.scene);
  
  // Загрузка игрового уровня
  this.level.load();  
}

Game.prototype.requestResize = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
}

Game.prototype.gameLoop = function() {
  if (this.gameControls.controls.enabled) {
  	this.raycaster.ray.origin.copy(this.controls.getObject().position);
  	this.raycaster.ray.origin.y -= 10;
  	
		var time = performance.now();
		var delta = (time - this.prevTime) / 1000;
		
		this.gameControls.velocity.x -= this.gameControls.velocity.x * 10 * delta;
		this.gameControls.velocity.z -= this.gameControls.velocity.z * 10 * delta;
		// this.gameControls.velocity.y -= 9.8 * 1 * delta; // 100.0 = mass
		
		if (this.gameControls.moveTo.forward) this.gameControls.velocity.z -= 20 * delta;
		if (this.gameControls.moveTo.backward) this.gameControls.velocity.z += 20 * delta;
		if (this.gameControls.moveTo.left) this.gameControls.velocity.x -= 20 * delta;
		if (this.gameControls.moveTo.right) this.gameControls.velocity.x += 20 * delta;
		
		this.controls.getObject().translateX(this.gameControls.velocity.x * delta);
		this.controls.getObject().translateY(this.gameControls.velocity.y * delta);
		this.controls.getObject().translateZ(this.gameControls.velocity.z * delta);
		
		this.prevTime = time;  	
  }
}
