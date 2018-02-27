/**
 * Created by jessicababy on 2017/5/19.
 */
var click=null;
//打开页面展示信息
$.ajax({
    type: "POST",
    url: "/backBrandInfo",
    dataType: "json",
    data: {
    },
    success: function (res) {
        var n = 0;
        for(var i = res.brand.length - 1;i >= 0;i--){
            n++;
            $("#tab").append("<tr class='t2'>" +
                "<td>"+n+"</td>" +
                "<td>"+res.brand[i]+"</td>" +
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
//添加功能
$("#addBtn").click(function(){
    var n;
    var str=$("#brandCh").val();
    var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
    result=result.replace(/(^\s{2,})|(\s{2,}$)|(\s{2,})/g," ");
    var str2=$("#brand").val();
    var result2=str2.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
    result2=result2.replace(/(^\s{2,})|(\s{2,}$)|(\s{2,})/g," ");
    result2=result2.toUpperCase();
    if(result=="")
    {$("#chDialog").dialog( "open" );}
    else if(result2=="")
    { $("#enDialog").dialog( "open" );}
    else if(result.indexOf(",") >= 0 || result2.indexOf(",") >= 0) {
        $("#tipDiv").find("p").html('品牌输入请不要含有英文 , 逗号！<br>The input of Brand should not contain comma: " , "');
        $("#tipDiv").dialog("open");
    }else {
        ////测试
        //n=$(".t2").length+1;
        //$("#tab").append("<tr class='t2'>" +
        //    "<td>" + n  + "</td>" +
        //    "<td>" + $("#sizeCh").val() + $("#size").val() + "</td>" +
        //    "<td class='delBtn' type='button'><img class='delete' src='./img/delete.png' alt='删除-Delete'></td>" +"</tr>");
        //$(".delBtn").on("click",function(){
        //    $(this).parent().remove();
        //});
        $.ajax({
            type: "POST",
            url: "/Manage/addBrand",
            dataType: "json",
            data: {
                "brand":result+"/"+result2
            },
            success:function (res){
                if(res.backInfo=="add success"){
                    location.href=location.href;
                    /*n=$(".t2").length+1;
                     alert("1")
                     $("#tab").append("<tr class='t2'>" +
                     "<td>"+ n+"</td>" +
                     "<td>"+$("#sizeCh").val()+$("#size").val()+"</td>" +
                     "<td class='delBtn' type='button'><img class='delete' src='./img/delete.png' alt='删除-Delete'></td>" +"</tr>");*/}
                else if(res.backInfo=="Exist"){
                    $("#exDialog").dialog( "open" );
                }
            },
            error: function(e) {
                console.log("styleError:"+e);
            }
        })
    }
});
$("#brand").keydown(function(event) {
    if (event.keyCode == "13") {//keyCode=13是回车键
        $('#addBtn').click();
    }
});
$("#delDialog").dialog({
    autoOpen: false,
    width: 400,
    modal: true,
    buttons: [
        {
            text: "确定-Ok",
            click: function() {
                $.ajax({type:"POST",
                    url: "/Manage/deleteBrand",
                    dataType: "json",
                    data:{ "brand":click.parent().find("td").eq(1).html()},
                    success:function(res){
                        if(res.backInfo=="delete success")
                        {
//                    	$(this).parent().remove();
//                        alert("操作成功success");
                            location.href=location.href;
                        }else if(res.backInfo=="cant"){
                            $("#tipDiv").find("p").html("存在使用该品牌的模版，无法删除！<br>Can't delete the Brand which has been used in model No.!");
                            $("#tipDiv").dialog("open");
                        }},
                    error: function(e) {
                        console.log("styleError:"+e);
                    }
                })
                ;
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
$("#enDialog").dialog({
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
$("#chDialog").dialog({
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
//$(".delBtn").on("click", function () {
//    $(this).parent().remove();});
////$(".delBtn").on("click",function(){
////    if(confirm("确认操作？")){
////        $(this).parent().remove();}
////});
