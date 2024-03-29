//消息数目
var i_n_count = randomString(1);
if (i_n_count > 0) {
  $('.input-i-n-count').val(i_n_count);
  $('.i-n-count').text(i_n_count);
}
$('.input-i-n-count').bind('input propertychange', function () {
  var val = $(this).val();
  if (isNaN(val) || val == 0) {
    $('.i-n-count').text('');
    return false;
  }
  val = $(this).val();
  $('.i-n-count').text(val);
});
$('.btn-del-i-n-count').click(function () {
  $('.i-n-count').text('');
  $('.input-i-n-count').val('');
  return false;
});

$('body').on('click', '.a-u-dialog a', function () {
  var user = $(this).parents('.add-user');
  var index = user.index();
  var name = user.find('.a-u-name .a-u-data-name').val();
  var content = user.find('.a-u-name textarea').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');

  if (name == '') {
    alert('请输入用户名！');
    return false;
  }

  if (content == '') {
    alert('请输入聊天内容！');
    return false;
  }

  if (!img.length) {
    img = '<img src="" />';
  }

  content = replace_qq_emoji(content);

  var msg_class = type ? 'i-b-sen-text' : 'i-b-rec-text';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  var dialog = $('<div class="' + msg_class + '"><div>' + nick + '<span><i></i><em>' + content + '</em><a class="msg-del"></a></span></div></div>');
  dialog.prepend(img);
  $('.i-body').append(dialog);
  //显示名称
  $(".radio-i-b-nick:checked").click();
  return false;
});

$('.add-time-btn').click(function () {
  var year = $('.slt-year option:selected').val();
  var month = $('.slt-month option:selected').val();
  var day = $('.slt-day option:selected').val();
  var xinqi = $('.slt-xinqi option:selected').val();
  var shi = $('.slt-shi option:selected').val();
  var hour = $('.slt-hour option:selected').val();
  var minite = $('.slt-minite option:selected').val();
  var str = '';
  if (year != '-')
    str += year + '年';
  if (month != '-')
    str += month + '月';
  if (day != '-')
    str += day + '日 ';
  if (xinqi != '-')
    str += xinqi + ' ';
  if (shi != '-')
    str += shi;
  str += hour + ':';
  str += minite;
  var html = '<div class="i-b-time"><span>' + str + '</span><a class="msg-del"></a></div>';
  $('.i-body').append(html);
  return false;
});

var set_body_bg = function () {
  var img = $('.a-u-pic-bodybg img');
  var src = img.attr('src');
  $('.i-body').css('background-image', 'url(' + src + ')');

}


$('body').on('change', '.a-u-pic-show input', function () {
  var img = document.createElement('img');//创建 img 对象
  var _this = $(this);
  var callback = _this.attr('data-callback');

  window.URL = window.URL || window.webkitURL;

  var imgFile = $(this).get(0);

  if (window.URL && imgFile.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(imgFile.files[0]);
    reader.onload = function (e) {
      var img = '<img src="' + this.result + '" alt=""/>';
      _this.parent().find('img').remove();
      _this.parent().append(img);

      if (callback) {
        eval(callback + '()');
      }
    }
  }
});

//图片对话上传图片
$('body').on('change', '.a-u-pic-show-pic input', function () {
  var img = document.createElement('img');//创建 img 对象
  var _this = $(this);
  var callback = _this.attr('data-callback');

  window.URL = window.URL || window.webkitURL;

  var imgFile = $(this).get(0);

  if (window.URL && imgFile.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(imgFile.files[0]);
    reader.onload = function (e) {
      var img = '<img src="' + this.result + '" alt=""/>';
      var img1 = document.createElement('img');//创建 img 对象
      $(img1).attr("src", this.result).load(function () {
        $(img1).attr("data-width", this.width).attr("data-height", this.height);
        _this.parent().find('img').remove();
        _this.parent().append(img1);
      });

      if (callback) {
        eval(callback + '()');
      }
    }
  }
});

//添加图片对话
var pic_i = 0;
$('body').on('click', '.a-u-dialog-pic a', function () {
  $('.i-body').css('background', 'none');
  var user = $(this).parents('.add-user');
  var name = user.find('.a-u-name .a-u-data-name').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
  var pic = $(this).parent().parent().find('.a-u-pic-show-pic img').clone();
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
  pic_i = pic_i + 1;
  if (name == '') {
    alert('请输入用户名！');
    return false;
  }

  if (!pic.length) {
    alert('您没有上传图片！');
    return false;
  }

  if (!img.length) {
    img = '<img src="" />';
  }

  var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';
  var pic_type = !type ? 'wx_pic_pos2' : 'wx_pic_pos';

  var unread = '';//type ? '' : '<strong></strong>';

  var span_height = pic.attr('data-height') / (pic.attr('data-width') / 209);

  var html = $('<div class="' + wrap_class + '"><div class="i-b-voice">' + nick + '<span class="wx_pic_diy" id="s' + pic_i + '" style="height:' + span_height + 'px"><h6 class="' + pic_type + '"></h6><a class="msg-del"></a></span></div></div>');

  html.prepend(img);

  $('.i-body').append(html);

  $('#s' + pic_i).prepend(pic);


  return false;
});

