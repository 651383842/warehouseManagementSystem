/**
 * Created by jessicababy on 2017/4/10.
 */

/*$("#loginbtn").click(function (){
    location.href="./home.html";
});*/

$(function() {
	var loading = false;

    function isOverTime() {
        if(loading){
            loading = false;
            $("#loadingDialog").dialog("close");
            $("#tipDiv").find("p").html("请求超时！可尝试刷新页面。<br>Overtime！Please refresh and reload");
            $("#tipDiv").dialog("open");
        }
    }
	
	$( "#loadingDialog" ).dialog({
	    autoOpen: false,
	    width: 400,
	    modal:true,
	    closeOnEscape: false,
	    dialogClass: "no-close"
	});
	
    $( "#dialog" ).dialog({
        autoOpen: false,
        width: 400,
        modal:true,
        buttons: [
            {
                text: "确定-Ok",
                click: function() {
                	$( "#loadingDialog" ).find("span").html("邮件发送中，请稍等-Email is sending，please wait ......");
                    $( "#loadingDialog" ).dialog("open");
                    $('#shclDefault').shCircleLoader();
                    loading = true;
                    window.setInterval(isOverTime,600000);
                    $.ajax({
                        type: "POST",
                        url: "/returnPassword",
                        data: {
                            "username": $("#accountInput").val()
                        },
                        success: function (res) {
                            loading = false;
                            $( "#loadingDialog" ).dialog("close");
                            if (res.backInfo == "super") {
                                $("#tipDiv").find("p").html("密码找回邮件已发往超级管理员的邮箱，请耐心等候！<br>The email has been sent to Admin, please waiting!");
                                $("#tipDiv").dialog("open");
                                $( "#dialog" ).dialog( "close" );
                            } else if (res.backInfo == "checkman") {
                                $("#tipDiv").find("p").html("密码找回邮件已发往校验员的邮箱，请耐心等候！<br>The email has been sent to CheckMan, please waiting!");
                                $("#tipDiv").dialog("open");
                                $( "#dialog" ).dialog( "close" );
                            } else if (res.backInfo == "normal") {
                                $("#tipDiv").find("p").html("密码重置申请已发往超级管理员的邮箱，请耐心等候！<br>The password restore request has been sent to Admin, please waiting!");
                                $("#tipDiv").dialog("open");
                                $( "#dialog" ).dialog( "close" );
                            } else {
                                $("#tipDiv").find("p").html("帐号或工号输入有误，请重试！<br>Account or empno Wrong! Please retry!");
                                $("#tipDiv").dialog("open");
                                $( "#dialog" ).dialog( "close" );
                            }
                        },
                        error: function (e) {
                            loading = false;
                            $( "#loadingDialog" ).dialog("close");
                            $("#tipDiv").find("p").html("连接失败，请重试！<br>Connect failed! Please retry!");
                            $("#tipDiv").dialog("open");
                            $( "#dialog" ).dialog( "close" );
                        }
                    });
                }
            },
            {
                text: "取消-Cancel",
                click: function() {
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
    $("#findSpan").click(function(){
        $( "#dialog" ).dialog("open");
    });
    /*$("#loginbtn").click(function () {
//        var password = CryptoJS.MD5($("#password").val()+"").toString();
        $.ajax({
            type: "POST",
            url: "/login",
            contentType: "application/x-www-form-urlencoded",
            data: {
                "username": $("#account").val(),
                "password": $("#password").val()
            },
            success: function (res) {
                if (res.result == "ok") {
                    location.href = "./home.html";
                } else {
                    alert("登录失败，请确认重试！")
                }
            },
            error: function (e) {
                alert("连接失败，请重试！");
            }
        });
    });*/
    /*$("body").keydown(function() {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#loginbtn').click();
        }
    });*/

    $("#tipDiv").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        buttons: [
            {
                text: "确定-Ok",
                click: function() {
                    $(this).dialog( "close" );
                }
            }
        ]
    });

    try{
        var thisURL = document.URL;
        var param =thisURL.split("?")[1];
        if(param == "error"){
            $("#tipDiv").find("p").html("帐号或密码有误，请重试！<br>Account or password error! Please retry!");
            $("#tipDiv").dialog("open");
        }
    }catch (e){
        console.log(e);
    }
});
