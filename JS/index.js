window.onload = function () {
    // alert(1)
    // 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.grid-col2-t');

    var focusWidth = focus.offsetWidth;
    // 鼠标经过focus显示或隐藏箭头
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件;
            arrow_r.click();
        }, 3000);
    });
    // 1 动态生成小圆点
    var ul = document.querySelector('.lunbo');
    var circle = document.querySelector('.circle')
    for (var i = 0; i < ul.children.length; i++) {
        //  2 创建li
        var li = document.createElement('li');
        // 记录当前小圆圈索引号;
        li.setAttribute('index', i); //创建小圆圈的索引值
        // 3 插入ul
        circle.appendChild(li);
        // 4 小圆圈排他  注意这一块必须要写在 动态生成li(for)循环里面
        li.addEventListener('click', function () {
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
                for (var j = 0; j < circle.children.length; j++) {
                    this.className = 'current';
                    // 5 点击小圆圈,移动图片  移动的是ul
                    // 当我们点击了某个li之后 要把这li的索引号(index)给num
                    num = index;
                    // 当我们点击了某个li之后 要把这li的索引号(index)给circles
                    circles = index;
                    // ul 的移动距离 = 小圆圈的索引号 * 图片大小  注意是负值;
                    //当我们点击某一个li 就获取当前li的索引值;
                    var index = this.getAttribute('index')

                    animation(ul, -index * focusWidth);
                    // animation
                }

            }
        });
    }
    // 给circle里面第一个li先添加添加current类
    circle.children[0].className = 'current';
    // 6 克隆第一张图片放到 ul里最后面    克隆写在了生成小圆圈的下面   所以小圆圈不会多
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7 点击右侧按钮,图片滚动一张;
    // circles 控制小圆圈移动
    var circles = 0
    var num = 0;
    // flag为节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            animation(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            });
            // 8 点击右侧按钮 小圆圈跟随一起变化 可以在声明一个变量控制小圆圈的播放;
            circles++;
            /*  if (circles == circle.children.length) {
                 circles = 0;
             } */
            // 简单写法

            circles = circles == circle.children.length ? circles = 0 : circles;
            // 调用函数
            circleChange();

        }
    });


    // 9 点击左侧按钮 小圆圈跟随一起变化 ;
    arrow_l.addEventListener('click', function () {

        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animation(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            });

            circles--;
            // 如果circles < 0 说明第一张图片 小圆圈要改为4
            /* if (circles < 0) {
                circles = circle.children.length - 1;
            } */
            // 简单写法
            circles = circles < 0 ? circle.children.length - 1 : circles;
            // 调用函数
            circleChange();
        }
    });

    function circleChange() {
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }

        circle.children[circles].className = 'current';
    }
    var timer = setInterval(function () {
        // 手动调用点击事件;
        arrow_r.click();
    }, 3000);
}