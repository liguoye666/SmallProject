(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 980) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 980) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);

var btn_flag = 0;

// 顶部导航栏下拉菜单
$.fn.UiMenu = function() {
    var ui = $(this);
    var btn = $('.button', ui);
    var list = $('.menu-list');
    // 点击右侧按钮
    btn.on('click', function(event) {
        if (btn_flag == 0) {
            btn_flag = 1;
            list.stop().animate({ top: '0.8rem' }, 500);
        } else {
            btn_flag = 0;
            list.stop().animate({ top: '-3.2rem' }, 500);
        }
        return false;
    });
}

// 页面的脚本逻辑
$(function() {
    $('.menu').UiMenu();
});