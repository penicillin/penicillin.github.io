function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return "pc"
    } else {
        return "mobile";
    }
}
var home_css = ""
if (browserRedirect() == "mobile") {
    home_css = "index_files/style_mobile.css";
    setTimeout(function () {
        $("#nav_div").hide();
        $(".navbar2").after('<div style="width: 100%;height: 70px"></div>');
        $("#download_a").show();
        $(".logo").css("width", "100%")
    })
} else {
    home_css = "index_files/style_pc.css";
    setTimeout(function () {
        $("#download_a").hide();
    })
}
$("#home_css").attr("href", home_css)