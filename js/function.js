/*一、解决类名的兼容函数
getClass("one",[range]可传可不传，传时不加[])
获取带有指定class名的元素的集合
one 指定的class名
思路：
	1.判断浏览器 document.getElementsByClassName
	2.如果浏览器是指定的用指定的方法
	  document.getElementsByClassName("one")
	3.没有做兼容（用已有的模拟）从所有的元素，通过类名进行挑选
	all[i].className是否包含指定的className  */
function getClass(className,range){
	//range 初始化
	var range=range||document;
	if(document.getElementsByClassName){//true时w3c
		return range.getElementsByClassName(className);
	}else{//false时是IE6-8
		var arr=[];
		var all=document.getElementsByTagName("*");
		for(var i=0;i<all.length;i++){
		//当前元素的classname是否包含指定的classname
			if(checkClass(all[i].className,className)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}
/* "one two three"   "one""two""three"
checkClass(str,classname)检查str里面是否包含classname
思路：1.将str进行分割，转换成数组
	2.遍历数组，检查是否存在某一个元素等于指定的classname
	3.相等返回true，不相等返回false */
function checkClass(str,className){
	var arr=str.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==className){
			return true;
		}
	}
	return false;
}
/*二、文本的兼容性问题
思路：
getContent(obj,[val])----(div,"我是1")
1.判断浏览器
2.判断val参数,获取或者设置文本 */
function getContent(obj,val){
	if(obj.textContent){
		//w3c浏览器
		if(val){
			obj.textContent=val;
		}else{
			return obj.textContent;
		}
	}else{
		//IE浏览器
		if(val){
			obj.innerText=val;
		}else{
			return obj.innerText;
		}
	}
}
/*三、样式的兼容性问题
思路：
getStyle(obj,attr)-----(div,"width")
1.判断浏览器
2.IE6-8； obj.currentStyle.attr
3.w3c: getcomputedStyle(obj,null).attr */
function getStyle(obj,attr){
	if(obj.currentStyle){
		//IE浏览器,attr是个字符串
		return obj.currentStyle[attr];
	}else{
		//w3c浏览器
		return getComputedStyle(obj,null)[attr];
	}
}
/*四、获取元素的兼容性问题
思路： 
$(select)
$(".one")--通过className获取元素
$("#one")--通过id获取元素
$("div")--通过标签获取元素  (/^[a-z][a-z1-6]{0,8}$/.test(select))
$("<div>")--创建div
$(function(){})--传进来参数是函数时执行window.onload=function(){}
1.判断参数的第一个字符 str.charAt(0)
2.根据字符执行相应的分支，返回相应的元素
*/
function $(select,content){
	if(typeof select=="string"){
		var content=content||document;
		var first=select.charAt(0);
		if(first=="."){
			return getClass(select.substring(1),content);//.
		}else if(first=="#"){
			return content.getElementById(select.substring(1));//id
		}else if(/^[a-z][a-z1-6]{0,8}$/.test(select)){
			return content.getElementsByTagName(select);//tagName
		}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(select)){
			return document.createElement(select.slice(1,-1));//<div>
		}
	}else if(typeof select=="function"){
		window.onload=function(){
			select();
		}
	}
}



/*function $(select,content){
	var content=content||document;
	var first=select.charAt(0);
	if(first=="."){
		return getClass(select.substring(1),content);//.
	}else if(first=="#"){
		return content.getElementById(select.substring(1));//id
	}else if(/^[a-z][a-z1-6]{0,8}$/.test(select)){
		return content.getElementsByTagName(select);//tagName
	}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(select)){
		return document.createElement(select.slice(1,-1));//div
	}
}*/
/*五、getChild(obj)获取指定元素的子元素（元素节点）的集合
obj 是指定的元素
type是指定获取元素的类型，如果true只获取元素节点，如果false获取元素节点和有意义文本
思路：1.获取obj的所有的子元素
	  2.挑选 节点类型==1 时是元素节点（obj.nodeType==1）*/
