//��Ϣ��Ŀ
var i_n_count = randomString(1);
if(i_n_count > 0){
  $('.input-i-n-count').val(i_n_count);
  $('.i-n-count').text(i_n_count);
}
$('.input-i-n-count').bind('input propertychange', function() {
  var val = $(this).val();
  if(isNaN(val) || val == 0){
    $('.i-n-count').text('');
    return false;
  }
  val = $(this).val();
  $('.i-n-count').text(val);
});
$('.btn-del-i-n-count').click(function(){
  $('.i-n-count').text('');
  $('.input-i-n-count').val('');
  return false;
});

$('body').on('click','.a-u-dialog a',function(){
  var user = $(this).parents('.add-user');
  var index = user.index();
  var name = user.find('.a-u-name .a-u-data-name').val();
  var content = user.find('.a-u-name textarea').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');

  if(name == ''){
    alert('�������û�����');
    return false;
  }

  if(content == ''){
    alert('�������������ݣ�');
    return false;
  }

  if(!img.length){
    img = '<img src="images/default-head.png" />';
  }

  content = replace_qq_emoji(content);

  var msg_class = type ? 'i-b-sen-text' : 'i-b-rec-text';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  var dialog = $('<div class="' + msg_class + '"><div>' + nick + '<span><i></i><em>' + content + '</em><a class="msg-del"></a></span></div></div>');
  dialog.prepend(img);
  $('.i-body').append(dialog);
  //��ʾ����
  $(".radio-i-b-nick:checked").click();
  return false;
});

$('.add-time-btn').click(function(){
  var year = $('.slt-year option:selected').val();
  var month = $('.slt-month option:selected').val();
  var day = $('.slt-day option:selected').val();
  var xinqi = $('.slt-xinqi option:selected').val();
  var shi = $('.slt-shi option:selected').val();
  var hour = $('.slt-hour option:selected').val();
  var minite = $('.slt-minite option:selected').val();
  var str = '';
  if(year != '-')
    str += year + '��';
  if(month != '-')
    str += month + '��';
  if(day != '-')
    str += day + '�� ';
  if(xinqi != '-')
    str += xinqi + ' ';
  if(shi != '-')
    str += shi;
  str += hour + ':';
  str += minite;
  var html = '<div class="i-b-time"><span>' + str + '</span><a class="msg-del"></a></div>';
  $('.i-body').append(html);
  return false;
});

var set_body_bg = function(){
  var img = $('.a-u-pic-bodybg img');
  var src = img.attr('src');
  $('.i-body').css('background-image','url(' + src + ')');

}


$('body').on('change','.a-u-pic-show input',function() {
  var img = document.createElement('img');//���� img ����
  var _this = $(this);
  var callback = _this.attr('data-callback');

  window.URL = window.URL || window.webkitURL;

  var imgFile = $(this).get(0);

  if(window.URL && imgFile.files[0]){
    var reader = new FileReader();
    reader.readAsDataURL(imgFile.files[0]);
    reader.onload = function(e){
      var img = '<img src="'+this.result+'" alt=""/>';
      _this.parent().find('img').remove();
      _this.parent().append(img);

      if(callback){
        eval(callback + '()');
      }
    }
  }
});

//ͼƬ�Ի��ϴ�ͼƬ
$('body').on('change','.a-u-pic-show-pic input',function() {
  var img = document.createElement('img');//���� img ����
  var _this = $(this);
  var callback = _this.attr('data-callback');

  window.URL = window.URL || window.webkitURL;

  var imgFile = $(this).get(0);

  if(window.URL && imgFile.files[0]){
    var reader = new FileReader();
    reader.readAsDataURL(imgFile.files[0]);
    reader.onload = function(e){
      var img = '<img src="'+this.result+'" alt=""/>';
      //console.log($(img));console.log($($(img)[0]));console.log($($(img)[0]).width());alert($(img)[0].width+"==bbb");
      var img1 = document.createElement('img');//���� img ����
      $(img1).attr("src", this.result).load(function() {
        $(img1).attr("data-width",this.width).attr("data-height",this.height);
        _this.parent().find('img').remove();
        _this.parent().append(img1);
      });
      //_this.parent().find('img').remove();
      //_this.parent().append(img);

      if(callback){
        eval(callback + '()');
      }
    }
  }
});

//���ͼƬ�Ի�
var pic_i = 0;
$('body').on('click','.a-u-dialog-pic a',function(){
  $('.i-body').css('background','none');
  var user = $(this).parents('.add-user');
  var name = user.find('.a-u-name .a-u-data-name').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
  var pic = $(this).parent().parent().find('.a-u-pic-show-pic img').clone();
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
  pic_i = pic_i + 1;
  if(name == ''){
    alert('�������û�����');
    return false;
  }

  if(!pic.length){
    alert('��û���ϴ�ͼƬ��');
    return false;
  }

  if(!img.length){
    img = '<img src="/Public/Home/images/face/default-head.png" />';
  }

  var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';
  var pic_type = !type ? 'wx_pic_pos2' : 'wx_pic_pos';

  var unread = '';//type ? '' : '<strong></strong>';

  var span_height=pic.attr('data-height')/(pic.attr('data-width')/209);

  var html = $('<div class="' + wrap_class + '"><div class="i-b-voice">' + nick + '<span class="wx_pic_diy" id="s'+pic_i+'" style="height:'+span_height+'px"><h6 class="' + pic_type + '"></h6><a class="msg-del"></a></span></div></div>');

  html.prepend(img);

  $('.i-body').append(html);

  $('#s'+pic_i).prepend(pic);


  return false;
});

