var innerBox = $('#innerBox'),
    subInnerBox = $('#subInnerBox'),
    menuItem = $('#menuContent > .menu-item'),
    subMenu = $('.sub-menu'),
    banner = $('#ban'),
    bannerSlide = $('#banner div'),
    floor1Nav = $('#floor1-nav > .cloth'),
    floor2Nav = $('#floor2-nav > .cloth'),
    subBox1 = $('#floor1 .sub-box'),
    subBox2 = $('#floor2 .sub-box'),
    rightNav = $('#right-nav > .main > .nav'),
    rightNavSub = $('#right-nav > .sub-menu > .nav'),
    index = 0,
    timer = null,
    bannerIndex = 0,
    floor1Index = 0,
    floor2Index = 0,
    rightNavIndex = 0,
    len = bannerSlide.length;

var shopShow = function() {

    // 购物车一级菜单 鼠标事件
    innerBox.mouseover(function(event) {
        changeImg(1);
    }).mouseout(function(event) {
        changeImg(0);
    });
    // 购物车二级菜单 鼠标事件
    subInnerBox.mouseover(function(event) {
        changeImg(1);
    }).mouseout(function(event) {
        changeImg(0);
    });
}

var slideImg = function() {
    // 商品分类主菜单
    for (var i = 0; i < menuItem.length; i++) {
        menuItem.eq(i).prop('data-index', i);
        menuItem.eq(i).mouseover(function(event) {
            index = $(this).prop('data-index');
            changeImg1(1, index);
        }).mouseout(function(event) {
            index = $(this).prop('data-index');
            changeImg1(0, index);
        });
    }
    // 子菜单
    subMenu.mouseover(function(event) {
        changeImg1(1, index);
    });
    subMenu.mouseout(function(event) {
        changeImg1(0, index);
    });

    // 轮播图 鼠标事件
    banner.mouseout(function(event) {
        timer = setInterval(function() {
            bannerIndex++;
            if (bannerIndex >= len) {
                bannerIndex = 0;
            }
            console.log(bannerIndex);
            changeImg2();
        }, 1000);
    });

    banner.mouseover(function(event) {
        clearTimeout(timer);
    });

    banner.triggerHandler('mouseout');

    // 小圆点 点击事件
    for (var d = 0; d < len; d++) {
        //给所有span添加一个id的属性，值为d，作为当前span的索引
        $('#dots span').eq(d).prop('data-index', d);

        $('#dots span').click(function(event) {
            bannerIndex = $(this).prop('data-index');
            changeImg2();
        });
    }

    // 上一张按钮 点击事件
    $('#prev').click(function(event) {
        bannerIndex--;
        if (bannerIndex < 0)
            bannerIndex = len - 1;
        changeImg2();
    });

    // 下一张按钮 点击事件
    $('#next').click(function(event) {
        bannerIndex++;
        if (bannerIndex >= len)
            bannerIndex = 0;
        changeImg2();
    });

    // 一楼楼层区 鼠标事件
    for (var i = 0; i < floor1Nav.length; i++) {
        floor1Nav.eq(i).prop('data-index', i);
        floor1Nav.eq(i).mouseover(function(event) {
            /* Act on the event */
            floor1Index = $(this).prop('data-index');
            changeCloth();
        });
    }

    // 一楼楼层区 鼠标事件
    for (var i = 0; i < floor2Nav.length; i++) {
        floor2Nav.eq(i).prop('data-index', i);
        floor2Nav.eq(i).mouseover(function(event) {
            /* Act on the event */
            floor2Index = $(this).prop('data-index');
            changeCloth();
        });
    }

    // 右侧导航 鼠标事件
    for (var i = 0; i < rightNav.length; i++) {
        rightNav.eq(i).prop('data-index', i);
        rightNav.eq(i).mouseover(function(event) {
            /* Act on the event */
            rightNavIndex = $(this).prop('data-index');
            changeImg3();
        });
    }

    rightNav.mouseout(function(event) {
        /* Act on the event */
        for (var i = 0; i < len; i++) {
            rightNavSub.eq(i).removeClass('active');
        }
    });
}

// 购物车主菜单和子菜单
var changeImg = function(choice) {
    if (choice) {
        $("#subInnerBox").css({
            display: 'block',
        });
        $("#innerBox").css({
            background: '#fff',
            color: 'red'
        });
        $("#innerBox > span > img").eq(0).attr({
            src: 'img/icon/25.png'
        });
        $("#innerBox > span > img").eq(1).attr({
            src: 'img/icon/24.png'
        });
    } else {
        subInnerBox.css({
            display: 'none'
        });
        $("#innerBox").css({
            background: 'red',
            color: '#fff'
        });
        $("#innerBox > span > img").eq(0).attr({
            src: 'img/icon/26.png'
        });
        $("#innerBox > span > img").eq(1).attr({
            src: 'img/icon/23.png'
        });
    }
}
//  商品分类主菜单和子菜单
var changeImg1 = function(choice, index) {
    if (choice) {
        menuItem.eq(index).css({
            color: 'red',
            background: '#fff'
        });
        menuItem.eq(index).children('img').attr({
            src: 'img/icon/24.png'
        });
        subMenu.eq(index).css({
            display: 'block',
        });
    } else {
        menuItem.eq(index).css({
            color: '#fff',
            background: 'red'
        });
        menuItem.eq(index).children('img').attr({
            src: 'img/icon/23.png'
        });
        subMenu.eq(index).css({
            display: 'none',
        });
    }
}
// 小圆点
var changeImg2 = function() {
    for (var i = 0; i < len; i++) {
        bannerSlide.eq(i).removeClass('slide-active');
        $('#dots span').eq(i).removeClass('active');
    }
    bannerSlide.eq(bannerIndex).addClass('slide-active');
    $('#dots span').eq(bannerIndex).addClass('active');
}
// 楼层区交互
var changeCloth = function() {
    for (var i = 0; i < floor1Nav.length; i++) {
        subBox1.eq(i).removeClass('active');
        subBox2.eq(i).removeClass('active');
        floor1Nav.eq(i).removeClass('active');
        floor2Nav.eq(i).removeClass('active');
    }
    subBox1.eq(floor1Index).addClass('active');
    subBox2.eq(floor2Index).addClass('active');
    floor1Nav.eq(floor1Index).addClass('active');
    floor2Nav.eq(floor2Index).addClass('active');
}
// 右侧导航
var changeImg3 = function() {
    for (var i = 0; i < len; i++) {
        rightNavSub.eq(i).removeClass('active').css('right', '0px');;
    }
    rightNavSub.eq(rightNavIndex).addClass('active');
    rightNavSub.eq(rightNavIndex).stop().animate({ right: '80px' });
}

$(document).ready(function(event) {
    shopShow();
    slideImg();
});