//读取全部用户数据列表
var optionList = "";
try {
  user_name_array.forEach(value => { optionList += '<option>' + value + '</option>' });
} catch (e) {
  console.debug(`无用户列表`);
}

//添加用户
$('#add-user').click(function () {
  var time = (new Date()).valueOf();
  var html = '<div class="add-user"><div class="a-u-pic"><div class="a-u-pic-show"><input type="file" accept="image/jpeg,image/x-png" /><img src="index_files/add-pic.png"></div></div>';
  optionList != '' ? html+='<select id="select" class="slt-common" onchange="setUserInfo(this)"><option>-----请选择-----</option>' + optionList + '</select>':null;
  html= $(html+'<div class="a-u-name"><p><span>用户名：</span><input class="a-u-data-name" type="text" value="" /></p><p><span>聊天内容：</span><textarea class="a-u-content' + time + '">收到</textarea><a class="a-u-face btn-add-face" data-input="a-u-content' + time + '" href="#">表情</a></p><p><span>红包祝福语：</span><input class="a-u-data-redpacket" type="text" value="恭喜发财，大吉大利！"></p><p><span>转账/收钱金额：</span><input class="a-u-data-pay" type="text" value="" /></p><p><span>语音时间：</span><input class="a-u-data-voice" type="text" value="" /></p><div class="a-u-pic-pic"><div class="a-u-pic-show-pic"><input type="file" class="a-u-data-pic" accept="image/jpeg,image/x-png"></div></div></div><div class="a-u-dialog" style="clear:both;"><a class="btn btn-primary" data-type="left" href="#">添加文字对话</a></div><div class="a-u-dialog-pic"><a class="btn btn-warning" data-type="left" href="#">添加图片对话</a></div><div class="a-u-dialog-voice"><a class="btn btn-primary" data-type="left" href="#">添加语音对话</a></div><div class="a-u-dialog-sedpacket"><a class="btn btn-danger" data-type="left" href="#">添加发红包对话</a></div><div class="a-u-dialog-redpacket"><a class="btn btn-danger" data-type="left" href="#">添加收红包对话</a></div><div class="a-u-dialog-pay"><a class="btn btn-primary" data-dir="send" data-type="left" href="#">添加转账对话</a></div><div class="a-u-dialog-pay"><a class="btn btn-primary" data-dir="rec" data-type="left" href="#">添加收钱对话</a></div><div class="a-u-dialog-del"><a class="btn btn-danger" href="#">删除用户</a></div></div>');
  $('.users').append(html);
});
$('#add-user').click();//在主页中添加一个用户

//根据选择设置头像及用户名
function setUserInfo(el) {
  var pic_url_el = el.parentElement.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
  var userName_el = el.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling;
  if (!(el.options[el.selectedIndex].text.startsWith('-'))) {
    pic_url_el.src = './Users/' + el.options[el.selectedIndex].text + '.jpg';
    userName_el.value = el.options[el.selectedIndex].text;
  } else {
    pic_url_el.src = "index_files/add-pic.png";
    userName_el.value = "";
  }
}

//删除用户
$('body').on('click', '.a-u-dialog-del', function () {
  if (confirm('您确认要删除？')) {
    $(this).parents('.add-user').remove();
  }
  return false;
});

$('body').on('click', '.msg-del', function () {
  $(this).parents('.i-b-time,.i-b-rec-text,.i-b-sen-text').remove();
});

$('.clear-dialog').click(function () {
  if (confirm('您确认要清除所有对话？')) {
    $('.i-b-time,.i-b-rec-text,.i-b-sen-text').remove();
  }
});

