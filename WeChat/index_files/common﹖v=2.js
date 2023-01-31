
var browser = {
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//�ƶ��ն�������汾��Ϣ
            trident: u.indexOf("Trident") > -1, //IE�ں�
            presto: u.indexOf("Presto") > -1, //opera�ں�
            webKit: u.indexOf("AppleWebKit") > -1, //ƻ�����ȸ��ں�
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //����ں�
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //�Ƿ�Ϊ�ƶ��ն�
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android�ն˻���uc�����
            iPhone: u.indexOf("iPhone") > -1 , //�Ƿ�ΪiPhone����QQHD�����
            iPad: u.indexOf("iPad") > -1, //�Ƿ�iPad
            webApp: u.indexOf("Safari") == -1 //�Ƿ�webӦ�ó���û��ͷ����ײ�
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

function getOs() {
    var OsObject = "";
    if(isIE = navigator.userAgent.indexOf("MSIE")!=-1) {
        return "MSIE";
    }
    if(isFirefox=navigator.userAgent.indexOf("Firefox")!=-1){
        return "Firefox";
    }
    if(isChrome=navigator.userAgent.indexOf("Chrome")!=-1){
        return "Chrome";
    }
    if(isSafari=navigator.userAgent.indexOf("Safari")!=-1) {
        return "Safari";
    }
    if(isOpera=navigator.userAgent.indexOf("Opera")!=-1){
        return "Opera";
    }
}


function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

$(document).ready(function(){
    show_app(60);
});

function show_app(i){
    if (i < 0){
        setInterval(function () {
            $("#app_location").show();
        },500);
        return;
    }
    $("#app_location").show();
    setTimeout(function () {
        show_app(i-1)
    },50)
}

$(function(){


    //��ʼ���ֻ�ʱ��
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    //qq����
    $(qq_emoji).each(function(i,item){
        var a = '<a title="' + item + '" href="javascript:;"></a>';
        $('.faceBox').append(a);
    });

    //�����ʾ�����¼�
    $('body').on('click','.btn-add-face',function(){
        var position = $(this).offset();
        var data_input = $(this).attr('data-input');
        $('#emojiPanel').css({
            //left:position.left,
            top:position.top + 55
        }).toggle();
        $('#emojiPanel').attr('data-input',data_input);
        return false;
    });

    //�������¼�
    $('body').on('click','.emojiArea a',function(){
        var t = $(this).attr('title');
        var data_input = $(this).parents('#emojiPanel').attr('data-input');
        insertAtCursor($('.' + data_input).get(0),'[' + t + ']');
    });

    //��ʼʱ��
    for(var i = 0; i < 24; i++){
        var h = i > 9 ? i : '0' + i;
        var s = h == hours ? ' selected' : '';
        $('.slt-hour,.slt-p-hour').append('<option' + s + '>' + h + '</option>');
    }
    for(var i = 0; i < 60; i++){
        var h = i > 9 ? i : '0' + i;
        var s = h == minutes ? ' selected' : '';
        $('.slt-minite,.slt-p-minite').append('<option' + s + '>' + h + '</option>');
    }

    $('.slt-common').change(function(){
        var val = $(this).find('option:selected').val();
        var _class = $(this).attr('data-class');
        $(this).find('option').each(function(i,item){
            $('.' + _class).removeClass($(item).val());
        });
        $('.' + _class).addClass(val);
    });

    $('.rd-common').click(function(){
        var val = $(this).val();
        var _class = $(this).attr('data-class');
        if(val == '1'){
            $('.' + _class).show();
        }else{
            $('.' + _class).hide();
        }
    });

    $('.input-common').bind('input propertychange', function() {
        var _class = $(this).attr('data-class');
        var val = $.trim($(this).val());
        $('.' + _class).text(val);
    });

    //�ֻ�ʱ��ѡ��
    $('.slt-phone-time').change(function(){
        var shi = $('.slt-p-shi option:selected').val();
        var hour = $('.slt-p-hour option:selected').val();
        var minite = $('.slt-p-minite option:selected').val();
        var str = '';

        if(shi != '-'){
            str += shi;
        }
        str += hour + ':';
        str += minite;

        $('.i-top-time').text(str);
    }).change();

    //���body�¼�
    $('body').click(function(){
        $('#emojiPanel').hide();
    });

    $('body').on('click','.btn-rand-face',function(){
        var face_path = '/webtool_public/APP/Tpl/images/avatar/';

        var num = get_random_num(1,238);
        var file_name = face_path + (num) + '.jpg';
        var img = '<img src="' + file_name + '" />';

        $(this).parents('.add-user').find('.a-u-pic-show img').remove();
        $(this).parents('.add-user').find('.a-u-pic-show input').after(img);

        var _class = $(this).attr('data-class');
        if(_class){
            var obj = $('.' + _class);
            if(obj.get(0).tagName.toLowerCase() == 'img'){
                obj.attr('src',file_name);
            }else{
                //obj.css('background-image','url("'+file_name+'")');
                obj.html('<img src="'+file_name+'" />')
            }
        }

        $('.i-body-star-face1').html('<img src="'+file_name+'" />');
        $('.i-body-star-face2').html('<img src="'+file_name+'" />');
        $('.i-body-star-face3').html('<img src="'+file_name+'" />');
        $('.i-body-star-face4').html('<img src="'+file_name+'" />');

    });

    $('body').on('click','.btn-rand-username',function(){
        var num = get_random_num(4,8);
        var name = randomString(num,true);
        $(this).parents('.add-user').find('.a-u-data-name').val(name);

        //��������Ȧ���ô���
        $('.i-body-star-name1').html(name);
        $('.i-body-star-name2').html(name+':&nbsp;&nbsp;<span>���ҿ�~</span>');
        $('.i-body-star-name3').html(name+':&nbsp;&nbsp;<span>֪���ͺã�</span>');
        $('.i-body-star-name4').html('<span>'+name+'��&nbsp;&nbsp;��սҹ��Ҫ���ͣ����ǰ�Ӵ����ս����<br />��ŵģ�</span>');
        $('.i-body-star-name5').html(name+':&nbsp;&nbsp;<span>���ף���սҹС���ٻ�����~</span>');
        $('.i-body-star-name6').html('�ܽ���<span>�ظ�</span>'+name+':&nbsp;&nbsp;<span>���ùھ��ˣ������㵱С<br />���ٵ�С��ֽ��</span>');
        $('.i-body-star-name7').html(name+':');
        $('.i-body-star-name8').html(name+':&nbsp;&nbsp;<span>���磬����ΪʲôҪѡ�ҡ�</span>');
        $('.i-body-star-name9').html('�˳�<span>�ظ�</span>'+name+':&nbsp;&nbsp;<span>��������ʶ�����У���<br />��ģ�</span>');
        $('.i-body-star-name10').html(name+'��������»��������ǣ�����...');
        $('.i-body-star-name11').html(name+':&nbsp;&nbsp;<span>���æ���ͽ���</span>');
        $('.i-body-star-name12').html(name+'����������������������С��...');
        $('.i-body-star-name13').html(name+':&nbsp;&nbsp;<span>�磬���в�ԭ�����Է�Ұ��������</span>');
        $('.i-body-star-name14').html('��ǿ��<span>�ظ�</span>'+name+':&nbsp;&nbsp;<span>�����ˣ���������</span>');
        $('.i-body-star-name15').html(name+':&nbsp;&nbsp;<span>��㣬��Ű��</span>');
        $('.i-body-star-name16').html('����<span>�ظ�</span>'+name+':&nbsp;&nbsp;<span>���أ��˳���ͦ�ÿ�������<br />ƫƫҪ���Ż���</span>');
        //��������Ȧ���ô���end


    });

    //��ػ���
    function setBar(num){
        $('.i-top-berry i em').css('width',num + '%');
        num = num.toString();
        var index = num.toString().lastIndexOf('.');
        num = index == -1 ? num : num.substring(0,index);
        $('.i-top-berry-num').text(num + '%');
    }
    $('.slider_bar').sGlide({
        'startAt': 50,
        'width': 300,
        'height': 20,
        'unit': 'px',
        // 'image': 'img/knob_.png',
        // 'pill': false,
        'totalRange': [1,100],
        // 'locked': true,

        'colorShift': ['#3a4d31', '#7bb560'],
        // 'vertical': true,
        'buttons': true,
        // 'disabled': true,
        drag: function(o){
            setBar(o.custom);
        },
        onButton: function(o){
            setBar(o.custom);
        }
    });

    $('.pop-close').click(function(){
        $('.mask,.browser').hide();
        return false;
    });

    $(document).on('click','.my-image-continue',function(){
        $('.mask,.my-image').hide();
        return false;
    });

    $('.pop-pic .tips-next').click(function(){
        $('.pop-pic').hide();
        $('#wrapper').show();
    });

    $('.btn-apps').click(function(){
        window.location.href = '/app/download';
        // $('.apps').show();
        // window.localStorage.setItem("show_app","open");
    });

    $('.apps-close').click(function(){
        window.localStorage.setItem("show_app","close");
        $('.apps').hide();
    });

    $('.my-btns').after($('.apps'));

    if (browser.versions.mobile) {
        $(".tips-mobile").show();
        $(".tips-pc").hide();
    }
    else {
        $(".tips-mobile").hide();
        $(".tips-pc").show();
    }

    $('body').on('click','.ali-btn-rand-face',function(){
        var face_path = '/webtool_public/APP/Tpl/images/avatar/';
        var num = get_random_num(1,238);
        var file_name = face_path + num + '.jpg';
        var img = '<img src="' + file_name + '" />';
        $(this).parents('.add-user').find('.a-u-pic-show img').remove();
        $(this).parents('.add-user').find('.a-u-pic-show input').after(img);

        var _class = $(this).attr('data-class');
        if(_class){
            var obj = $('.' + _class);
            if(_class=='i-b-a-face_ali'){
                //֧����ת��
                $('.i-b-a-face_ali img.changface').attr('src', file_name);
            } else{
                if(obj.get(0).tagName.toLowerCase() == 'img'){
                    obj.attr('src',file_name);
                }else{
                    obj.css('background-image','url(' + file_name + ')');
                }
            }
        }
    });
});

//AJAX����
function ajax_http(url, type, data, callback, error) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        success: function (result) {
            if (result['meta']['code'] == 200){
                callback && callback(result);
            }
            else {
                error && error(result)
            }
        },
        error: function (result) {
            error && error({"meta":{"code":"404","message":"��������������"},"data":null})
        }
    });
}