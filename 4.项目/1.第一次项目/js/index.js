(function(window, document) {

    // 公共方法集合
    const methods = {
        appendChild(parent, ...children) {
            children.forEach(el => {
                parent.appendChild(el);
            });
        },
    }
    // 构造函数
    let Select = function(elem, options) {
        this._init(elem, options);
    }
    // 初始化
    Select.prototype._init = function(elem, options) {
        this.elem = document.getElementById(elem);
        this.out = document.getElementById('out');
        this.all = []; //保存所有文本
        this.types = []; //保存所有类型
        this.classified = {}; //对文本进行分类
        this.list = []; //保存所有节点
        this.select = null;
        this.dropdown = null;
        this.searchInput = null;
        this.selectInput = null;
        this.li = null;
        this.clickFlag = true; //切换下拉菜单
        this._classify();
        this._createElement();
        this._changeSelect();
        this._changeColor();
        this._searchEvent();
        this._selectInput();
    }
    // 根据原生的select中的每一项提供的类型和值，使用脚本获取，然后进行分类重新显示
    Select.prototype._classify = function() {
        // 获取原生select每一项
        let select_2 = document.getElementById('select_2').querySelectorAll('option');
        select_2.forEach((elem, index) => {
            let value = elem.value;
            let type = elem.getAttribute('type');
            let text = elem.innerText;
            if (!this.types.includes(type)) {
                this.types.push(type);
            }
            if (!Object.keys(this.classified).includes(type)) {
                this.classified[type] = [];
            }
            if (!this.all.includes(text)) {
                this.all.push(text);
                this.classified[type].push(value - 1);
            }

        });

    }
    // 生成DOM
    Select.prototype._createElement = function() {
        for (let type of this.types.values()) {
            let li = [];
            this.list.push(`<div class="menu_type">${type}</div>`);
            this.classified[type].forEach((elem, index) => {
                li.push(`<li class="menu_item">${this.all[elem]}</li>`);
            })
            this.list.push(`<ul>${li.join('')}</ul>`);
        }

        let template =
            `<div class="select_input">
                <input class="select_input_item" type="text" name="text" value="未选择" readonly>
            </div>
			<div class="dropdown_menu">
                <div class="menu_search">
                    <input class="menu_search_item" type="search" name="search" placeholder="搜索">
                </div>
                ${this.list.join('')}
            </div>`;

        this.elem.innerHTML = template;

    };
    // 点击按钮触发下拉菜单，点击其他地方收回
    Select.prototype._selectInput = function() {
        this.selectInput = this.elem.querySelector('.select_input');
        this.selectInput.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.clickFlag) {
                this.dropdown.style.transform = `scale(1, 1) translate(0px, 0px)`;
                this.clickFlag = false;
            } else {
                this.dropdown.style.transform = `scale(1, 0) translate(0px, -50%)`;
                this.clickFlag = true;
            }

        })
        document.body.addEventListener('click', (e) => {
            this.dropdown.style.transform = `scale(1, 0) translate(0px, -50%)`;
            this.clickFlag = true;
        });
    };
    // 给下拉框中下列的每项绑定事件，点击的时候可以切换下拉列表的显示
    Select.prototype._changeSelect = function() {

        this.select = this.elem.querySelector('.select_input_item');

        this.dropdown = this.elem.querySelector('.dropdown_menu');

        this.dropdown.addEventListener('click', (e) => {

            e.stopPropagation();

            if (e.target.nodeName !== 'LI') return;

            // 之前的值
            let prevValue = this.select.value;
            // 之后的值
            let nextValue = e.target.innerText;

            let prevIndex = this.all.findIndex(value => value === prevValue);

            let nextIndex = this.all.findIndex(value => value === nextValue);

            this.select.value = nextValue;

            e.target.style.background = 'blue';
            e.target.style.color = '#fff';
            this.selectInput.click();

            let template =
                `<p>之前的值是<span>&nbsp;${prevValue}</span>&nbsp;-&nbsp;<span>${prevIndex+1}</span></p>
            <p>改变后的值是<span>&nbsp;${nextValue}</span>&nbsp;-&nbsp;<span>${nextIndex+1}</span></p>`;

            this.out.innerHTML = template;

        });
    }

    // 鼠标移入每项的时候，背景颜色为灰色，点击的选项显示为背景颜色蓝色、字体白色
    Select.prototype._changeColor = function() {

        this.dropdown = this.elem.querySelector('.dropdown_menu');

        this.dropdown.addEventListener('mouseover', ({ target }) => {
            if (target.nodeName !== 'LI') return;

            target.style.backgroundColor = 'gray';
        })
        this.dropdown.addEventListener('mouseout', ({ target }) => {
            if (target.nodeName !== 'LI') return;

            target.style.backgroundColor = '#fff';
            target.style.color = '#000';
        });
    }

    // 给搜索框绑定事件，可以通过输入的内容对分类进行筛选
    Select.prototype._searchEvent = function() {
        this.searchInput = this.elem.querySelector('.menu_search_item');
        this.li = this.elem.querySelectorAll('.menu_item');
        this.searchInput.addEventListener('input', ({ target }) => {

            let value = target.value || '[a-zA-z0-9_]';
            var pattern = new RegExp(`${value}+`, 'ig');
            console.log(value);

            this.li.forEach((elem, index) => {
                // 如果没有匹配上
                elem.style.display = "block";
                if (!pattern.test(elem.innerText)) {
                    elem.style.display = "none";
                }
            });
        })
    }

    // 实例化对象
    var select = new Select('select');


})(window, document);