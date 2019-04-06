(function($) {
    var dropdown = $('#dropdown');
    var dropdownMenu = $('#dropdown-menu');
    var dropdownLayer = $('#dropdown-layer');
    var userAccount = document.getElementById("userAccount");
    var userPass = document.getElementById("userPass");
    var userPass_ = document.getElementById("userPass_");
    var userName = document.getElementById("userName");
    var information = document.getElementById("information");
    var email = document.getElementById("email");
    var telephone = document.getElementById("telephone");
    var handup = document.getElementById("handup");
    var block = document.getElementById("block").getElementsByTagName("span");

    //当鼠标离开用户名输入框，产生验证
    var test1 = false; //用户名格式正确 true
    var test2 = false;
    var test3 = false;
    var test4 = false;
    var test5 = false;
    var test6 = false;
    var test7 = false;

    var items = document.querySelectorAll(".item_"); //获取所有提示元素的下标

    var reg = /正则/;

    // 下拉菜单组件
    dropdown.on('mouseenter', '#dropdown-menu', function(event) {
        dropdownLayer.show();
    }).on('mouseleave', function(event) {
        dropdownLayer.hide();
    });

    var ColorInit = function(elem) {
        for (var i = 1; i < elem.length; i++) {
            elem[i].style.background = "#ddd";
        }
    }

    userAccount.onblur = function() { //验证用户名
        var reg = /^[a-zA-Z]\w{5,29}$/;
        if (!reg.exec(this.value)) {
            items[0].innerHTML = '6-30位字母、数字或"_"，字母开头';
            items[0].style.color = "red";
        } else {
            items[0].innerHTML = "用户名输入正确";
            items[0].style.color = "green";
            test1 = true;
        }

    }
    userPass.onblur = function() {
        var reg1 = /^[0-9]{6,20}$/.test(this.value) || /^[a-zA-Z]{6,20}$/.test(this.value) || /^[\W\_]{6,20}$/.test(this.value); //低强度
        var reg2 = /^[0-9|A-Za-z]{6,20}$/.test(this.value) || /^[\W\_|A-Za-z]{6,20}$/.test(this.value) || /^[\W\_|0-9]{6,20}$/.test(this.value); //一般强度
        var reg3 = /^[\W\_|A-Za-z|0-9]{6,20}$/.test(this.value); //高强度

        if (reg1 || reg2 || reg3) {
            items[1].innerHTML = "";
            test2 = true;
            ColorInit(block);
            if (reg1) {
                block[0].style.background = "red";
            } else if (reg2 && !reg1) {
                block[1].style.background = "orange";
            } else if (reg3 && !reg1 && !reg2) {
                block[1].style.background = "orange";
                block[2].style.background = "green";
            }
        } else {
            items[1].innerHTML = "6-20位字母、数字或符号";
            items[1].style.color = "red";
            ColorInit(block);
        }
    }
    userPass_.onblur = function() {
        if (this.value == "") {
            items[2].innerHTML = "输入框不能为空";
            items[2].style.color = "red";
        } else {
            if (this.value != userPass.value) {
                items[2].innerHTML = "两次密码输入不一致，请重新输入";
                items[2].style.color = "red";
            } else {
                items[2].innerHTML = "两次输入一致";
                items[2].style.color = "green";
                test3 = true;
            }
        }
    }
    userName.onblur = function() {
        var reg = /^[\u4e00-\u9fa5a-zA-Z]{3,30}$/;
        if (!reg.exec(this.value)) {
            items[3].className = 'item_';
            items[3].innerHTML = "姓名只能包含中文或者英文,且字符在3-30个之间！";
            items[3].style.color = "red";
        } else {
            items[3].className = 'item_';
            items[3].innerHTML = "姓名输入正确";
            items[3].style.color = "green";
            test4 = true;
        }
    }

    information.onblur = function() {
        var reg = /^\d{17}[0-9x]$/i;
        if (!reg.exec(this.value)) {
            items[5].innerHTML = "请输入18位身份证号码";
            items[5].style.color = "red";
        } else {
            items[5].innerHTML = "号码输入正确";
            items[5].style.color = "green";
            test5 = true;
        }
    }

    email.onblur = function() {
        var reg = /^[\w\-]+@[\w\-]+\.[\w\-]+$/;
        if (!reg.exec(this.value)) {
            items[6].innerHTML = "请输入正确的邮箱";
            items[6].style.color = "red";
        } else {
            items[6].innerHTML = "邮箱格式正确";
            items[6].style.color = "green";
            test6 = true;
        }
    }

    telephone.onblur = function() {
        var reg = /^[1][03-9]\d{9}$/;
        if (!reg.exec(this.value)) {
            items[7].innerHTML = "您输入的手机号码不是有效的格式！";
            items[7].style.color = "red";
        } else {
            items[7].innerHTML = "手机号码正确";
            items[7].style.color = "green";
            test7 = true;
        }

    }

    //注册的时候，必须前面所有数据都是正确的 才能提交
    handup.onclick = function() {
        if (test1 && test2 && test3 && test4 && test5 && test6 && test7) {
            window.open('http://www.imooc.com');
        } else {
            alert('你填写的信息有误！');
        }
    }

})(jQuery);