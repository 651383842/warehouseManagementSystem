/**
 * Created by lixiwei on 2017/4/9.
 */

$(function () {
	var packets = [];
	var username = null;
	var admin = false;
	var user = null;
    var loading = false;

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

    $( "#loadingDialog" ).dialog({
        autoOpen: false,
        width: 400,
        modal:true,
        closeOnEscape: false,
        dialogClass: "no-close"
    });

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

	$.ajax({
		type: "POST",
		url: "/getUserInfomation",
		dataType: "json",
		data: {
		},
		success: function (res) {
			console.log(res);
			if(res.UserInfomation.role != 0){
				admin = false;
				user = res.UserInfomation.username;
			}else{
				admin = true;
			}
		},
		error: function (e) {
            $("#tipDiv").find("p").html("连接失败，请重试！<br>Connect failed! Please retry!");
            $("#tipDiv").dialog("open");
		}
	});

	/*$("#datePicker").datepicker({ dateFormat: 'yy-mm-dd' });

	$("#cleanDatePicker").click(function () {
       $("#datePicker").val("");
    });*/

	$("#query").click(function(){
		var packetId = removeSpaces($("#packetInput").val(),2);
        /*var queryPosition = removeSpaces($("#positionInput").val(),2);
		var queryTime = $("#datePicker").val();
        if(packetId == "" && removeSpaces($("#idInput").val(),2) == "" && queryPosition == "" && $("#datePicker").val() == ""){
            $("#tipDiv").find("p").html("至少需要一个查询条件！<br>It needs at least one query condition!");
            $("#tipDiv").dialog("open");
        }else */if((packetId != "" && packetId.length != 8)  || isNaN(packetId)){
            $("#tipDiv").find("p").html("包裹ID输入必须为8位且为数字！<br> The length of PackID should be 8, and the PackID should be a number!");
            $("#tipDiv").dialog("open");
        }/*else if(queryPosition != "" && queryPosition.indexOf("-") < 0){
            $("#tipDiv").find("p").html("位置输入格式有误！（正确如：01-101）<br> The format of position is wrong!(eg. 01-101)");
            $("#tipDiv").dialog("open");
        }else if(queryPosition != "" && (isNaN(queryPosition.split("-")[0]) || queryPosition.split("-")[0].length != 2 || isNaN(queryPosition.split("-")[1]) || queryPosition.split("-")[1].length != 3)){
            $("#tipDiv").find("p").html("位置输入格式有误！（正确如：01-101）<br> The format of position is wrong!(eg. 01-101)");
            $("#tipDiv").dialog("open");
		}*/else {
            $( "#loadingDialog" ).find("span").html("查询中，请稍等-Querying，please wait ......");
            $( "#loadingDialog" ).dialog("open");
            $('#shclDefault').shCircleLoader();
            loading = true;
            window.setInterval(isOverTime,600000);
            /*if(queryPosition != ""){
                queryPosition = queryPosition.split("-")[0]+queryPosition.split("-")[1];
            }*/
            if(packetId == ""){
                packetId = "null"
            }
            $.ajax({
                type: "POST",
                // url: "/InOutRecordQuery/InOrOutRecordQuery",
                url: "/InOutRecordQuery/ErroPackageQuery",
                dataType: "json",
                data: {
                    // "positionInfo": queryPosition,
                    "ErroPackageId": packetId
                    // "Time": queryTime,
                    // "Username": removeSpaces($("#idInput").val(),2),
                },
                success: function (res) {
                    loading = false;
                    $( "#loadingDialog" ).dialog("close");
                    $(".t2").remove();
                    packets = [];
                    if (res.wares.length == 0) {
                        $("#tipDiv").find("p").html("没有找到符合条件的结果！<br>No proper result!");
                        $("#tipDiv").dialog("open");
                    } else {
                        for (var i = 0; i < res.wares.length; i++) {
                            var isExist = false;
                            for (var n = 0; n < packets.length; n++) {
                                if (packets[n].packageID == res.wares[i].packageID) {
                                    isExist = true;
                                    packets[n].amount += res.wares[i].amount;
                                    break;
                                }
                            }
                            if (!isExist) {
                                packets.push({
                                    "UserId": res.wares[i].UserId,
                                    "packageID": res.wares[i].packageID,
                                    "positionInfo": res.wares[i].positionInfo,
                                    "time": res.wares[i].time,
                                    "amount": res.wares[i].amount
                                });
                            }
                        }
                        for (var i = 0; i < packets.length; i++) {
                            $("#tab").append("<tr class='t2 packetTr'> " +
                                "<td class='toggleTd'><span class='open'>详情</span><span class='close'>详情</span></td> " +
                                "<td>" + packets[i].UserId + "</td> " +
                                "<td>" + packets[i].packageID + "</td> " +
                                "<td></td> " +
                                "<td></td> " +
                                "<td></td> " +
                                "<td></td> " +
                                "<td></td> " +
                                "<td></td> " +
                                "<td></td> " +
                                "<td>" + packets[i].positionInfo.substring(0,2)+"-"+packets[i].positionInfo.substring(2,5) + "</td> " +
                                "<td>" + packets[i].time + "</td> " +
                                // "<td></td> " +
                                "<td>" + packets[i].amount + "</td> " +
                                "</tr>");
                        }
                        $(".packetTr").each(function () {
                            var id = $(this).find("td").eq(2).html();
                            for (var i = res.wares.length - 1; i >= 0; i--) {
                                if (res.wares[i].packageID == id) {
                                    $(this).after("<tr class='t2'> " +
                                        "<td></td> " +
                                        "<td>" + res.wares[i].UserId + "</td> " +
                                        "<td>" + res.wares[i].packageID + "</td> " +
                                        "<td>" + res.wares[i].moduleNum + "</td> " +
                                        "<td>" + res.wares[i].department + "</td> " +
                                        "<td>" + res.wares[i].brand + "</td> " +
                                        "<td>" + res.wares[i].fitting + "</td> " +
                                        "<td>" + res.wares[i].provider + "</td> " +
                                        "<td>" + res.wares[i].size + "</td> " +
                                        "<td>" + res.wares[i].colour + "</td> " +
                                        "<td>" + res.wares[i].positionInfo.substring(0,2)+"-"+res.wares[i].positionInfo.substring(2,5) + "</td> " +
                                        "<td>" + res.wares[i].time + "</td> " +
                                        "<td>" + res.wares[i].amount + "</td></tr>")
                                }
                            }
                        });
                        $(".t2[ class!='t2 packetTr']").each(function () {
                            $(this).addClass("wareTr");
                        });

                        $(".wareTr").css("background-color", "#f3f3f3");

                        $(".toggleTd").click(function () {
                            var packetId = $(this).parent().find("td").eq(2).html();
                            $(this).find(".open").toggle();
                            $(this).find(".close").toggle();
                            $(".wareTr").each(function () {
                                $(this).find("td").eq(2).each(function () {
                                    if ($(this).html() == packetId) {
                                        $(this).parent().fadeToggle();
                                    }
                                });
                            });
                        });
                    }
                },
                error: function (e) {
                    loading = false;
                    $( "#loadingDialog" ).dialog("close");
                    $("#tipDiv").find("p").html("连接失败，请重试！<br>Connect failed! Please retry!");
                    $("#tipDiv").dialog("open");
                }
            });
        }
	});

    /*$("#idInput").keydown(function(event) {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#query').click();
        }
    });*/
    $("#packetInput").keydown(function(event) {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#query').click();
        }
    });
    /*$("#positionInput").keydown(function(event) {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#query').click();
        }
    });*/
});
