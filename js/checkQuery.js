/**
 * Created by jessicababy on 2017/6/1.
 */
//插件
$("#datePicker1").datepicker({ dateFormat: 'yy-mm-dd' });
$("#datePicker2").datepicker({ dateFormat: 'yy-mm-dd' });
$("#modelInput").select2({width: "9rem"});

$.ajax({
    type: "POST",
    url: "/backModuleNum",
    dataType: "json",
    data: {
    },
    success: function (res) {
        $("#modelInput").each(function(){
            $(this).html("<option selected value=''>模版-Model No.</option>");
        });
        for(var i = 0;i < res.moduleNum.length;i++) {
            $("#modelInput").each(function(){
                $(this).append("<option>"+res.moduleNum[i]+"</option>");
            })
        }
    },
    error: function(e) {}
});

//点击查询 与后台交互
$("#submit").click(function (){
    //对MODEL进行处理
    $(".t2").remove();
    var str=$("#modelInput").val();
    var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
    result=result.replace(/(^\s{2,})|(\s{2,}$)|(\s{2,})/g," ");
    //判断条件是否为空
    if(result==''){
        if($("#datePicker1").val()==''||$("#datePicker2").val()==''){
            $("#checkDialog").dialog( "open" );
        }else{
            $.ajax({
                type: "POST",
                url: "/home/backDetailedErrorJeansNum",
                dataType: "json",
                data: {
                    "beginDate":$("#datePicker1").val(),
                    "endDate":$("#datePicker2").val(),
                    "moudelNum":"null"
                },
                //结果加入表格
                success: function (res) {
                    if(res.wares.length=='0'){
                        $("#emptyDialog").dialog( "open" );
                    }
                    for(var i = 0;i < res.wares.length;i++){
                        var n=i+1;
                        $("#tab").append("<tr class='t2'>" +
                            "<td>"+n+"</td>" +
                            "<td>"+res.wares[i].moduleNum+"</td>" +
                            "<td>"+res.wares[i].amount+"</td>"+
                            "<td>"+res.wares[i].time+"</td>"+ "</tr>")
                    }
                    $("#tab tr:odd").css("background-color", "white");
                    $("#tab tr:even").css("background-color", "#f3f3f3");
                    $("#t1").css("background-color","#ecf6fd");
                    console.log(res);
                },
                error: function(e) {
                    console.log("supplierError:"+e);
                }
            })
        }
    }else{
        if($("#datePicker1").val()==''&&$("#datePicker2").val()==''){
            $.ajax({
                type: "POST",
                url: "/home/backDetailedErrorJeansNum",
                dataType: "json",
                data: {
                    "beginDate":"null",
                    "endDate":"null",
                    "moudelNum":result
                },
                //结果加入表格
                success: function (res) {
                    if(res.wares.length=='0'){
                        $("#emptyDialog").dialog( "open" );
                    }
                    for(var i = 0;i < res.wares.length;i++){
                        var n=i+1;
                        $("#tab").append("<tr class='t2'>" +
                            "<td>"+n+"</td>" +
                            "<td>"+res.wares[i].moduleNum+"</td>" +
                            "<td>"+res.wares[i].amount+"</td>"+
                            "<td>"+res.wares[i].time+"</td>"+ "</tr>")
                    }
                    $("#tab tr:odd").css("background-color", "white");
                    $("#tab tr:even").css("background-color", "#f3f3f3");
                    $("#t1").css("background-color","#ecf6fd");
                    console.log(res);
                },
                error: function(e) {
                    console.log("supplierError:"+e);
                }
            })
        }else if($("#datePicker1").val()!=''&&$("#datePicker2").val()!=''){
            $.ajax({
                type: "POST",
                url: "/home/backDetailedErrorJeansNum",
                dataType: "json",
                data: {
                    "beginDate":$("#datePicker1").val(),
                    "endDate":$("#datePicker2").val(),
                    "moudelNum":result
                },
                //结果加入表格
                success: function (res) {
                    if(res.wares.length=='0'){
                        $("#emptyDialog").dialog( "open" );
                    }
                    for(var i = 0;i < res.wares.length;i++){
                        var n=i+1;
                        $("#tab").append("<tr class='t2'>" +
                            "<td>"+n+"</td>" +
                            "<td>"+res.wares[i].moduleNum+"</td>" +
                            "<td>"+res.wares[i].amount+"</td>"+
                            "<td>"+res.wares[i].time+"</td>"+ "</tr>")
                    }
                    $("#tab tr:odd").css("background-color", "white");
                    $("#tab tr:even").css("background-color", "#f3f3f3");
                    $("#t1").css("background-color","#ecf6fd");
                    console.log(res);
                },
                error: function(e) {
                    console.log("supplierError:"+e);
                }
            })
        }else{
            $("#checkDialog").dialog( "open" );
        }
    }

});
//对话框
$("#checkDialog").dialog({
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
$("#emptyDialog").dialog({
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