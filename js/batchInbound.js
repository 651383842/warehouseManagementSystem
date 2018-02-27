/**
 * Created by lixiwei on 2017/6/2.
 */
/**
 * Created by lixiwei on 2017/4/4.
 */

$(function () {
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
    function isOverTime() {
        if(loading){
            loading = false;
            $("#loadingDialog").dialog("close");
            $("#tipDiv").find("p").html("请求超时！可尝试刷新页面。<br>Overtime！Please refresh and reload");
            $("#tipDiv").dialog("open");
        }
    }

    var totalBooleanBatch = false;//包裹内货物数量与预设是否一致
    var weightAverageBatch = null;//平均重量
    var delIndexBatch = null; //删除货物的位置
    var loading = false;//超时判断
    var recommend = false;//推荐判断
    var str = null;//入库时间
    var username = null;//入库用户

    $("#modelNoSelectBatch").select2({width: "9rem"});
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

    $("#printDialogBatch").dialog({
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
                    location.href="./in&OutboundQuery.html?userID="+username;
                }
            }
        ]
    });

    $("#inboundDivBatch").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        dialogClass: "no-close",
        closeOnEscape: false,
        buttons: [
            {
                text: "确定-Ok",
                click: function() {
                    var morePac = [];
                    var pacInfo = [];
                    for(var i = 0;i < $(".goodsTrBatch").length;i++){
                        var a = [];
                        a[0] = $(".goodsTrBatch").eq(i).find("td").eq(1).text();
                        a[1] = $(".goodsTrBatch").eq(i).find("td").eq(2).text();
                        a[2] = $(".goodsTrBatch").eq(i).find("td").eq(3).text();
                        a[3] = $(".goodsTrBatch").eq(i).find("td").eq(4).text();
                        a[4] = $(".goodsTrBatch").eq(i).find("td").eq(5).text();
                        a[5] = $(".goodsTrBatch").eq(i).find("td").eq(6).text();
                        a[6] = $(".goodsTrBatch").eq(i).find("td").eq(7).text();
                        a[7] = $(".goodsTrBatch").eq(i).find("td").eq(8).find("input").val();
                        a[8] = $(".goodsTrBatch").eq(i).find("td").eq(9).find("input").val();
                        pacInfo.push(a);
                    }
                    morePac.push($(".resultTr").length);
                    for (var i = 0; i < $(".resultTr").length; i++) {
                        var eachPac = [];
                        eachPac.push($(".resultTr").eq(i).find("td").last().html());
                        eachPac.push($("#totalInputBatch").val());
                        eachPac.push($("#weightTdInputBatch").val());
                        eachPac.push($(".resultTr").eq(i).find("td").eq(1).html()+$(".resultTr").eq(i).find("td").eq(2).html());
                        eachPac.push(username);
                        for (var j = 0; j < pacInfo.length; j++) {
                            eachPac.push(pacInfo[j]);
                        }
                        morePac.push(eachPac);
                    }
                    console.log(morePac);
                    $("#loadingDialog").find("span").html("批量入库时间较长，请稍等-Batch Inbound need more time，please wait ......");
                    $("#loadingDialog").dialog("open");
                    $('#shclDefault').shCircleLoader();
                    loading = true;
                    window.setInterval(isOverTime, 1200000);
                    $.ajax({
                        type: "POST",
                        url: "/InHouse/moreSavePackage",
                        dataType: "json",
                        data: {
                            "morePac": JSON.stringify(morePac)
                        },
                        success: function (res) {
                            loading = false;
                            $( "#loadingDialog" ).dialog("close");
                            var pacIdList = "";
                            var pacIDListBatch = [];
                            for (var i = 0; i < res.pacID.length; i++) {
                                if(i == 0){
                                    pacIdList  += res.pacID[i];
                                }else{
                                    pacIdList  += ", "+ res.pacID[i];
                                }
                                pacIDListBatch.push(res.pacID[i]);
                            }
                            localStorage.setItem("pacIDListBatch", JSON.stringify(pacIDListBatch));
                            $("#resultDialogBatch").find("p").html("入库成功-Inbound Success! 包裹ID为：<br>" + pacIdList);
                            $("#printDialogBatch").find("p").html("入库包裹ID为：<br>" + pacIdList);
                            function p(s) {
                                return s < 10 ? '0' + s: s;
                            }
                            var myDate = new Date();
                            str = "" + myDate.getFullYear() + "-";
                            str += (myDate.getMonth()+1) + "-";
                            str += myDate.getDate() + " ";
                            str += (p(myDate.getHours())+ ":");
                            str += p(myDate.getMinutes());
                            $("#resultDialogBatch").dialog( "open" );
                            $("#inboundDivBatch").dialog("close");
                        },
                        error: function(e) {
                            loading = false;
                            $( "#loadingDialog" ).dialog("close");
                            $("#inboundDivBatch").dialog("close");
                            $("#tipDiv").find("p").html("入库失败，请确认！<br>Inbound Failed! Please confirm!");
                            $("#tipDiv").dialog("open");
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

    $("#resultDialogBatch").dialog({
        autoOpen: false,
        width: 400,
        modal:true,
        closeOnEscape: false,
        dialogClass: "no-close",
        buttons: [
            {
                text: "打印-Print",
                click: function() {
                    //另开打印窗口
                    var positionListBatch = [];
                    var postNumBatch = [];
                    for (var i = 0; i < $(".resultTr").length; i++) {
                        positionListBatch.push($(".resultTr").eq(i).find("td").eq(1).html()+$(".resultTr").eq(i).find("td").eq(2).html());
                        postNumBatch.push($(".resultTr").eq(i).find("td").last().html());
                    }
                    localStorage.setItem("packetTableBatch", $("#detailsTableBatch").html());
                    localStorage.setItem("postNumBatch", JSON.stringify(postNumBatch));
                    localStorage.setItem("positionListBatch", JSON.stringify(positionListBatch));
                    localStorage.setItem("operationTimeBatch", str);
                    window.open("./batchInboundPrint.html");
                    $("#printDialogBatch").dialog("open");
                    $(this).dialog("close");
                    $(this).dialog("close");
                }
            }
        ]
    });

    $("#delGoodsDivBatch").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        buttons: [
            {
                text: "确定-Ok",
                click: function() {
                    var total = 0;
                    var totalWeight = 0;
                    $("#totalTdInputBatch").css("color","#f04134");
                    $("#detailsTableBatch").find("tr").eq(delIndexBatch).remove();
                    $(".goodsTrBatch").each(function(){
                        total += parseInt($(this).find("input").eq(0).val());
                        totalWeight += parseFloat($(this).find("input").eq(1).val());
                    });
                    $("#totalTdInputBatch").val(total);
                    $("#weightTdInputBatch").val(totalWeight);
                    if($("#totalInputBatch").val() != $("#totalTdInputBatch").val()){
                        $("#totalTdInputBatch").css("color","#f04134");
                        totalBooleanBatch = false;
                    }else{
                        $("#totalTdInputBatch").css("color","black");
                        totalBooleanBatch = true;
                    }
                    for (var i = 0; i < $(".goodsTrBatch").length; i++) {
                        var n = i + 1;
                        $(".goodsTrBatch").eq(i).find("td").eq(0).html(n);
                    }

                    $("#detailsTableBatch tr:odd").css("background-color", "white");
                    $("#detailsTableBatch tr:even").css("background-color", "#f3f3f3");
                    $("#headTrBatch").css("background-color","#ecf6fd");
                    $("#totalTrBatch").css("background-color","white");

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

    $("#delAllGoodsDivBatch").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        buttons: [
            {
                text: "确定-Ok",
                click: function() {
                    $("#totalTdInputBatch").css("color","#f04134");
                    $(".goodsTrBatch").remove();
                    $("#totalTdInputBatch").val(0);
                    $("#weightTdInputBatch").val(0);
                    totalBooleanBatch = false;
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

    $("#totalInputBatch").blur(function () {
        if($(this).val() == "" || $(this).val() <= 0 || isNaN($(this).val())){
            $(this).val(100);
        }
    });

    $("#totalInputBatch").on('input propertychange', function(){
        if($("#totalInputBatch").val() != $("#totalTdInputBatch").val()){
            $("#totalTdInputBatch").css("color","#f04134");
            totalBooleanBatch = false;
        }else{
            $("#totalTdInputBatch").css("color","black");
            totalBooleanBatch = true;
        }
    });

    $("#modelNoSelectBatch").change(function () {
        $.ajax({
            type: "POST",
            url: "/home/backMoudelNumWeight",
            dataType: "json",
            data: {
                "MoudelNum": $("#modelNoSelectBatch").val()
            },
            success: function (res) {
                weightAverageBatch = res.weightAverage;
                $("#weightPBatch").html("该模版最近的平均重量为："+weightAverageBatch+"kg/件。<br>This modelNo.'s average weigth of latest packages is "+weightAverageBatch+" kg per ware.");
            },
            error: function(e) {
            }
        });
    });

    $("#weightInputBatch").keydown(function(event) {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#addButtonBatch').click();
        }
    });

    $("#addButtonBatch").click(function(){
        var no = 1 + Number($(".goodsTrBatch").last().find("td").eq(0).text());
        var modelNo = $("#modelNoSelectBatch").val();
        var num = removeSpaces($("#numInputBatch").val(),2);
        var weight = removeSpaces($("#weightInputBatch").val(),2);
        var total = 0;
        var totalWeight = 0;
        if(Number($("#totalPacInput").val()) <= 0){
            $("#tipDiv").find("p").html("包裹总数必须大于0，请确认！<br>The total of packages must be greater than 0! Please confirm!");
            $("#tipDiv").dialog("open");
        }else if(modelNo == null){
            $(".dialogP").css("display","none");
            $("#selectP").css("display","block");
            $("#dialogDiv").dialog("open");
        }else if(num == 0 || isNaN(num) || weight == 0 || isNaN(weight)){
            $(".dialogP").css("display","none");
            $("#notNullP").css("display","block");
            $("#dialogDiv").dialog("open");
        }else {
            //判断重量是否正常
            var isNormal = true;
            var hundredWeight = weight / num;
            console.log(hundredWeight);
            if(weightAverageBatch > 0 && Math.abs(weightAverageBatch - hundredWeight) >= 0.005){
                isNormal = false;
            }
            if(!isNormal){
                $("#tipDiv").find("p").html("重量误差过大，请确认！<br>Weight is not normal! Please confirm!");
                $("#tipDiv").dialog("open");
            }else {
                $.ajax({
                    type: "POST",
                    url: "/backModuleInfo",
                    dataType: "json",
                    data: {
                        "moduleNum": modelNo
                    },
                    success: function (res) {
                        var moduleNum = res.moduleInfo[0];
                        var department = res.moduleInfo[1];
                        var brand = res.moduleInfo[2];
                        var fitting = res.moduleInfo[3];
                        var provider = res.moduleInfo[4];
                        var colour = res.moduleInfo[5];
                        var size = res.moduleInfo[6];
                        var isExist = false;
                        $(".goodsTrBatch").each(function () {
                            if ($(this).find("td").eq(1).html() == modelNo) {
                                var addNum = Number(num) + Number($(this).find("input").eq(0).val());
                                var addWeight = Number(weight) + Number($(this).find("input").eq(1).val());
                                $(this).find("input").eq(0).val(addNum);
                                $(this).find("input").eq(1).val(addWeight);
                                isExist = true;
                            }
                        });
                        if (!isExist) {
                            $("#totalTrBatch").before("<tr class='goodsTrBatch'><td>" + no + "</td><td>" + moduleNum + "</td><td>" + department + "</td><td>" + brand + "</td><td>" + fitting + "</td><td>" + provider + "</td><td>" + colour + "</td><td>" + size + "</td><td><input class='tdInputBatch' type='text' value='" + num + "' readonly></td><td><input class='tdInputBatch' type='text' value='" + weight + "' readonly></td><td><span class='delSpanBatch'><img src='./img/delete.png'></span></td></tr>");
                        }
                        $(".goodsTrBatch").each(function () {
                            total += parseInt($(this).find("input").eq(0).val());
                            totalWeight += parseFloat($(this).find("input").eq(1).val());
                        });
                        $("#totalTdInputBatch").val(total);
                        $("#weightTdInputBatch").val(totalWeight);
                        if ($("#totalInputBatch").val() != $("#totalTdInputBatch").val()) {
                            $("#totalTdInputBatch").css("color", "#f04134");
                            totalBooleanBatch = false;
                        } else {
                            $("#totalTdInputBatch").css("color", "black");
                            totalBooleanBatch = true;
                        }
                    },
                    error: function (e) {
                        $("#tipDiv").find("p").html("连接失败，请重试！<br>Connect failed! Please retry!");
                        $("#tipDiv").dialog("open");
                    }
                });
            }
        }

        $("#detailsTableBatch tr:odd").css("background-color", "white");
        $("#detailsTableBatch tr:even").css("background-color", "#f3f3f3");
        $("#headTrBatch").css("background-color","#ecf6fd");
        $("#totalTrBatch").css("background-color","white");
    });

    $("#delAllSpanBatch").click(function() {
        $("#delAllGoodsDivBatch").dialog("open");
    });

    $("#detailsTableBatch").on('click','.delSpanBatch',function(){
        delIndexBatch = $(this).parent().parent().index();
        $("#delGoodsDivBatch").dialog("open");
    });

    $("#startAutoButtonBatch").click(function () {
        var numberArray = [];
        var maxQuery = null;
        if(!totalBooleanBatch){
            $(".dialogP").css("display","none");
            $("#totalP").css("display","block");
            $("#dialogDiv").dialog("open");
        }else if(Number($("#totalPacInput").val()) <= 0){
            $("#tipDiv").find("p").html("包裹总数必须大于0，请确认！<br>The total of packages must be greater than 0! Please confirm!");
            $("#tipDiv").dialog("open");
        }else{
            $(".goodsTrBatch").each(function () {
                numberArray.push($(this).find("input").eq(0).val());
            });
            var maxNum = Math.max.apply(null, numberArray);
            var no = 0;
            var state = false;
            $(".tdInputBatch[id != totalTdInputBatch]").each(function () {
               no++;
                if ($(this).val() == maxNum) {
                    if (!state) {
                        maxQuery = $(".goodsTrBatch").eq(no - 1).find("td").eq(1).html();
                        state = true;
                    }
                }
            });
            console.log(maxQuery);

            $("#loadingDialog").find("span").html("推荐中，请稍等-Recommending，please wait ......");
            $("#loadingDialog").dialog("open");
            $('#shclDefault').shCircleLoader();
            loading = true;
            window.setInterval(isOverTime, 600000);
            $.ajax({
                type: "POST",
                url: "/InHouse/smartStroeBatch",
                dataType: "json",
                data: {
                    "moduleNum": maxQuery,
                    "number": $("#totalPacInput").val()
                },
                success: function (res) {
                    if(res.isFull == true){
                        var morePos = [];
                        for (var i = 0; i < res.PositionAmount.length; i++) {
                            morePos.push(res.PositionAmount[i].positionInfo);
                        }
                        $.ajax({
                            type: "POST",
                            url: "/InHouse/unLockPos",
                            dataType: "json",
                            data: {
                                "morePos": morePos
                            },
                            success: function (res) {
                            },
                            error: function (e) {
                            }
                        });
                    }
                    loading = false;
                    $("#loadingDialog").dialog("close");
                    if($(".resultTr").length > 0) {
                        var morePos = [];
                        $(".resultTr").each(function () {
                            morePos.push($(this).find("td").eq(1).html() + $(this).find("td").eq(2).html());
                        });
                        console.log(morePos);
                        $.ajax({
                            type: "POST",
                            url: "/InHouse/unLockPos",
                            dataType: "json",
                            data: {
                                "morePos": JSON.stringify(morePos)
                            },
                            success: function (res) {
                            },
                            error: function (e) {
                            }
                        });
                    }
                    $(".resultTr").remove();
                    var total = 0;
                    for (var i = 0; i < res.PositionAmount.length; i++) {
                        $("#resultTable").find("tr").last().before("<tr class='resultTr'>" +
                            "<td></td>" +
                            "<td>"+res.PositionAmount[i].positionInfo.substring(0,2)+"</td>" +
                            "<td>"+res.PositionAmount[i].positionInfo.substring(2,5)+"</td>" +
                            "<td>"+res.PositionAmount[i].amount+"</td></tr>");
                        total += parseInt(res.PositionAmount[i].amount);
                    }
                    $("#resultTable").find("tr").last().find("td").last().html(total);
                    for (var i = 0; i < $(".resultTr").length; i++) {
                        $(this).find("td").first().html(i);
                    }
                    $("#resultTable tr:odd").css("background-color", "white");
                    $("#resultTable tr:even").css("background-color", "#f3f3f3");
                    $("#resultHeadTr").css("background-color","#ecf6fd");
                    $("#resultTable").find("tr").last().css("background-color","white");
                    if(res.isFull == false){
                        recommend = true;
                        $("#resultTable").find("tr").last().find("td").last().css("color","black");
                    }else{
                        recommend = false;
                        $("#resultTable").find("tr").last().find("td").last().css("color","red");
                        $("#tipDiv").find("p").html("推荐失败，可能库存已满，请确认重试！<br>Recommend failed! The warehouse may be full!");
                        $("#tipDiv").dialog("open");
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

    $("#saveButtonBatch").click(function () {
        if(!totalBooleanBatch){
            $(".dialogP").css("display","none");
            $("#totalP").css("display","block");
            $("#dialogDiv").dialog("open");
        }else if(Number($("#totalPacInput").val()) <= 0){
            $("#tipDiv").find("p").html("包裹总数必须大于0，请确认！<br>The total of packages must be greater than 0! Please confirm!");
            $("#tipDiv").dialog("open");
        }else if(!recommend || $("#totalPacInput").val() != $("#resultTable").find("tr").last().find("td").last().html()){
            $("#tipDiv").find("p").html("智能推荐包裹总数不一致，无法入库，请确认！<br>The total of commendatory packages is abnormal! Please confirm!");
            $("#tipDiv").dialog("open");
        }else{
            $("#inboundDivBatch").dialog("open");
        }
    });
});