var Base={//整个库可以是一个对象 对象式写法 Base.getId("box")
	getId:function(id){//方法尽可能简短而富有含义
		return document.getElementById(id);
	},
	getName:function(name){
		return document.getElementsByName(name);
	},
	getTagName:function(tag){
		return document.getElementsByTagName(tag);
	}	
};
//或者用函数试的写法
//function $(id){
//	return document.getElementById(id);
//}

//连缀功能实现Base.getId("box").css("color","red");
//Base是一个基础库的核心对象
//Base.getId("box");//返回的是一个div元素，但这个div元素没有css方法。
//将getId的这个返回改成Base即可,而在Base对象添加一个css方法.同样调用css方法后也需返回为Base对象……
//对象写法var Base={}，这种写法无法再它的原型中添加方法，所以需要使用函数式对象写法：
function Base(){//var base=new Base(); base.getId("box").css("color","red");
	//把返回的节点对象保存到一个Base对象的属性数组里
	this.elements=[];
	//获取id节点
	this.getId=function(id){
		this.elements.push(document.getElementById(id));
		return this;//不能返回document.getElementById(id)。否则无法返回Base对象
	};
	this.getTagName=function(tag){
		var tags=document.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
			this.elements.push(tags[i]);
		}
		return this;
	}
	
}
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		//加这个if判断是获取还是设置
		if(arguments.length==1){
			return this.elements[i].style[attr];
		}
		this.elements[i].style[attr]=value;//要用[attr]，因为attr是字符串
	}
	return this;
}//如果是引入了外部的css文件，没法用这种方法获取样式。行内的才可以获取。
//升级：外部的也可以：
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		//加这个if判断是获取还是设置
		if(arguments.length==1){
			if (typeof window.getComputedStyle!='undefined') {//W3C
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else if(typeof this.elements[i].currentStyle!='undefined'){//IE
				return this.elements[i].currentStyle[attr];
			}
		}
		this.elements[i].style[attr]=value;//要用[attr]，因为attr是字符串
	}
	return this;
}



Base.prototype.html=function(str){
	for (var i=0;i<this.elements.length;i++) {
		this.elements[i].innerHTML=str;
	}
	return this;
}
//连缀的部分后2分钟没听懂


//获取内容和样式，在设置的基础上加个判断传递过来的参数长短。
Base.prototype.html=function(str){
	for (var i=0;i<this.elements.length;i++) {
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}else{
			this.elements[i].innerHTML=str;
		}
	}
	return this;
}





//0306
//class
//获取class节点
Base.prototype.getClass=function(className){
	var all=document.getElementsByTagName("*");
	for (var i=0;i<all.length;i++) {
		if (all[i].className) {
			
		}
	}
}










//事件绑定
//W3C使用的是addEventListener和remove。IE使用的是attachEvent和detachEvent
//IE的这两个绑定，问题很多，并且伴随着内存泄漏。我么要解决IE浏览器绑定哪些问题呢？
//跨浏览器添加事件
function addEvent(obj,type,fn){
	if (typeof addEventListener!='undefined') {
		obj.addEventListener(type,fn,false);
	} else if(typeof attachEvent!='undefined'){
		obj.attachEvent('on'+type,fn);
		fn.call(this); //避免this被修改//ie中this传递过来的是window
		fn.call(obj); ??
	}
}

//跨浏览器获取视口大小
function getInner(){
	if (typeof window.innerWidth!='undefined') {
		return{
			width:window.innerWidth;
			height:window.innerHeight;
		}
	}else{
		return{
			width:document.documentElement.clientWidth;
			height:document.documentElement.clientHeight;
		}
	}
}



