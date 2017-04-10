/**
 * Created by jessicababy on 2017/4/10.
 */

$("#loginbtn").click(function (){
    location.href="./home.html";
});
$.ajax({
    type: "POST",
    url: "./testPhp/readjson.php",
    dataType: "json",
    data: {
    },
    success: function (res) {
        alert(res);

    },
    error: function(e) {
        alert(e);
    }
});
