var list = document.querySelector("ul.list");
var audio = document.querySelector("audio");
var play = document.querySelector(".play");
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
var stage = document.querySelector(".stage");
var h3 = document.querySelector("h3");
var h5 = document.querySelector("h5");
var progress = document.querySelector(".progress input");
var current = 0;
var volume=document.querySelector('.box1')
var mask=document.querySelector('.box2')
// 初始化
// list歌曲列表展示
playlist.forEach(function (element, index) {
    // console.log(element.id);
    var node = document.createElement("li");
    node.innerText = element.name;
    list.appendChild(node);

    var colomn = document.createElement('i');
    node.appendChild(colomn)
});

// 根据歌曲id 返回歌曲 url
function countUrl(id) {
    return "https://music.163.com/song/media/outer/url?id=" + id + ".mp3";
}

// 初始化第一首歌
changeSong(playlist[current]);

// 切换歌曲
function changeSong(obj) {
    audio.volume=volume.value
    mask.style.width=108*volume.value +'px'
    // 切换url
    audio.src = countUrl(obj.id);
    h3.innerText = obj.name;
    h5.innerText = obj.artists;

    document.querySelector(".glue img").src = obj.picUrl;
    document.querySelector(".mask").style.backgroundImage = 'url("' + obj.picUrl + '")';

    document.querySelectorAll("ul.list li").forEach(function (element, index) {
        if (index == current) {
            //console.log(element)
            //console.log(element.getElementsByTagName('i'))
            element.getElementsByTagName('i')[0].removeClass='fa fa-volume-down';
            var colomn=element.getElementsByTagName('i')[0]
            colomn.className='fa fa-volume-down'
        } else {
            //console.log(element.childNodes)
            element.getElementsByTagName('i')[0].removeAttribute('class')
        }
    });
}

// 控制播放状态
play.onclick = function () {
    // 判断播放状态
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
};

// 监听播放状态
audio.onplay = function () {
    // 更改stage 的播放状态 添加class
    stage.classList.add("playing");
    // 切换按钮
    $('.play i').removeClass('fa fa-play')
    $('.play i').addClass('fa fa-pause')
};
audio.onpause = function () {
    // 更改stage 的播放状态
    stage.classList.remove("playing");
    // 切换按钮
    $('.play i').removeClass('fa fa-pause')
    $('.play i').addClass('fa fa-play')
};

audio.ontimeupdate = function () {
    // console.log(this.currentTime, this.duration);
    if (isNaN(this.duration)) {
        return;
    }
    // 更新进度条
    progress.value = (this.currentTime / this.duration) * 100;
    // console.log(progress.value);

    // 更新时间
    document.querySelectorAll(".time span")[0].innerText = countTime(this.currentTime);
};

progress.onchange = function () {
    console.log(this.value);
    audio.currentTime = (this.value * audio.duration) / 100;
};

function countTime(n) {
    var n = Math.floor(n);
    var m = Math.floor(n / 60);
    var s = n % 60;
    m = m > 9 ? m : "0" + m;
    s = s > 9 ? s : "0" + s;
    return m + ":" + s;
}

audio.ondurationchange = function () {
    document.querySelectorAll(".time span")[1].innerText = countTime(this.duration);
};

// 列表顺序播放
audio.onended = function () {
    current++;
    if (current > playlist.length - 1) {
        // 重新从第一首播放
        current = 0;
    }
    changeSong(playlist[current]);
};

// 歌曲切换
document.querySelector('.prev').onclick = function () {
    current--;
    if (current < 0) {
        current = playlist.length - 1;
    }
    changeSong(playlist[current]);
}
document.querySelector('.next').onclick = function () {
    current++;
    if (current > playlist.length - 1) {
        current = 0;
    }
    changeSong(playlist[current]);
}

// 音量设置
volume.onchange=function(){
    console.log(this.value)
    audio.volume=this.value;
    mask.style.width=108*volume.value +'px'
}