//��ȡȫ���û������б�
var optionList="";
user_name_array.forEach(value=>{optionList+='<option>'+value+'</option>'})

//����û�
$('#add-user').click(function(){
  var time = (new Date()).valueOf();
  var html = $('<div class="add-user"><div class="a-u-pic"><div class="a-u-pic-show"><input type="file" accept="image/jpeg,image/x-png" /><img src="index_files/add-pic.png"></div></div><select id="select" class="slt-common" onchange="setUserInfo(this)"><option>-----��ѡ��-----</option>'+optionList+'</select><div class="a-u-name"><p><span>�û�����</span><input class="a-u-data-name" type="text" value="" /></p><p><span>�������ݣ�</span><textarea class="a-u-content' + time + '">�յ�</textarea><a class="a-u-face btn-add-face" data-input="a-u-content' + time + '" href="#">����</a></p><p><span>���ף���</span><input class="a-u-data-redpacket" type="text" value="��ϲ���ƣ��󼪴�����"></p><p><span>ת��/��Ǯ��</span><input class="a-u-data-pay" type="text" value="" /></p><p><span>����ʱ�䣺</span><input class="a-u-data-voice" type="text" value="" /></p><p><input style="margin-right:5px;" class="btn-rand-username" type="button" value="����û���" /></p><div class="a-u-pic-pic"><div class="a-u-pic-show-pic"><input type="file" class="a-u-data-pic" accept="image/jpeg,image/x-png"></div></div></div><div class="a-u-dialog" style="clear:both;"><a class="btn btn-primary" data-type="left" href="#">������ֶԻ�</a></div><div class="a-u-dialog-pic"><a class="btn btn-warning" data-type="left" href="#">���ͼƬ�Ի�</a></div><div class="a-u-dialog-voice"><a class="btn btn-primary" data-type="left" href="#">��������Ի�</a></div><div class="a-u-dialog-sedpacket"><a class="btn btn-danger" data-type="left" href="#">��ӷ�����Ի�</a></div><div class="a-u-dialog-redpacket"><a class="btn btn-danger" data-type="left" href="#">����պ���Ի�</a></div><div class="a-u-dialog-pay"><a class="btn btn-primary" data-dir="send" data-type="left" href="#">���ת�˶Ի�</a></div><div class="a-u-dialog-pay"><a class="btn btn-primary" data-dir="rec" data-type="left" href="#">�����Ǯ�Ի�</a></div><div class="a-u-dialog-del"><a class="btn btn-danger" href="#">ɾ���û�</a></div></div>');
  $('.users').append(html);
  html.find('.btn-rand-username').click();
});

//����ѡ������ͷ���û���
function setUserInfo(el){
var pic_url_el=el.parentElement.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
var userName_el=el.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling;
if(el.selectedIndex>0){
pic_url_el.src='./Users/'+el.options[el.selectedIndex].text+'.jpg';
userName_el.value=el.options[el.selectedIndex].text;
}else{
pic_url_el.src="index_files/add-pic.png";
userName_el.value="";
}
}

//ɾ���û�
$('body').on('click','.a-u-dialog-del',function(){
  if(confirm('��ȷ��Ҫɾ����')){
    $(this).parents('.add-user').remove();
  }
  return false;
});

/*$('body').on('mouseover','.i-b-time,.i-b-rec-text,.i-b-sen-text',function(){
 $(this).find('.msg-del').show();
 });
 $('body').on('mouseout','.i-b-time,.i-b-rec-text,.i-b-sen-text',function(){
 $(this).find('.msg-del').hide();
 });*/



$('body').on('click','.msg-del',function(){
  $(this).parents('.i-b-time,.i-b-rec-text,.i-b-sen-text').remove();
});

$('.clear-dialog').click(function(){
  if(confirm('��ȷ��Ҫ������жԻ���')){
    $('.i-b-time,.i-b-rec-text,.i-b-sen-text').remove();
  }
});

//��ӷ�����Ի�
$('body').on('click','.a-u-dialog-sedpacket a',function(){
  var user = $(this).parents('.add-user');
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
  var index = user.index();
  var name = user.find('.a-u-name .a-u-data-name').val();
  var redpacket = user.find('.a-u-name .a-u-data-redpacket').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();

  if(name == ''){
    alert('�������û�����');
    return false;
  }

  if(redpacket == ''){
    redpacket='��ϲ���ƣ��󼪴�����';
  }

  if(!img.length){
    img = '<img src="/Public/Home/images/face/default-head.png" />';
  }

  var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  var html = $('<div class="' + wrap_class + '"><div class="redpacket">' + nick + '<div class="content"><i class="arraw"><b></b></i><div class="main clear-div"><i class="icon"></i><h3>' + redpacket + '</h3></div><div class="clear-div foot"><h3>΢�ź��</h3></div><a class="msg-del"></a></div></div></div>');
  html.prepend(img);
  $('.i-body').append(html);

  return false;
});

