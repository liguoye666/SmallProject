(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);


;
(function($) {
    function Picture($elem, options) {
        this.$elem = $elem;
        this.$item = null;
        this.$layer = null;
        this._init();
    }
    // 初始化
    Picture.prototype._init = function() {
        this.insertPic();
        this.widthAndHeight();
        this.showPic();
    }
    // 生成并插入图片
    Picture.prototype.insertPic = function() {
        for (var i = 0; i < 28; i++) {
            this.$elem.append(`<li class="item"><img src="images/${i+1}.jpg"></li>`);
        }
        this.$item = this.$elem.find('.item');
    };
    // 改变图片显示的宽高
    Picture.prototype.widthAndHeight = function() {
        var width, height;
        for (var i = 0; i < this.$item.size(); i++) {
            width = this.$item.eq(i).width();
            height = this.$item.eq(i).height();
            if (width !== height) {
                this.$item.eq(i).height(width);
            }
        }
    };

    // 绑定点击事件，显示大图
    Picture.prototype.showPic = function() {
        this.$layer = $('.layer');
        var self = this;
        this.$elem.on('click touchstart', 'img', function(e) {
            e.preventDefault();
            var src = this.src;
            // var scrollTop = $(window).scrollTop();
            self.$layer.append(`<img src="${src}">`).css({
                display: 'flex'
                // top: scrollTop
            });
            self.calPic(self.$layer.find('img'));
        });
        this.$layer.on('click touchstart', function(e) {
            e.preventDefault();
            $(this).hide();
            $(this).html('');
        });
    };

    // 计算图片的宽高比，判断是横图还是竖图
    Picture.prototype.calPic = function(img) {
        var width, height;
        width = img.width();
        height = img.height();
        if ((height / width) > 1.2) {
            img.css('height', '100%');
        } else {
            img.css('width', '100%');
        }
    };
    // 添加为插件
    $.extend($.fn, {
        picture: function(options) {
            return this.each(function() {
                var $this = $(this),
                    picture = $this.data('picture');
                if (!picture) { //解决多次调用dropdown问题
                    $this.data('picture', picture = new Picture($this, options));
                }
                if (typeof picture[options] === 'function') {
                    picture[options]();
                }
            });
        }
    });

})(Zepto);


$(function() {
    $('.container').picture();
})