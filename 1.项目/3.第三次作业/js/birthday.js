var count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var year, month, date, day;
// 计算日期
function birth(year, month, date) {
    var newYear = parseInt(year); // 获取年份
    var newMonth = parseInt(month); // 获取月份
    var newDate = parseInt(date); // 获取日期
    var total = 0;
    // 如果是闰年
    if ((newYear % 4 == 0 && newYear % 100 != 0) || (newYear % 400 == 0))
        count[1] = 29;
    else
        count[1] = 28;

    for (var i = 0; i < newMonth - 1; i++) {
        total += count[i];
    }
    total += newDate;
    return total;
}
// 弹出窗口
function promptFn() {
    while (1) {
        year = prompt("请输入您的出生年份");
        if (numTest(year))
            continue;
        month = prompt("请输入您的出生月份");
        if (numTest(month))
            continue;
        date = prompt("请输入您的出生日期");
        if (numTest(date))
            continue;
        break;
    }
}
// 判断输入年月日的格式
function numTest(num) {
    var result = isNaN(num);
    if (result == true) {
        alert("你输入格式有误请重新输入")
        return 1;
    }
}

promptFn();
day = birth(year, month, date);
document.write("您的生日在" + year + "年是第" + day + "天");