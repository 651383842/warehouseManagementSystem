/**
 * Created by jessicababy on 2017/4/13.
 */
//打开页面展示信息

//表格内容
$.ajax({
    type: "POST",
    url: "/backAllModuleNum",
    dataType: "json",
    data: {
    },
    success: function (res) {
        for(var i = res.moduleNum.length - 1;i >= 0;i--){
            $("#tab").append("<tr class='t2'>" +
                "<td>"+res.moduleNum[i][0]+"</td>" +
                "<td>"+res.moduleNum[i][1]+"</td>"+
                "<td>"+res.moduleNum[i][2]+"</td>"+
                "<td>"+res.moduleNum[i][3]+"</td>"+
                "<td>"+res.moduleNum[i][4]+"</td>"+
                "<td>"+res.moduleNum[i][5]+"</td>"+
                "<td>"+res.moduleNum[i][6]+"</td>"+
                "<td class='delBtn' type='button'><img class='delete' src='./img/delete.png' alt='删除-Delete'></td>" +"</tr>")
        }
        $(".delBtn").on("click",function(){
        	click = $(this);
            $("#delDialog").dialog( "open" );
            });
        $("#tab tr:odd").css("background-color", "white");
        $("#tab tr:even").css("background-color", "#f3f3f3");
        $("#t1").css("background-color","#ecf6fd");
        console.log(res);
    },
    error: function(e) {
        console.log("supplierError:"+e);
    }
});
//department
$.ajax({
    type: "POST",
    url: "/backDepartmentInfo",
    dataType: "json",
    data: {
    },
    success: function (res) {
//			selectList = JSON.parse(res);
        for(var i = 0;i < res.department.length;i++) {
            $(".departmentSelect").append("<option>"+res.department[i]+"</option>")
        }
        console.log(res);
    },
    error: function(e) {
        console.log("supplierError:"+e);
    }
});
//brand
$.ajax({
    type: "POST",
    url: "/backBrandInfo",
    dataType: "json",
    data: {
    },
    success: function (res) {
//			selectList = JSON.parse(res);
        for(var i = 0;i < res.brand.length;i++) {
            $(".brandSelect").append("<option>"+res.brand[i]+"</option>")
        }
        console.log(res);
    },
    error: function(e) {
        console.log("brandError:"+e);
    }
});
//fitting
$.ajax({
    type: "POST",
    url: "/backFittingInfo",
    dataType: "json",
    data: {
    },
    success: function (res) {
//			selectList = JSON.parse(res);
        for(var i = 0;i < res.fitting.length;i++) {
            $(".fittingSelect").append("<option>"+res.fitting[i]+"</option>")
        }
        console.log(res);
    },
    error: function(e) {
        console.log("brandError:"+e);
    }
});
//supplier
$.ajax({
    type: "POST",
    url: "/backProviderInfo",
    dataType: "json",
    data: {
    },
    success: function (res) {
//			selectList = JSON.parse(res);
        for(var i = 0;i < res.provider.length;i++) {
            $(".supplierSelect").append("<option>"+res.provider[i]+"</option>")
        }
        console.log(res);
    },
    error: function(e) {
        console.log("brandError:"+e);
    }
});
//color
$.ajax({
    type: "POST",
    url: "/backColourInfo",
    dataType: "json",
    data: {
    },
    success: function (res) {
//			selectList = JSON.parse(res);
        for(var i = 0;i < res.colour.length;i++) {
            $(".colorSelect").append("<option>"+res.colour[i]+"</option>")
        }
        console.log(res);
    },
    error: function(e) {
        console.log("brandError:"+e);
    }
});
//size
$.ajax({
    type: "POST",
    url: "/backSizeInfo",
    dataType: "json",
    data: {
    },
    success: function (res) {
//			selectList = JSON.parse(res);
        for(var i = 0;i < res.size.length;i++) {
            $(".sizeSelect").append("<option>"+res.size[i]+"</option>")
        }
        console.log(res);
    },
    error: function(e) {
        console.log("brandError:"+e);
    }
});
var click=null;
$("#delDialog").dialog({
    autoOpen: false,
    width: 400,
    modal:true,
    closeOnEscape: false,
    dialogClass: "no-close",
    buttons: [
        {
            text: "确定-Ok",
            click: function() {
                $.ajax({type:"POST",
                    url: "/Manage/deleteModuleNum",
                    dataType: "json",
                    data:{ "moduleNum":click.parent().find("td").eq(0).html()},
                    success:function(res){
                        if(res.backInfo=="delete success"){
//                         $(this).parent().remove();
                            location.href=location.href;
                        }else if(res.backInfo=="cant"){
                            $("#tipDiv").find("p").html("存在使用该模版的货物，无法删除！<br>Can't delete the model No. which has been used!");
                            $("#tipDiv").dialog("open");
                        }
                    },
                    error: function(e) {
                        console.log("styleError:"+e);
                    }
                }) ;
                $(this).dialog( "close" );
            }
        },
        {
            text: "取消-Cancel",
            click: function() {
                $(this).dialog( "close" );
            }
        }
    ]
});
//$(".supplierSelect").change(function () {
//    if($(this).val()=="null"){
//        location.href=location.href;
//    }else{
//    $.ajax({
//        type:"POST",
//        url:"/Manage/backProviders",
//        dataType:"json",
//        data:{
//          "provider":$(".supplierSelect").val()
//        },
//        success:function(res){
//            $(".t2").remove();
//            for(var i = 0;i < res.listProviders.length;i++){
//                var n = i+1;
//                $("#tab").append("<tr class='t2'>" +
//                    "<td>"+n+"</td>" +
//                    "<td>"+res.listProviders[i][0]+"</td>" +
//                    "<td>"+res.listProviders[i][1]+"</td>"+
//                    "<td class='delBtn' type='button'><img class='delete' src='./img/delete.png' alt='删除-Delete'></td>" +"</tr>")
//            }
//            $(".delBtn").on("click",function(){
//                click = $(this);
//                $("#delDialog").dialog( "open" );
//            });
//            $("#tab tr:odd").css("background-color", "white");
//            $("#tab tr:even").css("background-color", "#f3f3f3");
//            $("#t1").css("background-color","#ecf6fd");
//            console.log(res);
//        },
//        error: function(e) {
//            console.log("styleError:"+e);
//        }
//    })}
//});
////控制显示
//var supSelect = false;
//$(".supplierSelect").change(function(){
//    if($(this).val() != ""){
//        supSelect = true;
//        $("#supplierCh").attr("disabled",true);
//        $("#supplier").attr("disabled",true);
//    }else{
//        supSelect = false;
//        $("#supplierCh").attr("disabled",false);
//        $("#supplier").attr("disabled",false);
//    }
//});

