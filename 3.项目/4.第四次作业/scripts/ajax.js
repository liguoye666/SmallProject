(function($) {

    function Search($elem) {
        this.$elem = $elem;
        // 搜索输入框
        this.$input = this.$elem.find('.header-search-input');
        // 下拉菜单
        this.$list = this.$elem.find('.list');
    }

    // 下拉菜单异步加载
    Search.prototype.autocomplete = function(url) {
        var self = this;
        var html = '';
        var inputVal;
        // 当输入文本
        this.$input.on('input', function(event) {
            // 获取输入框的内容
            inputVal = self.$input.val();
            // 异步加载json文件
            $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                })
                // 异步加载完成
                .done(function(data) {
                    $.each(data, function(index, elem) {
                        $.each(elem, function(index_1, elem_1) {
                            switch (inputVal) {
                                case "鞋":
                                    // 显示下拉菜单
                                    self.$list.show();
                                    // 确保读取的是相关商品
                                    if (elem_1['Query'] === "鞋") {
                                        // 提取文本内容
                                        $.each(elem_1.Results[0].Suggests, function(index_2, elem_2) {
                                            html += `<li>${elem_2['Txt']}</li>`;
                                        });
                                        // 插入到客户端的容器
                                        self.$list.html(html);
                                    }
                                    break;
                                case "音速3":
                                    self.$list.show();
                                    if (elem_1['Query'] === "音速3") {
                                        $.each(elem_1.Results[0].Suggests, function(index_2, elem_2) {
                                            html += `<li>${elem_2['Txt']}</li>`;
                                        });
                                        self.$list.html(html);
                                    }
                                    break;
                                default:
                                    self.$list.html('').hide();
                                    html = '';
                                    break;
                            }
                        });
                    });
                })
                // 异步加载失败
                .fail(function() {
                    self.$list.hide().html('');
                    html = '';
                })
        });
    };
    // 商品栏异步加载
    Search.prototype.changeShop = function(url) {
        var self = this;
        var html = '';
        var inputVal;
        this.$input.on('keydown', function(event) {
            inputVal = self.$input.val();
            // 当按下回车键并且输入内容不为空时
            if (event.keyCode == 13 && $.trim(inputVal) != '') {
                // 异步加载商品内容
                $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                    })
                    .done(function(data) {
                        console.log(data);
                        $.each(data, function(index, elem) {
                            $.each(elem, function(index_1, elem_1) {
                                switch (inputVal) {
                                    case "鞋":
                                        if (elem_1['Query'] === '鞋') {
                                            html = self.shopShow(elem_1['Results'][0]['Suggests']);
                                            $('.commodityContainer').html(html);
                                        }
                                        break;
                                    case "音速3":
                                        if (elem_1['Query'] === '音速3') {
                                            html = self.shopShow(elem_1['Results'][0]['Suggests']);
                                            $('.commodityContainer').html(html);
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            });
                        });
                    })
            }
        });
    };
    // 添加内容到字符串中
    Search.prototype.shopShow = function(obj) {
        var html = '';
        $.each(obj, function(index, value) {
            html += `\n<div class="mainCommodity">
	<div class="shopInfo">
		<div class="shopMsg">
			<input type="checkbox" name="shopMsg" id='${value.label}' class='shopMsg-input' autocomplete="off">
			<label for="${value.label}">店铺：</label>
			<a href="#">${value.shop}</a>
		</div>
	</div>
	<div class="commodityInfo">
		<ul>
			<li class='td-chk'>
				<div class="td-inner">
					<input type="checkbox" name='checkbox' autocomplete="off">
				</div>
			</li>
			<li class='td-item'>
				<div class="td-inner">
					<a href="#" class='desImg'>
						<img src="${value.image}" alt='${value.Txt}'>
					</a>
 					<div class="item-info">
						<div class="item-basis-info">
							<a href="#">
								${value.Txt}
							</a>
						</div>
						<div class="item-other-info">
							<div class="item-other-space"></div>
							<div class="item-other-list">
								<a href="#" title='支持信用卡支付'>
									<div class="bandCard"></div>
								</a>
								<a href="#" class='sevenDay' title='7天无理由'>
									<div class="sevenDay"></div>
								</a>
								<a href="#" title='消费者保障服务'>
									<div class="guarantee"></div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li class='td-info'>
				<div class="td-info-msg">
					<p>${value.color}</p>
					<p>${value.size}</p>
				</div>
			</li>
			<li class='td-price'>
				<div class="td-inner">
					<p class='non-discount'>${value.nonDiscount}</p>
					<p class='discount'>￥<span>${value.num}.00</span></p>
					<div class="promotion">
						卖家促销
						<i class='promotionIcon'></i>
					</div>
					<div class="proSlidedown">
						<p class='newPro'>卖家促销：秋季特惠</p>
						<p>优惠：￥${value.discount}.00</p>
					</div>
				</div>
			</li>
			<li class='td-amount'>
				<div class="item-amount">
					<a href="#" class='amount-left amount-color'>-</a>
					<input type="text" name='amountNum' value='1' autocomplete="off">
					<a href="#" class="amount-right">+</a>
				</div>
				<div class="stock">
					${value.max}
				</div>
				<div class="outNum">
					<span class="instr">最多只能购买</span>
					<span class='stockNum'></span>
					<em>件</em>
				</div>
			</li>
			<li class='td-sum'>
				<em>￥</em>
				<span>${value.num}.00</span>
			</li>
			<li class='td-operation'>
				<p>
					<a href="#" class='delete'>删除</a>
				</p>
			</li>
		</ul>
	</div>
</div>`;
        });
        return html;
    };
    // 获取搜索栏
    var $headerSearch = $('.header-search');
    // 实例化对象
    var search = new Search($headerSearch);
    // 执行下拉菜单异步加载功能
    search.autocomplete('./json/search.json');
    // 执行商品信息异步加载功能
    search.changeShop('./json/basketballShoes.json');

})(jQuery)