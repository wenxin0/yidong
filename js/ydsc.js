//1.选项卡效果
window.onload=function(){
	//先获取元素
	var nav_right=$(".nav_right");
	var item=$(".item");
	for(var i=0;i<nav_right.length;i++){
		/*先执行的循环后执行的事件，所以当触发事件时
		i=4，报错。解决方法：要给每个元素添加属性*/
		nav_right[i].index=i;
		nav_right[i].onmouseover=function(){
			//this指移到哪个元素就是谁
			item[this.index].style.display="block";
		}
		nav_right[i].onmouseout=function(){
			item[this.index].style.display="none";
		}
	}
	//登录
	var dl=$(".dl");
	var dl1=$(".dl1");
	dl[0].onmouseover=function(){
		dl1[0].style.display="block";
	}
	dl[0].onmouseout=function(){
		dl1[0].style.display="none";
	}
	var sj=$(".sj");
	var sj1=$(".sj1");
	sj[0].onmouseover=function(){
		sj1[0].style.display="block";
	}
	sj[0].onmouseout=function(){
		sj1[0].style.display="none";
	}
//2.轮播图特效
	var win=$(".banner_middle")[0];
	var as=$("a",win);
	var lis=$("li",$(".point")[0]);
	var btnl=$(".btnl",win)[0];
	var btnr=$(".btnr",win)[0];
	var widths=parseInt(getStyle(as[0],"width"));//获取图片尺寸
	var num=0;//定义双下标
	var next=0;//定义双下标
/*思路无缝轮播（双下标）：
1.num记录当前窗口图片的下标 2.next记录即将显示图片的下标
3.在动画前要让下一张图片就位：left=width
4.num left=-width  5.next left=0   6.更新num=next  */
	for(i=0;i<as.length;i++){//初始化状态：将第一张图片放到首先显示地方
		if(i==0){
			continue;
		}
		as[i].style.left=widths+"px";
	}

	win.onmouseover=function(){
		clearInterval(t);
	}
	win.onmouseout=function(){
		t=setInterval(moveL,2000)
	}
//自动轮播	
	var t=setInterval(moveL,2000);
	as[0].style.zIndex=10;
	//选项卡
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){//当前num，下一张this.index
			if(num==this.index){return;}
			as[this.index].style.left=widths+"px";
			lis[num].className="";//将清空此时的颜色类名
			lis[this.index].className="hot";//下一个上色
			animate(as[num],{left:-widths});
			animate(as[this.index],{left:0});
			next=this.index;
			num=this.index;
		}
	}

//右边按钮  左边按钮
	var flag=true;
	btnr.onclick=function(){
		if(flag){
			flag=false;
			moveL();
		}
	}
	btnl.onclick=function(){
		if(flag){
			flag=false;
			moveR();
		}
	}
//动起来
	function moveL(){
		next++;
		if(next==as.length){//限定边界
			next=0;
		}
		as[next].style.left=widths+"px";//就位，在右边就位

		//按钮动画
		lis[num].className="";//将清空此时的颜色类名
		lis[next].className="hot";//下一个上色

		animate(as[num],{left:-widths},function(){flag=true});//动画：当前的图片向左动画-widths
		animate(as[next],{left:0},function(){flag=true});//动画：下一张图片向左动画left=0
		num=next;//更新num=next
	}

	function moveR(){
		next--;
		if(next<0){//限定边界
			next=as.length-1;
		}
		as[next].style.left=-widths+"px";//就位，在右边就位

		//按钮动画
		lis[num].className="";//将清空此时的颜色类名
		lis[next].className="hot";//下一个上色

		animate(as[num],{left:widths},function(){flag=true});//动画：当前的图片向左动画-widths
		animate(as[next],{left:0},function(){flag=true});//动画：下一张图片向左动画left=0
		num=next;//更新num=next
	}

//3.节点特效
var winn=$(".winn")[0];
	nodeLunbo(winn,1);

	function nodeLunbo(obj,shu){
	var btnll=$(".btnll",obj)[0];
	var btnrr=$(".btnrr",obj)[0];
	var imgbox=$(".imgbox",obj)[0];
	var ass=$(".imga",imgbox);
	var widthss=parseInt(getStyle(ass[0],"width"))+10;

	//设置imgbox宽度，动态图片宽度
	imgbox.style.width=widthss*ass.length+"px";
	var u=setInterval(Movell,2000);

	obj.onmouseover=function(){
		clearInterval(u);
	}
	obj.onmouseout=function(){
		u=setInterval(Movell,2000);
	}
	var flag1=true;
	btnll.onclick=function(){
		if(flag1){
			flag1=false;
			Movell();
		}
	}
	btnrr.onclick=function(){
		if(flag1){
			flag1=false;
			Moverr();
		}
	}
	//1.先移动imgbox；2.把第一张图片放到最后(imgbox.style.left=0)
	function Movell(){//先动画，后扒图
		animate(imgbox,{left:-shu*widthss},function(){
			for(var i=0;i<shu;i++){
			var first=firstChild(imgbox);
			imgbox.appendChild(first);
			imgbox.style.left=0;
			}
			flag1=true;
		})
	}

	//1.把最后一张图片插入到最前面；2.移动imgbox
	function Moverr(){//先扒图，后动画
		for(var i=0;i<shu;i++){
		var last=lastChild(imgbox);
		beforeChild(imgbox,last);
		imgbox.style.left=-widthss+"px";
		}
		animate(imgbox,{left:0},function(){
		flag1=true;
	});
	}
}
	
}