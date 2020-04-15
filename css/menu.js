/* This is Yuanwow made at 2020.3.19.
 * It is a good function of making menu.
 * I think it's helpful for you.
 * This is some info of me.
 ****************************
 Blog  *blog.csdn.net/yuanwow
 Github*github.com/2980077544
 ****************************
  Sorry,I'm not good at English.:)
  开头标记写英文为了方便其它国家的人看.
  而中间注释使用中文撰写的是方便自己看.
*/
var menu_id=1;

function bindmenu(){
    this.m=[];//菜单内容维护..
    this.c=[];//菜单点击事件维护..
    
    //移出菜单
    this.remove=function(){
        this.div.style.display="none";
        document.body.removeChild(this.div);
    }
    //载入菜单
    this.lock=0;
    this.inner=function(){
        if(this.lock==1) return;
        this.lock=1;
        try{
        this.id=menu_id++;
        this.obj=document.createElement("menu_div");
        this.id="mymenu_"+menu_id;
        this.obj.id=this.id;
        this.obj.className = "menudiv";
        //obj.innerHTML=text;
        document.body.appendChild(this.obj);
        this.div = document.getElementById(this.id);
        this.closeobj=document.createElement("menu_close");
        this.closeid="mymenu_close_"+menu_id;
        this.closeobj.id=this.closeid;
        this.closeobj.className = "close";
        //closeobj.innerHTML="x";
        this.div.appendChild(this.closeobj);
        this.close=document.getElementById(this.closeid);
        this.close.innerHTML = "x";
        this.sobj=document.createElement("menu_s");
        this.sid="mymenu_s_"+menu_id;
        this.sobj.id=this.sid;
        this.sobj.className = "menus";
        //closeobj.innerHTML="x";
        this.div.appendChild(this.sobj);
        this.s=document.getElementById(this.sid);
        this.s.innerHTML = "菜单为空...";
        //alert("inner");
        }catch(e){
            alert("*MenuJs项目*\n异常抛出:"+e.name+":"+e.message);
            return;
        }
        console.log("add new menu and this id is '"+this.id+"'");
        //开始我是想用alert的,感觉太明显了,就换成console.log了.
    }
    //直接写入文本(不推荐)
    this.writetext=function(text){
        this.s.innerHTML=text;
    }
    
    //返回菜单div对象
    this.getmenu=function(){
        return this.div;
    }
    //新增菜单项,返回菜单项id
    this.adddata=function(text,click){
        //if(u===null) u=0;
        this.m.push(text);
        this.c.push(click);
        return this.m.length;
    }
    
    //安全移出菜单项,返回移出的id
    this.rmdata=function(id){
        var j=this.m.length;
        for(var i=id;i<j;i++){
            this.m[i]=this.m[i+1];
            this.c[i]=this.c[i+1];
        }
        return id;
    }
    
    //读取菜单项(返回菜单项id数组)
    this.get=function(){
        return this.m;
    }
    
    //更改菜单项(不更改可以填写null)
    this.setdata=function(id,text,uc,click){
        //uc是是否使用click
        if(id===null||uc===null||id<0||id>this.m.length) return false;
        if(text!==null) this.m[id]=text;
        if(click!==null&&uc===true) this.c[id]=click;
        if(uc===false) this.c[id]=null;
        return true;
    }
    
    //读取菜单项详细信息(返回相关数组)
    this.getdata=function(id){
        var text=this.m[id];
        var click=this.c[id];
        var hj={
            id:id,
            text:text,
            click:click
        };
        return hj;
    }
    
    this.output=function(){
        
    }
    
}

alert("*YuanwowMenu*\n此网站使用了YuanwowMenu项目,项目由Yuanwow制作和提供.");
//code e.m.
//var menu=new bindmenu();
//menu.inner();