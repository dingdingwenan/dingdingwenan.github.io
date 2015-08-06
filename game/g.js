/*
* H5 canvas 游戏框架
* www.dingdingwenan.com
* 新浪微博 @丁丁文案
* */
var G={
    res:[],
    timer:0,
    fps:16,
    spirits:[],
    loadingRes:[],//config
    gameStatus :"loadingRes",//loadingRes,resLoaded,ready,looping,stop,over.
    config:function(conf){
        G.loadingRes=conf.loadingRes;
    },
    start:function(){
        G.gameStatus = "looping";
    },
    zt:function(){
        switch (G.gameStatus) {
            case "looping":
                G.gameStatus = "stop";
                break;
            case "stop":
                G.gameStatus = "looping";
                break;
        }
    },
    init:function(){
        console.log("初始化画布");
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas = document.getElementById('canvas');
        canvas.width = 640;
        canvas.height = height;
        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
        c = canvas.getContext('2d');
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = "#ff0000";
        //c.fillRect(0, 0, canvas.width, canvas.height);
        console.log("初始化画布完毕");
        var gameTime=0;
        setInterval(function () {
            switch (G.gameStatus) {
                case "loadingRes":
                    console.log("判断载入资源是否完毕中");
                    var resLoadedCount = 0;
                    for (i = 0; i < G.loadingRes.length; i++) {
                        if (!G.loadingRes[i].loaded) {
                            var img = new Image();
                            img.index = i;
                            img.src = G.loadingRes[i].src;
                            img.name = G.loadingRes[i].name;
                            console.log("正在载入:" + img.name);

                            img.onload = function () {
                                console.log("已经载入:" + this.name);
                                G.res[this.name] = this;
                                G.loadingRes[this.index].loaded = true;

                            }
                        } else {
                            resLoadedCount++;
                        }
                    }
                    if (resLoadedCount === G.loadingRes.length) {
                        console.log("资源全部载入完毕");

                        var bug = {
                            x: 10,
                            y: canvas.height,
                            w: 60,
                            h: 60,
                            img: G.res.bug
                        }
                        G.spirits.push(bug);

                        G.gameStatus = "ready";
                    }
                    break;
                case "resLoaded":
                    break;
                case "ready":
                    break;
                case "looping":
                    G.timer += 1000/ G.fps;
                    if(G.timer>1000){
                        gameTime+=1;
                        console.log(gameTime);
                        G.timer=0;
                    }
                    c.clearRect(0, 0, canvas.width, canvas.height);

                    for (i = 0; i < G.spirits.length; i++) {
                        var spirit = G.spirits[i];

                        spirit.y -= Math.floor(Math.random() * 5);

                        if (spirit.y < -100) {
                            G.spirits.splice(i, 1);
                        }

                        c.drawImage(spirit.img, spirit.x, spirit.y, spirit.w, spirit.h);
                    }
                    break;
                case "stop":
                    break;
                case "over":
                    break;
            }
        }, 1000/ G.fps);
    }
}