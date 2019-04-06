window.onload = function() {

    //封装getElementById()的方法
    function byId(id) {
        return typeof(id) === "string" ? document.getElementById(id) : id;
    }

    //全局变量
    var index = 0,
        timer = null,
        title = byId('title').getElementsByTagName('a'),
        content = byId('content').getElementsByTagName('div'),
        main = byId('container'),
        len = title.length;

    function slideImg() {
        //滑过清除定时器，离开继续
        main.onmouseout = function() {
            timer = setInterval(function() {
                index++;
                if (index >= len) index = 0;
                //切换图片
                changeImg();
            }, 1000)
        }
        //滑过清除定时器
        main.onmouseover = function() {
            clearTimeout(timer);
        }
        //遍历所有点击，且绑定点击事件，点击标题切换图片
        for (var i = 0; i < len; i++) {
            title[i].setAttribute("data-id", i);
            title[i].onclick = function() {
                index = this.getAttribute("data-id");
                //调用changeImg，实现切换图片
                changeImg();
            }
        }
        //自动在main上触发鼠标离开的事件
        main.onmouseout();
    }

    //切换图片
    function changeImg() {
        for (var j = 0; j < len; j++) {
            content[j].style.display = 'none';
            title[j].className = "";
        }
        content[index].style.display = 'block';
        title[index].className = "active";
    }

    slideImg();
}