//添加发红包对话
$('body').on('click', '.a-u-dialog-sedpacket a', function () {
  var user = $(this).parents('.add-user');
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
  var index = user.index();
  var name = user.find('.a-u-name .a-u-data-name').val();
  var redpacket = user.find('.a-u-name .a-u-data-redpacket').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();

  if (name == '') {
    alert('请输入用户名！');
    return false;
  }

  if (redpacket == '') {
    redpacket = '恭喜发财，大吉大利！';
  }

  if (!img.length) {
    img = '<img src="" />';
  }

  var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  var html = $('<div class="' + wrap_class + '"><div class="redpacket">' + nick + '<div class="content"><i class="arraw"><b></b></i><div class="main clear-div"><i class="icon"></i><h3>' + redpacket + '</h3></div><div class="clear-div foot"><h3>微信红包</h3></div><a class="msg-del"></a></div></div></div>');
  html.prepend(img);
  $('.i-body').append(html);

  return false;
});

//添加收红包对话
$('body').on('click', '.a-u-dialog-redpacket a', function () {
  var user = $(this).parents('.add-user');
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
  var name = user.find('.a-u-name .a-u-data-name').val();
  var user_num = $(this).parents().parents().find('.add-user').length;
  if (type) {
    $(this).parents().parents().find('.add-user').each(function (index, element) {
      if ($(this).find('.a-u-dialog-master a').hasClass('btn-success')) {
        indexs = index;
        return false;
      }
    });
    var rand = get_random_num(0, user_num - 1);
    if (rand == indexs) {
      rand = (rand < (user_num - 1)) ? rand + 1 : rand - 1;
    }
    name = $($(this).parents().parents().find('.add-user')[rand]).find('.a-u-name .a-u-data-name').val();
  }


  var word = !type ? name + '领取了你的' : '你领取了' + name + '的';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  var html = $('<div class="i-b-time"><span><img src="index_files/a-redpacket-icon.png" class="icon_redpacket"> ' + word + '<a class="orange">红包</a></span><a class="msg-del"></a></div>');
  $('.i-body').append(html);

  return false;
});

//添加转账对话
$('body').on('click', '.a-u-dialog-pay a', function () {
  var dir = $(this).attr('data-dir');
  var user = $(this).parents('.add-user');
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
  var index = user.index();
  var name = user.find('.a-u-name .a-u-data-name').val();
  var pay = user.find('.a-u-name .a-u-data-pay').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();

  if (name == '') {
    alert('请输入用户名！');
    return false;
  }

  if (pay == '') {
    alert('请输入转账/收钱金额！');
    return false;
  }

  if (isNaN(pay)) {
    alert('您输入的金额有误！');
    return false;
  }

  if (!img.length) {
    img = '<img src="" />';
  }

  var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
  var pay_class = dir == 'send' ? 'i-pay-send' : 'i-pay-rec';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  var html = $('<div class="' + wrap_class + '"><div class="i-b-pay">' + nick + '<span class="' + pay_class + '"><i></i><em>' + toDecimal2(pay) + '</em><a class="msg-del"></a></span></div></div>');
  html.prepend(img);
  $('.i-body').append(html);
  //显示名称
  $(".radio-i-b-nick:checked").click();
  return false;
});

//添加语音对话
$('body').on('click', '.a-u-dialog-voice a', function () {
  var user = $(this).parents('.add-user');
  var name = user.find('.a-u-name .a-u-data-name').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
  var voice = user.find('.a-u-name .a-u-data-voice').val();
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');

  if (name == '') {
    alert('请输入用户名！');
    return false;
  }

  if (voice == '') {
    alert('请输入语音时间！');
    return false;
  }

  if (isNaN(voice)) {
    alert('您输入的语音时间有误！');
    return false;
  }

  if (!img.length) {
    img = '<img src="images/default-head.png" />';
  }

  var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  var v_len = 0;
  var len = 0;
  v_len = voice > 60 ? 60 : voice;
  len = (360 - 96) / 60 * v_len + 96;

  var unread = '';//type ? '' : '<strong></strong>';

  var html = $('<div class="' + wrap_class + '"><div class="i-b-voice">' + nick + '<span style="width:' + len + 'px"><i></i><b></b><em>' + voice + '\'\'</em>' + unread + '<a class="msg-del"></a></span></div></div>');

  html.prepend(img);
  $('.i-body').append(html);
  //显示名称
  $(".radio-i-b-nick:checked").click();
  return false;
});

//主人切换
$('body').on('click', '.a-u-dialog-master a', function () {
  var parent = $(this).parents('.users');
  parent.find('.a-u-dialog-master a').removeClass('btn-success');
  $(this).addClass('btn-success');
  return false;
});

$('.body_bg_del').click(function () {
  $('.i-body').css('background-image', 'none');
  $('.a-u-pic-bodybg img').remove();
  return false;
});

/*
setTimeout(function () {
  $('.btn-rand-face').click();
  $('.btn-rand-username').click();

  var _title = '';
  $(".a-u-data-name").each(function () {
    _title = $(this).val();
  });
}, 500);
*/