//添加
$("#btn1").click(function(){
    var str=$("#model").val();
    var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
    result=result.replace(/(^\s{2,})|(\s{2,}$)|(\s{2,})/g," ");
    if($(".departmentSelect").val()=="null"){
        $("#deDialog").dialog( "open" );
    }else if($(".brandSelect").val()=="null"){
        $("#brDialog").dialog( "open" );
    }else if($(".fittingSelect").val()=="null"){
        $("#fiDialog").dialog( "open" );
    }else if($(".supplierSelect").val()=="null"){
        $("#suDialog").dialog( "open" );
    }else if($(".colorSelect").val()=="null"){
        $("#coDialog").dialog( "open" );
    }else if(result==""){
        $("#empDialog").dialog( "open" );
    }else if(result.indexOf(",") >= 0){
        $("#tipDiv").find("p").html('模版输入请不要含有英文 , 逗号！<br>The input of Model No. should not contain comma: " , "');
        $("#tipDiv").dialog("open");
    }else{
        //var n = 1;
        if($(".sizeSelect").val()=="null"){
        $.ajax({
            type: "POST",
            url: "/Manage/addModuleNum",
            dataType: "json",
            data: {
                "moduleNum": result,
                "department":$(".departmentSelect").val(),
                "brand":$(".brandSelect").val(),
                "fitting":$(".fittingSelect").val(),
                "provider":$(".supplierSelect").val(),
                "colour":$(".colorSelect").val(),
                "size":"0/0"
            },
            success: function (res) {
                if (res.backInfo == "add success") {
                    location.href = location.href;
                }
                else if (res.backInfo == "Exist") {
                    $("#exDialog").dialog( "open" );
                }
            },
            error: function (e) {
                console.log("styleError:" + e);
            }
        })}else{
            $.ajax({
                type: "POST",
                url: "/Manage/addModuleNum",
                dataType: "json",
                data: {
                    "moduleNum": result,
                    "department":$(".departmentSelect").val(),
                    "brand":$(".brandSelect").val(),
                    "fitting":$(".fittingSelect").val(),
                    "provider":$(".supplierSelect").val(),
                    "colour":$(".colorSelect").val(),
                    "size":$(".sizeSelect").val()
                },
                success: function (res) {
                    if (res.backInfo == "add success") {
                        location.href = location.href;
                    }
                    else if (res.backInfo == "Exist") {
                        $("#exDialog").dialog( "open" );
                    }
                },
                error: function (e) {
                    console.log("styleError:" + e);
                }
            })
        }
    }
});
$("#model").keydown(function(event) {
    if (event.keyCode == "13") {//keyCode=13是回车键
        $('#btn1').click();
    }
});
$("#empDialog").dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    buttons: [
        {
            text: "确定-Ok",
            click: function () {
                $(this).dialog( "close" );
            }
        }
    ]
});
$("#exDialog").dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    buttons: [
        {
            text: "确定-Ok",
            click: function () {
                $(this).dialog( "close" );
            }
        }
    ]
});
$("#deDialog").dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    buttons: [
        {
            text: "确定-Ok",
            click: function () {
                $(this).dialog( "close" );
            }
        }
    ]
});
$("#brDialog").dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    buttons: [
        {
            text: "确定-Ok",
            click: function () {
                $(this).dialog( "close" );
            }
        }
    ]
});
$("#fiDialog").dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    buttons: [
        {
            text: "确定-Ok",
            click: function () {
                $(this).dialog( "close" );
            }
        }
    ]
});
$("#suDialog").dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    buttons: [
        {
            text: "确定-Ok",
            click: function () {
                $(this).dialog( "close" );
            }
        }
    ]
});
$("#coDialog").dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    buttons: [
        {
            text: "确定-Ok",
            click: function () {
                $(this).dialog( "close" );
            }
        }
    ]
});
$("#tipDiv").dialog({
    autoOpen: false,
    modal: true,
    width: 400,
    buttons: [
        {
            text: "确定-Ok",
            click: function() {
                $(this).dialog( "close" );
            }
        }
    ]
});