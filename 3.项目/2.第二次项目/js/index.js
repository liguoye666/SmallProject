(function() {
    // 获取元素
    function Shop(elem) {
        this.elem = document.querySelector(elem);
        this.checkbox = this.elem.querySelectorAll('.checkbox');
        this.checkboxAll = this.elem.querySelector('.checkboxAll');
        this.total = this.elem.querySelectorAll('.item_total');
        this.price = this.elem.querySelectorAll('.item_price');
        this.result = this.elem.querySelector('.total_price_num');
        this.subtract = this.elem.querySelectorAll('.subtract');
        this.add = this.elem.querySelectorAll('.add');
        this.count = this.elem.querySelectorAll('.item_count');
        this.len = this.checkbox.length;
        this._init();
    }
    // 初始化
    Shop.prototype._init = function() {
        this.checkboxAll.checked = true;
        this.ChangeBox(true);
        this.SelectAll();
        this.AllPrice();
        this.Btn();
        this.ChangeCount();
        this.Select();
    }
    // 单选
    Shop.prototype.Select = function() {
        var self = this;
        for (var i = 0; i < this.len; i++) {
            this.checkbox[i].addEventListener('change', function() {
                self.AllPrice();
                self.ChangeSelectAll();
            });
        }
    }

    //全选功能，绑定事件
    Shop.prototype.SelectAll = function() {
        var self = this;
        this.checkboxAll.addEventListener('change', function() {
            if (self.checkboxAll.checked === true) {
                self.ChangeBox(true);
            } else {
                self.ChangeBox(false);
            }
            self.AllPrice();
        });
    }
    // 全选切换所有按钮状态
    Shop.prototype.ChangeBox = function(flag) {
        for (var i = 0; i < this.checkbox.length; i++) {
            this.checkbox[i].checked = flag;
        }
    }
    // 判断是否为全选状态
    Shop.prototype.ChangeSelectAll = function() {
        var arr = new Array(4);
        var self = this;
        for (var i = 0; i < this.checkbox.length; i++) {
            arr[i] = this.checkbox[i].checked;
        }
        for (i in arr) {
            if (arr[i] === false) {
                this.checkboxAll.checked = false;
                break;
            }
            this.checkboxAll.checked = true;
        }
    };

    // 加减按钮功能，绑定事件
    Shop.prototype.Btn = function() {
        var self = this;
        for (var i = 0; i < this.len; i++) {

            this.add[i].setAttribute('data-button', i);
            this.subtract[i].setAttribute('data-button', i);

            this.add[i].addEventListener('click', function() {
                self.operate(this.getAttribute('data-button'), 1);
            });
            this.subtract[i].addEventListener('click', function() {
                self.operate(this.getAttribute('data-button'), -1);
            });
        }
    };
    // 键盘输入数量
    Shop.prototype.ChangeCount = function() {
        var self = this;
        for (var i = 0; i < this.len; i++) {
            this.count[i].setAttribute('data-count', i);
            this.count[i].addEventListener('blur', function() {
                self.operate(this.getAttribute('data-count'), 0);
            });

        }
    };
    // 商品数量变化
    Shop.prototype.operate = function(data, num) {
        var count = this.count[data].value;
        count = +count + +num;
        if (count <= 0) count = 1;
        this.count[data].value = count;
        this.AllPrice();
    }

    // 结算函数 计算所有商品价格总额
    Shop.prototype.AllPrice = function() {
        var price = 0;
        for (var i = 0; i < this.len; i++) {
            this.total[i].innerHTML = this.price[i].innerHTML * this.count[i].value;
            if (this.checkbox[i].checked === true) {
                price += parseInt(this.total[i].innerHTML);
            }
        }
        this.result.innerHTML = price;
        return price;
    }
    // 实例化对象
    var shop = new Shop('#shop');

})();