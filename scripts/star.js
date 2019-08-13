function star(lineColor, pointColor, opacity, count, linLength) {
    opacity = opacity > 0 ? opacity: 0.5;
    lineColor = getRgbColor(lineColor);
    pointColor = getRgbColor(pointColor);
    count = count > 0 ? count: 99;
    linLength = linLength > 0 ? linLength * 10000 : 10000;
    function getRgbColor(inputString) { //十六进制转为RGB
        var rgb = []; // 定义rgb数组
        if (/^\#[0-9A-F]{3}$/i.test(inputString)) { //判断传入是否为#三位十六进制数
            let sixHex = '#';
            inputString.replace(/[0-9A-F]/ig,
            function(kw) {
                sixHex += kw + kw; //把三位16进制数转化为六位
            });
            inputString = sixHex; //保存回hex
        }
        if (/^#[0-9A-F]{6}$/i.test(inputString)) { //判断传入是否为#六位十六进制数
            inputString.replace(/[0-9A-F]{2}/ig,
            function(kw) {
                rgb.push(eval('0x' + kw)); //十六进制转化为十进制并存如数组
            });
            return rgb.join(','); //返回RGB格式颜色
        } else {
            return inputString; //原样抛回
        }
    }
    function o(w, v, i) {
        return w.getAttribute(v) || i
    }
    function j(i) {
        return document.getElementsByTagName(i)
    }
    function l() {
        var i = j('script'),
        w = i.length,
        v = i[w - 1];
        return {
            l: w,
            z: o(v, 'zIndex', -1),
            o: o(v, 'opacity', opacity),
            lineColor: o(v, 'color', lineColor),
            pointColor: o(v, 'color', pointColor),
            n: o(v, 'count', count)
        }
    }
    function k() {
        r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		e.fillStyle = 'rgb(' + pointColor + ')';
        e.strokeStyle = 'rgb(' + lineColor + ')';
    }
    function b() {
        e.clearRect(0, 0, r, n);
        var w = [f].concat(t);
        var x, v, A, B, z, y;
        t.forEach(function(i) {
            i.x += i.xa,
            i.y += i.ya,
            i.xa *= i.x > r || i.x < 0 ? -1 : 1,
            i.ya *= i.y > n || i.y < 0 ? -1 : 1,
            e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
            for (v = 0; v < w.length; v++) {
                x = w[v];
                if (i !== x && null !== x.x && null !== x.y) {
                    B = i.x - x.x,
                    z = i.y - x.y,
                    y = B * B + z * z;
                    y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z), A = (x.max - y) / x.max, e.beginPath(), e.lineWidth = A / 2, e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke());
                }
            }
            w.splice(w.indexOf(i), 1)
        }),
        m(b)
    }
    var u = document.createElement('canvas'),
    s = l(),
    c = 'P_link' + s.l,
    e = u.getContext('2d'),
    r,
    n,
    m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(i) {
        window.setTimeout(i, 1000 / 45)
    },
    a = Math.random,
    f = {
        x: null,
        y: null,
        max: 20000
    };
    u.id = c;
    u.style.cssText = 'position:fixed;top:0;left:0;z-index:' + s.z + ';opacity:' + s.o;
    j('body')[0].appendChild(u);
    k(),
    window.onresize = k;
    window.onmousemove = function(i) {
        i = i || window.event,
        f.x = i.clientX,
        f.y = i.clientY
    },
    window.onmouseout = function() {
        f.x = null,
        f.y = null
    };
    for (var t = [], p = 0; s.n > p; p++) {
        var h = a() * r,
        g = a() * n,
        q = 2 * a() - 1,
        d = 2 * a() - 1;
        t.push({
            x: h,
            y: g,
            xa: q,
            ya: d,
            max: linLength
        })
    }
    setTimeout(function() {
        b()
    },
    100)
};
