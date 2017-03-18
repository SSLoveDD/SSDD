//document.getElementsByClassName不能支持IE8,返回的aResult仍然是数组，即使用的时候仍然需要下标
function getByClass(className) {
	var aResult = [];
	var arr = document.getElementsByTagName('*');
	var re = new RegExp('\\b' + className + '\\b', i); //因为className是动态变化的，所以只能用new RegExp的方法
	for(var i = 0; i < arr.length; i++) {
		if(re.test(arr[i].className)) {
			aResult.push(arr[i]);
		}
	};
	return aResult; //这里返回的是指定classname的元素，而非Newjs对象，后面无法连缀。
}
//css样式的获取，有不兼容的现象，有时只能获取行内样式，无法获取外部引用的css文件的样纸
function getStyle(obj, attr) { //只有获取有兼容性问题，设置并没有兼容性问题;获取到的opacity是小数形式；获取的width无px
	var value;
	if(obj.currentStyle) { //IE
		value = obj.currentStyle[attr];
	} else {
		value = getComputedStyle(obj, false)[attr]; //W3C
	}
	if(attr != 'opacity') {
		value = parseInt(value, 10); //将字符串解析成整数
	}
	if(isNaN(value)) { //下面的针对offsetWidth等情况，但不懂为什么这种情况要单独列出来。
		value = obj['offset' + attr.charAt(0).toUpperCase() + attr.substring(1)]; //charAt返回指定索引位置的字符
	}
	return value;
}

//添加有兼容性问题
function myAddEvent(obj, evName, fn) { //evName只能等于mouseover或mouseout?。ie下也有mouseout？
	//fn是一个匿名函数，里面可以是匿名函数中包含下面自定义的hover函数
	if(obj.attachEvent) { //IE
		obj.attachEvent('on' + evName, function() {
			fn.call(this); //避免this被修改  这里应该写成fn.call(obj)???
		});
	} else {
		obj.addEventListener(evName, fn, false);
	}
}
function hover(ev, obj, dir) {
	var e = ev || window.event;
	if(dir == "in") {
		if(toAffect(obj, e, 'mouseover')) {
			//startMove();
		}
	} else {
		if(toAffect(obj, e, 'mouseout')) {
			//startMove(obj,{'top': 0,'left': 0,'opacity': 0.3});
		}
	}
}
function toAffect(obj1, ev, event) {//鼠标进入离开 父子元素不影响
	var obj2 = null;
	if(ev.relatedTarget) {
		obj2 = ev.relatedTarget;
	} else {
		if(event == 'mouseover') {
			obj2 = ev.fromElement;
		} else if(event == 'mouseout') {
			obj2 = ev.toElement;
		}
	}
	if(obj1.contains) {
		return !obj1.contains(obj2);
	} else {
		return !!(obj1.compareDocumentPosition(obj2) - 20) && a != b;
	}
}
//上面三个组合使用 调用方法：
//myAddEvent(a, "mouseover", function(ev) {//ev很重要，前几次失败都是ev问题
//	hover(ev, a,"in");
//})

function startMove(obj,json,fn){
	var nowAttr;
	var speed;
	var k = (11 - this.slideSpeed) > 0 ? (11 - this.slideSpeed) : 1;
	var delay=30;
	clearInterval(obj.moveTimer);
	obj.moveTimer=setInterval(function(){
		var stop=true;
		for (var attr in json) {
			var curStyle=getStyle(obj,attr);
			var target=json[attr];
			if (attr="opacity") {
				nowAttr=parseInt(parseFloat(curStyle)*100,10);
			} else{
				nowAttr=parseInt(curStyle,10);
			}
			if(nowAttr!=target){
				stop=false;
			}
			if (stop) {
				clearInterval(obj.moveTimer);
				fn&&fn();
			}else{
				speed = (target - nowAttr) / k;
					speed = target > nowAttr ? Math.ceil(speed) : Math.floor(speed);
					//上面这两行特别重要，能取合适的speed，使变化不超标。
					if(attr == "opacity") {
						obj.style[attr] = (nowAttr + speed) / 100;
						obj.style.filter = 'alpha(opacity=' + (nowAttr + speed) + ')';
					} else {
						obj.style[attr] = (nowAttr + speed) + "px";
					}
			}
		}

	},delay);
}
//添加class
			function addClass(objs, className) {
				for(var i = 0; i < objs.length; i++) {
					if(!objs[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
						objs[i].className += ' ' + className;
					}
				}
			}
			//移除class
			function removeClass(objs, className) {
				for(var i = 0; i < objs.length; i++) {
					if(objs[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
						objs[i].className = objs[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
					}
				}
			}
//设置物体居中
function center(objs,width,height){//要设置居中的对象的宽高
	var top=(document.documentElement.clientHeight-height)/2;
	var left=(document.documentElement.clientWidth-width)/2;
	for (var i=0;i<objs.length;i++) {
		objs[i].style.top=top+'px';
		objs[i].style.left=left+'px';
	}
	
}
//阻止冒泡兼容
function stopPro(evt){
	var e=evt||window.event;
	window.event?e.cancelPubble=true:e.stopPropagation();
}



//触发浏览器窗口事件
function resize(fn){
	window.onresize=fn;
}

//重点：
var $=function(_this){
	return new Base(_this);
}
function Base(_this){//基础库
	this.elements=[];
	if (_this!=undefined) {//undefined无双引号，因为_this是一个对象
		this.elements[0]=_this;
	}
}



