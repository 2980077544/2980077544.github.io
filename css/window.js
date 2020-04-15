/*******************
 * Luaguage:Chinese 语言:简体中文
 *******************
 * 项目由Yuanwow制作于2020年开发
 * 请您在任何情况务必保留此注释,这是对原作者的尊重行为.
 * 转载请注明项目地址和相关信息.
 * 此系统用于需要模拟类似操作系统多窗口于浏览器端的相关业务和需求.
 * 请在明显位置注明项目地址和原作者的情况下对此项目进行使用,转载,开发,研究,学习,二次开发等.
 * 如果你执行上列操作视为你默认遵守此声明并为依此做出的一切行为负责.
 * 由此引发的任何纠争行为和违法当地法律的行为,原作者不为此负任何责任.
 * 请不要钻以上声明的规则漏洞,谢谢配合.
 * CSDN博客: blog.csdn.net/yuanwow
 * Github  : github.com/2980077544
*******************/
//ps.mmp手机浏览器不支持更改alert样式,所以这一段代码先搁置下来吧...
//额外注释:如果你不需要针对手机用户做优化可以把这一段代码的注释去掉
/*
window.alert = function(str)
	    {
	        alert("cs");
	     var shield = document.createElement("DIV");
	     shield.id = "shield";
	     shield.style.position = "absolute";
	     shield.style.left = "0px";
	     shield.style.top = "0px";
	     shield.style.width = "100%";
	     shield.style.height = document.body.scrollHeight+"px";
	     //弹出对话框时的背景颜色
	     shield.style.background = "#fff";
	     shield.style.textAlign = "center";
	     shield.style.zIndex = "18000";
	     //背景透明 IE有效
	     //shield.style.filter = "alpha(opacity=0)";
	     var alertFram = document.createElement("DIV");
	     alertFram.id="alertFram";
	     alertFram.style.position = "absolute";
	     alertFram.style.left = "50%";
	     alertFram.style.top = "50%";
	     alertFram.style.marginLeft = "-225px";
	     alertFram.style.marginTop = "-75px";
	     alertFram.style.width = "450px";
	     alertFram.style.height = "150px";
	     alertFram.style.background = "#ff0000";
	     alertFram.style.textAlign = "center";
	     alertFram.style.lineHeight = "150px";
	     //alertFram.style.zIndex = "300";
	     strHtml = "<ul style=\"list-style:none;margin:0px;padding:0px;width:100%\">\n";
	     strHtml += " <li style=\"background:#DD828D;text-align:left;padding-left:20px;font-size:14px;font-weight:bold;height:25px;line-height:25px;border:1px solid #F9CADE;\">[自定义提示]</li>\n";
	     strHtml += " <li style=\"background:#fff;text-align:center;font-size:12px;height:120px;line-height:120px;border-left:1px solid #F9CADE;border-right:1px solid #F9CADE;\">"+str+"</li>\n";
	     strHtml += " <li style=\"background:#FDEEF4;text-align:center;font-weight:bold;height:25px;line-height:25px; border:1px solid #F9CADE;\"><input type=\"button\" value=\"确 定\" οnclick=\"doOk()\" /></li>\n";
	     strHtml += "</ul>\n";
	     alertFram.innerHTML = strHtml;
	     document.body.appendChild(alertFram);
	     document.body.appendChild(shield);
	     //var ad = setInterval("doAlpha()",5);
	     this.doOk = function(){
	         alertFram.style.display = "none";
	         shield.style.display = "none";
	     }
	     alertFram.focus();
	     document.body.onselectstart = function(){return false;};
	    }
//注释到此为止*/
var debug=false;//切勿在生产环境启用!
var ww=window.innerWidth;//窗口宽计算
var wh=window.innerHeight;//窗口长计算
var gwinz=100;//窗口顺序序列
var wid=1;//显示窗口标识(可统计)
var tasklist=[];//任务名称列表
var taskid=[];//任务id列表
var dtasklist;//任务名称列表镜像(字符串形式)
var dtaskid;//任务id列表镜像(字符串形式)
var touche=false;//多指拖动兼容开关
var alflag=0;//多指拖动异常容错
var touchi=0;//多指拖动兼容
var taskuse=false;
var tskid="list";
    function tasklistshow(){
        if(!taskuse) return;
        try{
        if(dtasklist==tasklist.toString()&&dtaskid==taskid.toString()){
            if(debug===true) document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+"Debug:没有必要刷新<br>";
            return;
        }
        /*任务栏有改动再调用此函数!*/
        var str="";
        var flg=0;
        tasklist.forEach(function (item, idnex, array) {
            if(item!=""&&item!=null&&taskid[idnex]!=0) str=str+'<activation style="border:none;border-left:1px solid pink;border-right:1px solid pink">'+item+'</activation>';
            //else flg=1;
        });
        /*
        while(flg>=0){
            flg=-1;
            if(taskid.length<=1) break;
            taskid.forEach(function (item, idnex, array) {
                if(item<=0||item===null){
                    flg=idnex;
                }
            });
            if(flg==-1) break;
            for(var i=flg;i<tasklist.length-1;i++){
                tasklist[i]=tasklist[i+1];
                taskid[i]=taskid[i+1];
            }
        }
        */
        //document.getElementById("list").style.display="none";
        document.getElementById(tskid).innerHTML=str;
        //镜像值储存
        dtasklist=tasklist.toString();
        dtaskid=taskid.toString();
        }catch(e){
            if(debug===true) document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+"Error:"+e+"<br>";
        }
    }
