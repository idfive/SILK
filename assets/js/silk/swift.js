/**
 * SwiftSlider
 * v2.0.0
 */

	'use strict';
	var Swift = function (parameters) {

		this.container = document.querySelector(parameters.container);
		this.elements = document.querySelectorAll(parameters.container + ' ' + parameters.elements);
		this.currentSlide = 0;
		this.cycle = parameters.cycle || false;
		this.paused = null;
		this.interval = parameters.interval || 5000;
		this.pages = [];
		this.xDown = null;
		this.yDown = null;
		this.prevSymbol = parameters.prevSymbol;
		this.nextSymbol = parameters.nextSymbol;

		this.initialize.apply(this, parameters);
	};

	Swift.VERSION = '2.0.0';

	Swift.prototype.initialize = function () {
		this.controls();
		this.pager();

	};

	Swift.prototype.handleTouchStart = function (event) {
		this.xDown = event.touches[0].clientX;
		this.yDown = event.touches[0].clientY;
	};

	Swift.prototype.touchMoveHandler = function (event) {
		var self = this;
		if (!this.xDown || !this.yDown) {
			return;
		}

		var xUp = event.touches[0].clientX;
		var yUp = event.touches[0].clientY;

		var xDiff = this.xDown - xUp;
		var yDiff = this.yDown - yUp;

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) {
				this.nextSlide();
			} else {
				this.previousSlide();
			}
		}

		/* reset values */
		this.xDown = null;
		this.yDown = null;

	};

	Swift.prototype.clearClasses = function () {
		for (var i = 0; i < this.elements.length; i++) {
			this.pages[i].classList.remove('active');
			this.elements[i].classList.remove('active');
		}
	};

	Swift.prototype.assignClasses = function (index) {
		this.pages[index].classList.add('active');
		this.elements[index].classList.add('active');
	};

	Swift.prototype.pager = function () {

		var pager = document.createElement('div');
		pager.classList.add('swift-pager');

		this.container.appendChild(pager);

		for (var i = 0; i < this.elements.length; i++) {
			this.pages.push(document.createElement('span'));
			pager.appendChild(this.pages[i]);
			this.pages[i].addEventListener('click', this.slide.bind(this, i), false);
		}

		this.pages[this.currentSlide].click();
	};

	Swift.prototype.slide = function (index) {
		this.clearClasses();
		this.assignClasses(index);
	};

	Swift.prototype.nextSlide = function () {
		if (this.currentSlide == this.elements.length - 1) {
			this.currentSlide = -1;
		}
		this.currentSlide = this.currentSlide + 1;
		this.slide(this.currentSlide);
	};

	Swift.prototype.previousSlide = function () {
		if (this.currentSlide === 0) {
			this.currentSlide = elements.length;
		}
		this.currentSlide = this.currentSlide - 1;
		this.slide(this.currentSlide);
	};

	Swift.prototype.controls = function () {
		var controller = document.createElement('div');
		var prev = document.createElement('button');
		var next = document.createElement('button');
		// Controls Container
		controller.classList.add('swift-controls');
		this.container.appendChild(controller);
		// Prev
		prev.addEventListener('click', this.previousSlide.bind(this), false);
		prev.classList.add('swift-control', 'swift-prev');
		prev.innerHTML = '<svg class="symbol symbol-' + this.prevSymbol + '"><use xlink:href="#' + this.prevSymbol + '"></use></svg>';
		// Next
		next.addEventListener('click', this.nextSlide.bind(this), false);
		next.classList.add('swift-control', 'swift-next');
		next.innerHTML = '<svg class="symbol symbol-' + this.nextSymbol + '"><use xlink:href="#' + this.nextSymbol + '"></use></svg>';

		controller.appendChild(prev);
		controller.appendChild(next);
	};




