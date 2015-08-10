/*
 * H5 canvas 注入式游戏框架
 * www.dingdingwenan.com
 * 新浪微博 @丁丁文案
 * */
var G = {
    res: [],
    timer: 0,
    fps: 64,
    spirits: [],
    speed: 3000,
    timerFPS: 0,
    gameTime: 0,
    debug: true,//config
    loadingRes: [],//config
    player: {
        x: 0,
        y: 0,
        w: 100,
        y: 100
    },
    loadingResFn: function () {
    },//config
    loadingResEnd: function () {
        //config
    },
    loopingBefpre: function () {//config

    },
    loopingAfter: function () {
    },
    loopingSpirit: function (spirit) {
    },//config
    playerLooping: function () {
    },//config
    gameStatus: "loadingRes",//loadingRes,resLoaded,ready,looping,stop,over.
    config: function (conf) {
        conf.loadingRes != undefined ? G.loadingRes = conf.loadingRes : false;
        conf.loopingBefpre != undefined ? G.loopingBefpre = conf.loopingBefpre : false;
        conf.playerLooping != undefined ? G.playerLooping = conf.playerLooping : false;
        conf.loopingSpirit != undefined ? G.loopingSpirit = conf.loopingSpirit : false;
        conf.loopingAfter != undefined ? G.loopingAfter = conf.loopingAfter : false;
        conf.loadingResFn != undefined ? G.loadingResFn = conf.loadingResFn : false;
        conf.loadingResEnd != undefined ? G.loadingResEnd = conf.loadingResEnd : false;
        conf.debug != undefined ? G.debug = conf.debug : false;
        conf.debug != undefined ? G.debug = conf.debug : false;
    },
    start: function () {
        if (G.gameStatus === "ready") {
            G.gameStatus = "looping";
        }
    },
    zt: function () {
        switch (G.gameStatus) {
            case "looping":
                G.gameStatus = "stop";
                break;
            case "stop":
                G.gameStatus = "looping";
                break;
        }
    },
    out: function (s) {
        if (G.debug) {
            console.dir(s);
        }
    },
    resetTimer: function () {
        G.timerFPS = setInterval(function () {
            switch (G.gameStatus) {
                case "loadingRes":
                    G.out("判断载入资源是否完毕中");
                    var resLoadedCount = 0
                    for (i = 0; i < G.loadingRes.length; i++) {
                        if (!G.loadingRes[i].loaded) {
                            var img = new Image();
                            img.index = i;
                            img.src = G.loadingRes[i].src;
                            img.name = G.loadingRes[i].name;
                            G.out("正在载入:" + img.name);
                            img.onload = function () {
                                G.out("已经载入:" + this.name);
                                G.res[this.name] = this;
                                G.loadingRes[this.index].loaded = true;
                            }
                        } else {
                            resLoadedCount++;
                            //G.loadingResFn(resLoadedCount, G.loadingRes.length);//给出载入的 和 总共的
                        }
                    }
                    if (resLoadedCount === G.loadingRes.length) {
                        G.out("资源全部载入完毕");
                        G.loadingResEnd();//全部资源载入后执行
                        G.gameStatus = "ready";
                        G.speed = 1000 / G.fps;
                        G.resetTimer();
                    }
                    G.out(resLoadedCount);
                    break;
                case "resLoaded":
                    break;
                case "ready":
                    break;
                case "looping":
                    G.timer += 1000 / G.fps;
                    if (G.timer > 1000) {
                        G.gameTime += 1;
                        G.out(G.gameTime);
                        G.timer = 0;
                    }
                    c.clearRect(0, 0, canvas.width, canvas.height);
                    G.loopingBefpre();//用于渲染背景
                    G.playerLooping(G.player);//渲染角色（玩家控制）
                    for (i = 0; i < G.spirits.length; i++) {
                        var spirit = G.spirits[i];
                        G.loopingSpirit(spirit,i);//渲染精灵
                    }
                    G.loopingAfter();//渲染分数等
                    break;
                case "stop":
                    break;
                case "over":
                    break;
            }
        }, G.speed);
    },
    init: function () {
        G.out("初始化画布");
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
        c = canvas.getContext('2d');
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = "#ff0000";
        //c.fillRect(0, 0, canvas.width, canvas.height);
        G.out("初始化画布完毕");
        var gameTime = 0;
        G.resetTimer();
    }
}