function Brtype()
{
var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
/*
if (isIE) 
{
var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
reIE.test(userAgent);
var fIEVersion = parseFloat(RegExp["$1"]);
if(fIEVersion == 7)
{ return "IE7";}
else if(fIEVersion == 8)
{ return "IE8";}
else if(fIEVersion == 9)
{ return "IE9";}
else if(fIEVersion == 10)
{ return "IE10";}
else
{ return "0"}//IE版本过低
}//isIE end
*/
if(isIE){ return "IE";}
if (isFF) { return "FF";}
if (isOpera) { return "Opera";}
if (isSafari) { return "Safari";}
if (isChrome) { return "Chrome";}
if (isEdge) { return "Edge";}
}//myBrowser() end
//var userbrt=Brtype();
function ifbr()
{
var userAgent = navigator.userAgent;
var isOpera = userAgent.indexOf("Opera") > -1;
var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
var isEdge = userAgent.indexOf("Edge") > -1;
var isFF = userAgent.indexOf("Firefox") > -1;
var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
if(isIE){ return false;}
if (isFF) { return true;}
if (isOpera) { return false;}
if (isSafari) { return false;}
if (isChrome) { return true;}
if (isEdge) { return true;}
alert("浏览器支持\n无法检测你的浏览器名称.");
return false;
}//myBrowser() end
if(ifbr()!==true) alert("浏览器支持\n你的浏览器可能不支持部分功能.");
    function mywin(){
    if(debug===true) document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+"Debug:New window:"+wid+"<br>";
    //alert("");
    //alert(ww+","+wh);
    this.flag = false;
    this.cur = {x:0,y:0}
    this.wid=wid++;
    this.tou=0;
    //var nx,ny,dx,dy,x,y ;
    /*
    this.debug=function(){
        alert(this.wid+" "+this.flag+" "+this.cur.x+" "+this.cur.y+" "+gwinz);
    }
    */
    this.new=function(img,title,text,quit){
        //alert("run");
    var oA = document.createElement("div");
    //alert("create");
    this.oaid="wa"+this.wid;
    //alert("rand");
    oA.id=this.oaid;
    oA.className = "w";
    document.body.appendChild(oA);
    //var cc=document.getElementById(w);
    var oB=document.createElement("div");
    //alert("adda");
    this.obid="wb"+this.wid;
    oB.id=this.obid;
    oB.className = "t";
    //oB.innerHTML("<img src=\""+img+"\">"+title);
    oA.appendChild(oB);
    var oC=document.createElement("div");
    this.ocid="wc"+this.wid;
    oC.id=this.ocid;
    oC.className = "m";
    //oC.innerHTML(text);
    oA.appendChild(oC);
    if(quit){
    var oD=document.createElement("div");
    this.odid="wd"+this.wid;
    oD.id=this.odid;
    oD.className = "c";
    oA.appendChild(oD);
    }
    //alert("add");
    this.div1 = document.getElementById(this.oaid);//windows
    this.div2 = document.getElementById(this.obid);//title
    this.div3 = document.getElementById(this.ocid);//main
    if(quit) this.div4 = document.getElementById(this.odid);//close
    else this.div4=null;
    //alert("add ok");
    this.div2.innerHTML="<img src=\""+img+"\">"+title;
    this.div3.innerHTML=text;
    if(quit) this.div4.innerHTML="x";
    //alert(this.oaid+" "+this.obid+" "+this.ocid);
    //wid++;
    if(!quit) this.div2.style.width="200px";
    this.taskshow();
    }
    
    this.use=function(w,t,m,c){
    this.div1 = document.getElementById(w);//windows
    this.div2 = document.getElementById(t);//title
    this.div3 = document.getElementById(m);//main
    if(c!==null) this.div4 = document.getElementById(c);//close
    else this.div4=null;
    //wid++;
    this.taskshow();
    }
    
    this.close=function(){
        //this.taskshow();
        //alert(this.div1);
        this.div1.style.display="none";
        //alert(this.div1);
        try{
        //alert(this.div1);
        var inn=this.div2.innerHTML;
        inn=inn.toString();
        tasklist.forEach(function (item, idnex, array) {
        //alert(this.div1);
        var tmp=item.toString();
        //document.body.removeChild(this.div1);
        if(tmp.indexOf(inn)!=-1){
            tasklist[idnex]="";
            taskid[idnex]=0;
        }
        //else alert(inn+"\n"+tmp);
        }.bind(this));
        }catch(e){
            //document.body.innerHTML=e;
            //ps.他妈的,排查这么久原来是function的作用范围(this的问题)
        }
        document.body.removeChild(this.div1);
        this.taskshow();
    }
    this.down=function(){
        if(touche){
        this.tou=touchi;
        if(alflag<1) this.tou=0;
        touchi++;
        alflag++;
        }
        this.taskshow();
        this.flag = true;
        var touch ;
        if(event.touches){
            touch = event.touches[this.tou];
        }else {
            touch = event;
        }
        this.cur.x = touch.clientX;
        this.cur.y = touch.clientY;
        this.dx = this.div1.offsetLeft;
        this.dy = this.div1.offsetTop;
        this.div1.style.zIndex=gwinz++;
    }
    this.activation=function(){
        if(debug===true) document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+"Debug:Activation"+this.div1.innerHTML+"<br>";
        try{
        this.div1.style.zIndex=gwinz++;
        //ps.他妈的,这个不知道和哪里冲突,琢磨好久,这个玩意一点反应都没有...
        //ps.查到点击事件冲突问题,最后解决了.
        }catch(e){
            if(debug===true) document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+"Error:"+e+"<br>";
        }
    }
    this.move=function(){
        this.taskshow();
        if(this.flag){
            var touch;
            if(event.touches){
                touch = event.touches[this.tou];
            }else {
                touch = event;
            }
            this.nx = touch.clientX - this.cur.x;
            this.ny = touch.clientY - this.cur.y;
            this.x = this.dx+this.nx;
            this.y = this.dy+this.ny;
            //alert("");
            if(this.x+50>=0&&this.x+150<=ww){
            this.div1.style.left = this.x+"px";
            //div1.style.top = y +"px";
            }
            if(this.y>=0&&this.y+50<=wh){
            this.div1.style.top=this.y+"px";
            }
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove",function(){
                event.preventDefault();
            },false);
        }
    }
    //鼠标释放时候的函数
    this.end=function(){
        this.flag = false;
        if(touche){
        this.tou=0;
        touchi--;
        alflag--;
        if(touchi<0) touchi=0;
        }
        this.taskshow();
    }
    /*
    this.div1 = document.getElementById(windows);//windows
    this.div2 = document.getElementById(title);//title
    this.div3 = document.getElementById(main);//main
    */
        //加载任务栏模块
    this.taskshow=function(){
        tasklistshow();
        if(debug===true) document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+"Debug:Taskshow<br>";
        var tag_activation=document.getElementsByTagName('activation');
        var leng=tag_activation.length;
        for(i=0;i<leng;i++){
            if(taskid[i]==this.wid){
                tag_activation[i].onclick=this.activation.bind(this);
                if(debug===true) document.getElementById("debug").innerHTML=document.getElementById("debug").innerHTML+"Debug:New chick thing"+i+" "+taskid[i]+" "+this.wid+" "+"<br>";
            }
        }
        //document.getElementById("list").style.display="block";
    }
    this.lock=0;
    this.inner=function(){
        if(this.div1==null||this.div2==null||this.div3==null||this.lock==1){
            alert('此站点的Javascript产生了逻辑错误,请联该系站点管理员解决!');
            return;
        }
        this.lock=1;
        //wid++;
        //alert("载入...");
        this.div1.addEventListener("mousedown",this.down.bind(this),false);
    this.div1.addEventListener("touchstart",this.down.bind(this),false);
    this.div2.addEventListener("mousemove",this.move.bind(this),false);
    this.div2.addEventListener("touchmove",this.move.bind(this),false);
    document.body.addEventListener("mouseup",this.end.bind(this),false);
    this.div2.addEventListener("touchend",this.end.bind(this),false);
    if(this.div4!==null) this.div4.onclick=this.close.bind(this);
    this.div1.style.top=(wid%10*18+20)+"px";
    this.div1.style.left=(wid%10*16+40)+"px";
    //*重要:维护任务队列,关键数据
    tasklist.push(this.div2.innerHTML);
    taskid.push(this.wid);
    this.taskshow();
    //alert("完毕");
    }
    }
    //obj=new mywin(窗口div,标题div,内容div);
    function xif(){
        //异常情况热修复
        try{
        //参数重载
        touchi=0;
        alflag=0;
        gwinz=100;
        ww=window.innerWidth;
        wh=window.innerHeight;
        if(touche) tmp="启用";
        else tmp="禁用";
        if(confirm("是否启用多指拖动兼容?\n启用时可能引发未知的问题.\n当前启用状态:"+tmp)) touche=true;
        else touche=false;
        //位置重载
        var tm=document.getElementsByTagName("div");
        for(var i=0;i<tm.length;i++){
            if(tm[i].className==="w"){
                tm[i].style.zIndex=gwinz++;
                tm[i].style.top=0;
                tm[i].style.left=0;
            }
        }
        }catch(e){
            alert("热修复失败!");
        }finally{
            alert("热修复成功!");
        }
    }
    var win_d=[];
    //var tasklistshow_v=window.setInterval("tasklistshow()",200);
    //alert("[提示]*模块加载*\n模块加载完成!");
    alert("由YuanwowJsOS提供服务\n使用模块版本编号:[b16.7.4.2]\n此系统用于需要模拟类似操作系统多窗口于浏览器端的相关业务和需求.\n请在注明项目地址和原作者的情况下对此项目进行使用,转载,开发,二次开发等");