function getChild(obj,type){
	type=type==undefined?true:type;//初始化type
	var arr=[];
	var child=obj.childNodes;
	if(type){//只获取元素节点
		for(var i=0;i<child.length;i++){
			if(child[i].nodeType==1){
				arr.push(child[i]);
			}
		}
		return arr;
	}else{//获取元素节点和有意义文本
		for(var i=0;i<child.length;i++){
			if(child[i].nodeType==1||(child[i].nodeType==3&&child[i].nodeValue.replace(/^\s+|\s+$/g,""))){
				arr.push(child[i]);
			}
		}
		return arr;
	}
}
/*六、获取子节点的第一个*/
function firstChild(obj){
	return getChild(obj)[0];
}
/*七、获取子节点的最后一个*/
function lastChild(obj){
	return getChild(obj)[getChild(obj).length-1];
}
/*八、通过指定下标获取子节点*/
function numChild(obj,type,num){
	return getChild(obj,type)[num];
}
/*九、beforeChild(obj,div)
给元素最前面插一个元素
obj  父元素
div  要插入的元素
思路：1.获取obj第一个子元素
	  2.obj.insertBefore(div,firstChild)*/
function beforeChild(obj,child){
	var first=firstChild(obj);
	obj.insertBefore(child,first);
}
/*十、获取obj的下一个兄弟节点
如果有兄弟节点则返回该节点，如果没有直接返回false
getnext(obj,true)
obj  指定的对象
type  类型true  忽略文本（默认）
	      false  不能忽略文本
思路：1.判断是否有下一个兄弟节点(next)。如果没有返回false
	  2.有 判断next是否元素节点（有意义文本）
	  3.更新next，继续寻找兄弟节点
	    判断next是否为空，如果空返回false，如果不空重复步骤2*/ 
function getNext(obj,type){
	type=type==undefined?true:type;
	if(type){//忽略文本
		var next=obj.nextSibling;
		if(next==null){
			return false;
		}
		//next的类型是注释或文本,更新节点
		while(next.nodeType==8||next.nodeType==3){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}else{//不能忽略文本
		var next=obj.nextSibling;
		if(next==null){
			return false;
		}
		//next的类型是注释或文本,更新节点
		while(next.nodeType==8||(next.nodeType==3&&!(next.nodeValue.replace(/^\s+|\s+$/g,"")))){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}
/*十一、insertAfter(obj,div,true)
给元素最后面插一个元素
obj  要插入的位置
div  要插入的元素
type  类型true  忽略文本
	      false  不能忽略文本  
思路：1.是否有下一个兄弟节点
	  	1.1.有兄弟节点往下一个兄弟节点的前面插入元素
	  2.没有兄弟节点
	  	2.1.直接往父元素后面插入*/
function insertAfter(obj,div,type){
	type=type==undefined?true:type;
	var next=getNext(obj,type);
	var parent=obj.parentNode;
	if(next){
		parent.insertBefore(div,next);
	}else{
		parent.appendChild(div);
	}
}
/*十二、获取obj的上一个兄弟节点（同十）
如果有兄弟节点则返回该节点，如果没有直接返回false
getprevious(obj,true)
obj  指定的对象
type  类型true  忽略文本（默认）
	      false  不能忽略文本
思路：1.判断是否有上一个兄弟节点(previous)。如果没有返回false
	  2.有 判断previous是否元素节点（有意义文本）
	  3.更新previous，继续寻找兄弟节点
	    判断previous是否为空，如果空返回false，如果不空重复步骤2*/
function getPrevious(obj,type){
	type=type==undefined?true:type;
	if(type){//忽略文本
		var next=obj.previousSibling;
		if(next==null){
			return false;
		}
		//next的类型是注释或文本,更新节点
		while(next.nodeType==8||next.nodeType==3){
			next=next.previousSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}else{//不能忽略文本
		var next=obj.previousSibling;
		if(next==null){
			return false;
		}
		//next的类型是注释或文本,更新节点
		while(next.nodeType==8||(next.nodeType==3&&!(next.nodeValue.replace(/^\s+|\s+$/g,"")))){
			next=next.previousSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}


