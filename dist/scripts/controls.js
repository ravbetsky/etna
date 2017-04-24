/* global THREE */

var Controls = function(controls) {
  this.controls = controls;
  this.velocity = new THREE.Vector3();
  this.moveTo = {
  	left: false,
  	right: false,
  	forward: false,
  	backward: false
  }
  this.pointerLock()
  this.moveControls()
}

Controls.prototype.pointerLock = function() {
  var self = this;
  var canvas = document.getElementsByTagName('canvas')[0];
  
  // При клике запрашиваем доступ в PointerLock API
	canvas.addEventListener('click', function(event) {
		canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
		canvas.requestPointerLock();
	}, false);
	
	// Слушаем изменения в PointerLock
	document.addEventListener('pointerlockchange', handlePointerChange, false);
	document.addEventListener('mozpointerlockchange', handlePointerChange, false);
	document.addEventListener('webkitpointerlockchange', handlePointerChange, false);
	
	// Активируем/Деактивируем управление в зависимости от состояния PointerLock
	function handlePointerChange() {
		if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas) {
			self.controls.enabled = true;
		}
		else {
			self.controls.enabled = false;			
		}
	}
}

Controls.prototype.moveControls = function() {
	var self = this;
	
	document.addEventListener('keydown', handleKeyDown, false);
	document.addEventListener('keyup', handleKeyUp, false);
	
	function handleKeyDown(event) {
		switch (event.keyCode) {
			case 38: // up
			case 87: // w
				self.moveTo.forward = true;
				break;
			case 37: // left
			case 65: // a
				self.moveTo.left = true;
				break;
			case 40: // down
			case 83: // s
				self.moveTo.backward = true;
				break;
			case 39: // right
			case 68: // d
				self.moveTo.right = true;
				break;
		}
	}
	function handleKeyUp(event) {
		switch (event.keyCode) {
			case 38: // up
			case 87: // w
				self.moveTo.forward = false;
				break;
			case 37: // left
			case 65: // a
				self.moveTo.left = false;
				break;
			case 40: // down
			case 83: // s
				self.moveTo.backward = false;
				break;
			case 39: // right
			case 68: // d
				self.moveTo.right = false;
				break;
		}
	}
}