//����պ���Ի�
$('body').on('click','.a-u-dialog-redpacket a',function(){
  var user = $(this).parents('.add-user');
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
  var name=user.find('.a-u-name .a-u-data-name').val();
  var user_num=$(this).parents().parents().find('.add-user').length;
  if(type){
    $(this).parents().parents().find('.add-user').each(function(index,element){
      if($(this).find('.a-u-dialog-master a').hasClass('btn-success')){
        indexs=index;
        return false;
      }
    });
    var rand=get_random_num(0,user_num-1);
    if(rand==indexs){
      rand=(rand<(user_num-1)) ? rand+1 : rand-1;
    }
    name=$($(this).parents().parents().find('.add-user')[rand]).find('.a-u-name .a-u-data-name').val();
  }


  var word = !type ? name+'��ȡ�����' : '����ȡ��'+name+'��';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  //var html = $('<div class="' + wrap_class + '"><div class="redpacket">' + nick + '<div class="content"><i class="arraw"><b></b></i><div class="main clear-div"><i class="icon"></i><h3>' + redpacket + '</h3><h4>��ȡ���</h4></div><div class="clear-div foot"><h3>΢�ź��</h3></div><a class="msg-del"></a></div></div></div>');
  var html = $('<div class="i-b-time"><span><img src="index_files/a-redpacket-icon.png" class="icon_redpacket"> '+word+'<a class="orange">���</a></span><a class="msg-del"></a></div>');
  $('.i-body').append(html);

  return false;
});

//���ת�˶Ի�
$('body').on('click','.a-u-dialog-pay a',function(){
  var dir = $(this).attr('data-dir');
  var user = $(this).parents('.add-user');
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');
  var index = user.index();
  var name = user.find('.a-u-name .a-u-data-name').val();
  var pay = user.find('.a-u-name .a-u-data-pay').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();

  if(name == ''){
    alert('�������û�����');
    return false;
  }

  if(pay == ''){
    alert('������ת��/��Ǯ��');
    return false;
  }

  if(isNaN(pay)){
    alert('������Ľ������');
    return false;
  }

  if(!img.length){
    img = '<img src="images/default-head.png" />';
  }

  var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
  var pay_class = dir == 'send' ? 'i-pay-send' : 'i-pay-rec';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  var html = $('<div class="' + wrap_class + '"><div class="i-b-pay">' + nick + '<span class="' + pay_class + '"><i></i><em>' + toDecimal2(pay) + '</em><a class="msg-del"></a></span></div></div>');
  html.prepend(img);
  $('.i-body').append(html);
  //��ʾ����
  $(".radio-i-b-nick:checked").click();
  return false;
});

//��������Ի�
$('body').on('click','.a-u-dialog-voice a',function(){
  var user = $(this).parents('.add-user');
  var name = user.find('.a-u-name .a-u-data-name').val();
  var img = $(this).parent().parent().find('.a-u-pic-show img').clone();
  var voice = user.find('.a-u-name .a-u-data-voice').val();
  var type = user.find('.a-u-dialog-master a').hasClass('btn-success');

  if(name == ''){
    alert('�������û�����');
    return false;
  }

  if(voice == ''){
    alert('����������ʱ�䣡');
    return false;
  }

  if(isNaN(voice)){
    alert('�����������ʱ������');
    return false;
  }

  if(!img.length){
    img = '<img src="images/default-head.png" />';
  }

  var wrap_class = !type ? 'i-b-rec-text' : 'i-b-sen-text';
  var nick = type ? '' : '<p class="i-b-nick">' + name + '</p>';

  var v_len = 0;
  var len = 0;
  v_len = voice > 60 ? 60 : voice;
  len = (360 - 96)/60 * v_len + 96;

  var unread = '';//type ? '' : '<strong></strong>';

  var html = $('<div class="' + wrap_class + '"><div class="i-b-voice">' + nick + '<span style="width:' + len + 'px"><i></i><b></b><em>' + voice + '\'\'</em>' + unread + '<a class="msg-del"></a></span></div></div>');

  html.prepend(img);
  $('.i-body').append(html);
  //��ʾ����
  $(".radio-i-b-nick:checked").click();
  return false;
});

//�����л�
$('body').on('click','.a-u-dialog-master a',function(){
  var parent = $(this).parents('.users');
  parent.find('.a-u-dialog-master a').removeClass('btn-success');
  $(this).addClass('btn-success');
  return false;
});

$('.body_bg_del').click(function(){
  $('.i-body').css('background-image','none');
  $('.a-u-pic-bodybg img').remove();
  return false;
});

$('#add-user').click();

setTimeout(function(){
  $('.btn-rand-face').click();
  $('.btn-rand-username').click();

  var _title = '';
  $(".a-u-data-name").each(function(){
    _title = $(this).val();
  });

  /*$('.input-common').val(_title);
  $('.i-n-name span').text(_title);*/
},500);