var Game = function() {
  this.name = 'etna'
}

Game.prototype.start = function() {
  // Создаем сцену
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  // Создаем канвас для WebGL, добавляем к документу и создаем рендерер
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild(renderer.domElement);

  // Создаем зелены кубик
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );

  // Добавляем кубик на сцену
  scene.add(cube);

  // смещаем камеру чтобы увидеть кубик
  camera.position.z = 6;

  render()

  function render() {

    cube.rotation.y += 0.05
    cube.rotation.z += 0.01

    requestAnimationFrame(render);
	  renderer.render(scene, camera);
  }
}

var game = new Game()

game.start()
