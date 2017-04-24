var Controls = function(controls) {
  this.controls = controls;
  this.pointerLock()
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
	document.addEventListener( 'pointerlockchange', handlePointerChange, false);
	document.addEventListener( 'mozpointerlockchange', handlePointerChange, false);
	document.addEventListener( 'webkitpointerlockchange', handlePointerChange, false);
	
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