/**
 * Created by lixiwei on 2017/5/23.
 */
$(function () {
    var shelf = [];
    var shelfNum = null;//存储货架数量
    var delIndex = "";//删除的包裹的index
    var totalBoolean = false;//包裹总数是否一致
    var finalShelf = "";//最终入库信息
    var finalPosition = "";
    var finalPacketID = "6666";
    var total = 0;//用于计算包裹内货物数量
    var totalWeight = 0;//用于计算包裹内货物总重量
    var supplier = null;//存储当前供应商选择
    var str = null;//存储入库时间
    var pacList = [[0,1,2]];//用于存放包裹内货物信息
    var inboundState = false;//入库是否成功
    var username = null;//入库用户
    var loading = false;//超时判断
    var weightAverage = 0;//选中modelno的平均重量

    function isOverTime() {
        if(loading){
            loading = false;
            $("#loadingDialog").dialog("close");
            $("#tipDiv").find("p").html("请求超时！可尝试刷新页面。<br>Overtime！Please refresh and reload");
            $("#tipDiv").dialog("open");
        }
    }

    function removeSpaces(str,type){
        if(type == 1){
            str = str.replace(/(^\s+)|(\s+$)/g,"");
        }else if(type == 2){
            str = str.replace(/\s/g,"");
        } else{
            str = str.replace(/(^\s+)|(\s+$)/g,"");
            str = str.replace(/(^\s{2,})|(\s{2,}$)|(\s{2,})/g," ");
        }
        return str;
    }

    $.ajax({
        type: "POST",
        url: "/getUserInfomation",
        dataType: "json",
        data: {
        },
        success: function (res) {
            console.log(res);
            username = res.UserInfomation.username;
        },
        error: function (e) {
            $("#tipDiv").find("p").html("连接失败，请重试！<br>Connect failed! Please retry!");
            $("#tipDiv").dialog("open");
        }
    });

    $("#tipDiv").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        buttons: [
            {
                text: "确定-Ok",
                click: function() {
                    if($("#tipDiv").find("span").html() == "abnormal"){
                        location.reload();
                    }
                    $(this).dialog( "close" );
                }
            }
        ]
    });

    $("#reInboundDiv").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        dialogClass: "no-close",
        closeOnEscape: false,
        buttons: [
            {
                text: "确定-Ok",
                click: function() {
                    var check = [];
                    check.push($("#idInput").val());
                    check.push($("#totalTdInputRe").val());
                    $(".goodsTrRe").each(function () {
                        check.push([$(this).find("td").eq(9).html(),$(this).find("input").val()]);
                    });
                    console.log(check);
                    $.ajax({
                        type: "POST",
                        url: "/OutHouse/CheckPac",
                        dataType: "json",
                        data: {
                            "check": JSON.stringify(check)
                        },
                        success: function (res) {
                            if(res.listPac[1] == "success"){
                                location.reload();
                            }else{
                                $("#reInboundDiv").dialog("close");
                                $("#tipDiv").find("p").html("重新入库成功，该包裹数量异常，需要校验员进行修正！<br>Success! But the number of package's wares is abnormal. It needs the inspector to check it.");
                                $("#tipDiv").find("p").css("color","red");
                                $("#tipDiv").find("span").html("abnormal");
                                $("#tipDiv").dialog("open");
                            }
                        },
                        error: function (e) {
                            $("#tipDiv").find("p").html("连接失败，请重试！<br>Connect failed! Please retry!");
                            $("#tipDiv").dialog("open");
                            $("#reInboundDiv").dialog("close");
                        }
                    });
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

    $("#idButton").click(function () {
        var pacID = $("#idInput").val();
        if((pacID != "" && pacID.length != 8) || isNaN(pacID) || pacID == ""){
            $("#tipDiv").find("p").html("包裹ID输入必须为8位且为数字！<br> The length of PackID should be 8, and the PackID should be a number!");
            $("#tipDiv").dialog("open");
        }else{
            $.ajax({
                type: "POST",
                url: "/OutHouse/backJeans",
                dataType: "json",
                data: {
                    "pacID": pacID
                },
                success: function (res) {
                    if(res.listJeans[0] == "no"){
                        $("#tipDiv").find("p").html("该包裹已完全出库！<br>The package is outbound totally!");
                        $("#tipDiv").dialog("open");
                    }else if(res.listJeans[0] == "mid"){
                        $("#tipDiv").find("p").html("该包裹未出库，不能重新入库！<br>The package has been inbound!");
                        $("#tipDiv").dialog("open");
                    }else if(res.listJeans[0] == "exist"){
                        $("#tipDiv").find("p").html("该包裹为数目异常包裹，不能重新入库！<br>The package is abnormal!");
                        $("#tipDiv").dialog("open");
                    }else {
                        $("#goodsDivRe").css("display","block");
                        $(".goodsTrRe").remove();
                        $("#totalTdInputRe").val(0);
                        for (var i = 1; i < res.listJeans.length; i++) {
                            var result = res.listJeans;
                            var listJeans = res.listJeans[i];
                            $.ajax({
                                type: "POST",
                                url: "/backModuleInfo",
                                dataType: "json",
                                data: {
                                    "moduleNum": listJeans[1]
                                },
                                success: function (res) {
                                    var modalNo = res.moduleInfo[0];
                                    var department = res.moduleInfo[1];
                                    var brand = res.moduleInfo[2];
                                    var fitting = res.moduleInfo[3];
                                    var provider = res.moduleInfo[4];
                                    var colour = res.moduleInfo[5];
                                    var size = res.moduleInfo[6];
                                    var jeansID = null;
                                    var n = $(".goodsTrRe").length + 1;

                                    for (var j = 1; j < result.length; j++) {
                                        if(result[j][1] == modalNo){
                                            jeansID = result[j][0];
                                            break;
                                        }
                                    }
                                    
                                    $("#totalTrRe").before("<tr class='goodsTrRe'>" +
                                        "<td>"+ n +"</td>" +
                                        "<td>" + modalNo + "</td>" +
                                        "<td>" + department + "</td>" +
                                        "<td>" + brand + "</td>" +
                                        "<td>" + fitting + "</td>" +
                                        "<td>" + provider + "</td>" +
                                        "<td>" + colour + "</td>" +
                                        "<td>" + size + "</td>" +
                                        "<td><input type='number' style='width: 5rem' class='numInput'></td>" +
                                        "<td style='display:none;'>" + jeansID + "</td></tr>");

                                    $(".numInput").on('input propertychange', function(){
                                        var total = 0;
                                        $(".numInput").each(function () {
                                            total += parseInt($(this).val());
                                        });
                                        $("#totalTdInputRe").val(total);
                                    });
                                },
                                error: function (e) {
                                }
                            })
                        }
                    }
                },
                error: function (e) {
                    $("#tipDiv").find("p").html("连接失败，请重试！<br>Connect failed! Please retry!");
                    $("#tipDiv").dialog("open");
                }
            });
        }
    });

    $("#idInput").keydown(function(event) {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#idButton').click();
        }
    });

    $("#saveButtonRe").click(function () {
        var pacID = $("#idInput").val();
        if ((pacID != "" && pacID.length != 8) || isNaN(pacID) || pacID == "") {
            $("#tipDiv").find("p").html("包裹ID输入必须为8位且为数字！<br> The length of PackID should be 8, and the PackID should be a number!");
            $("#tipDiv").dialog("open");
        } else {
            var num = $("#totalTdInputRe").val();
            if (isNaN(num) || num <= 0) {
                $("#tipDiv").find("p").html("货物数量必须大于0！<br> The number of wares should be greater than 0!");
                $("#tipDiv").dialog("open");
            } else {
                $("#reInboundDiv").dialog("open");
            }
        }
    });

    /*$("#resultDialog").dialog({
        autoOpen: false,
        width: 400,
        modal:true,
        closeOnEscape: false,
        dialogClass: "no-close",
        buttons: [
            {
                text: "打印-Print",
                click: function() {
                    if(inboundState) {
                        $("#printDialog").find("p").html("该包裹重新入库成功!");
                        //另开打印窗口
                        localStorage.setItem("packetID", finalPacketID);
                        localStorage.setItem("packetTable", $("#detailsTableReRe").html());
                        localStorage.setItem("shelf", finalShelf);
                        localStorage.setItem("position", finalPosition);
                        localStorage.setItem("operationTime", str);
                        window.open("./inboundPrint.html");
                        $("#printDialog").dialog("open");
                        $(this).dialog("close");
                    }else{
                        $(this).dialog("close");
                        $(":button:contains('确定Ok')").text("打印-Print");
                    }
                }
            }
        ]
    });

    $("#printDialog").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        closeOnEscape: false,
        dialogClass: "no-close",
        buttons: [
            {
                text: "成功-Success!",
                click: function() {
                    window.location.reload(true);
                }
            },
            {
                text: "失败！重新打印-Failure！Query and reprint",
                click: function() {
                    //跳转查询
                    location.href="./in&OutboundQuery.html?packetID="+finalPacketID;
                }
            }
        ]
    });*/

});