// 面向对象
function circlePic(selecter, options) {
	this.$root = $(selecter);
	this.current = 0;
	this.w = this.$root.width();
	this.h = this.$root.height();
	this.$items = this.$root.find(".wrapper .picture");
	this.$wrap = this.$root.find(".wrapper");
	this.$circle = this.$root.find(".circle");

	this.$prevButton = this.$root.find(".previous-button");
	this.$nextButton = this.$root.find(".next-button");

	this.init();
	this.drawDot();
	this.bindDotsClick();
	this.bindButtonClick();

	console.log(options.auto)
	if (options.auto == true) {
		//console.log(111)
		this.autoplay()
	}
}

//初始化
circlePic.prototype.init = function() {
	this.$wrap.css("width", this.$items.length * this.w + "px");
	this.$items.css("width", this.w + "px");
};

//添加小圆点
circlePic.prototype.drawDot = function() {
	var _this = this;
	this.$items.each(function(index, element) {
		if (_this.current === index) {
			_this.$circle.append("<span class='active'></span>");
		} else {
			_this.$circle.append("<span></span>");
		}
	});
	_this.$dots = this.$circle.find("span");
};

//小圆点绑定点击事件
circlePic.prototype.bindDotsClick = function() {
	var _this = this;
	this.$dots.click(function() {
		var index = $(this).index();
		_this.move(index);
	});
};

// 高亮小圆点
circlePic.prototype.activePoint = function(index) {
	this.$dots
		.eq(index)
		.addClass("active")
		.siblings()
		.removeClass("active");
};

// 显示图片
circlePic.prototype.showPic = function(index) {
	if (this.current < index) {// 想显示的图片在后面
		// 将要显示的图片移动到第一张之后
		this.$root
			.find(".wrapper .picture")
			.eq(0)
			.after(this.$items.eq(index));

		// 将显示图片移动到后面一张
		this.nextPic();
	} else {// 想显示的图片在前面
		this.$root
			.find(".wrapper .picture")
			.eq(0)
			.before(this.$items.eq(index));
		this.prevPic();
	}
};

// 图片移动
circlePic.prototype.move = function(index) {
	// 准备即将想显示的图片
	this.showPic(index);
	// 高亮即将要显示的圆点
	this.activePoint(index);
	// 改变当前索引值
	this.current = index;
};

// 下一张图片
circlePic.prototype.nextPic = function() {
	// this:实例对象
	var _this = this;
	
	this.$wrap.animate({
		left: -this.w + "px"
	}, 300, function() {
		// console.log(this); this是dom对象wrap 可以用父级函数的_this代表实例对象
		_this.$wrap.append(_this.$root.find(".wrapper .picture").eq(0)).css("left", "0px");
	});
};

// 上一张图片
circlePic.prototype.prevPic = function() {
	var _this = this;
	this.$wrap.css("left", -this.w + "px").animate({
		left: "0px"
	}, 300);
};

// 右键点击事件设置
circlePic.prototype.handleNext = function(e) {
	// console.log(e.data.obj);
	var _this;
	if (e && e.data.obj) {
		_this = e.data.obj;
	} else {
		_this = this;
	}

	// 事件函数 this函数运行时所挂在的对象 this是
	var nextIndex = _this.current + 1 > _this.$items.length - 1 ? 0 : _this.current + 1;
	_this.move(nextIndex);
};

// 左键点击事件设置
circlePic.prototype.handlePrev = function(e) {
	var _this;
	if (e && e.data.obj) {
		_this = e.data.obj;
	} else {
		_this = this;
	}

	var prevIndex = _this.current - 1 < 0 ? _this.$items.length - 1 : _this.current - 1;
	_this.move(prevIndex);
};

// 左右切换键绑定事件
circlePic.prototype.bindButtonClick = function() {
	this.$nextButton.on("click", {
		obj: this
	}, this.handleNext);
	this.$prevButton.on("click", {
		obj: this
	}, this.handlePrev);
};

// 自动轮播设置
circlePic.prototype.autoplay = function() {
	var _this = this
	var time = setInterval(function() {
		_this.handleNext()
	}, 2000)
}
