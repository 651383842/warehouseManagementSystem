/**
 * Created by lixiwei on 2017/5/27.
 */
$(function () {
    var xDate = [];
    var chartData =[{
        name: '异常包裹-Abnormal Packages',
        data: []
    }/*, {
        name: '超额-Excess',
        data: []
    }*/];
    var beginDate = null;
    var endDate = null;

    $( "#tabs" ).tabs();
    $("#modelNoSelect").select2({width: "9rem"});
    $("#datePicker1").datepicker({ dateFormat: 'yy-mm-dd' });
    $("#datePicker2").datepicker({ dateFormat: 'yy-mm-dd' });

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

    $( "#loadingDialog" ).dialog({
        autoOpen: false,
        width: 400,
        modal:true,
        closeOnEscape: false,
        dialogClass: "no-close"
    });

    $.ajax({
        type: "POST",
        url: "/backModuleNum",
        dataType: "json",
        data: {
        },
        success: function (res) {
            console.log(res);
            $("#modelNoSelect").append("<option disabled selected></option>");
            for(var i = 0;i < res.moduleNum.length;i++) {
                $("#modelNoSelect").append("<option>"+res.moduleNum[i]+"</option>")
            }
        },
        error: function(e) {
        }
    });

    $("#modelNoSelect").change(function () {
        var thisDom = $(this);
        $.ajax({
            type: "POST",
            url: "/home/backMoudelNumWeight",
            dataType: "json",
            data: {
                "MoudelNum": thisDom.val()
            },
            success: function (res) {
                var data = null;
                data = res.packageId;
                var lineXDate = data.reverse();
                // var lineXDate = [];
                data = res.weight;
                var weights = data.reverse();
                var average = res.weightAverage;
                console.log(res);
                $("#lineChartDiv").empty();
                for (var i = 1; i < 101; i++) {
                    lineXDate.push(i);
                }
                $('#lineChartDiv').highcharts({
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: "Model No.的历史重量-Model No.' Weight History"
                    },
                    subtitle: {
                        text: '最近100包的货物平均单位重量-Average weight of a ware of latest 100 packages'
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        categories: lineXDate,
                        title: {
                            text: '包裹ID-PackageID',
                            align: 'high'
                        }
                    },
                    yAxis: {
                        title: {
                            text: '重量-Weight'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: false // 数据标签
                            },
                            //enableMouseTracking: false // 鼠标跟踪，对应的提示框、点击事件
                        }
                    },
                    series: [{
                        name: '平均重量-Average Weight: ' + average + 'kg',
                        data: weights
                    }]
                });
            },
            error: function(e) {
            }
        });
    });

    $("#modelNoSelect").change();

    $(".button").click(function(){
        if($("#datePicker1").val() == "" || $("#datePicker2").val() == ""){
            $("#tipDiv").find("p").html("请选择查询时间起止！<br>Please select the beginning and end of query time!");
            $("#tipDiv").dialog("open");
        }else {
            if ($("#datePicker1").val() < $("#datePicker2").val()) {
                beginDate = $("#datePicker1").val();
                endDate = $("#datePicker2").val();
            } else {
                beginDate = $("#datePicker2").val();
                endDate = $("#datePicker1").val();
            }
            var range = (new Date(endDate) - new Date(beginDate)) / (1000 * 3600 * 24 * 365);
            console.log(range);
            if (range > 3) {
                $("#tipDiv").find("p").html("查询时间限制范围为三年（365*3）！<br>Query time is limited to three year（365*3）!");
                $("#tipDiv").dialog("open");
            } else {
                $("#loadingDialog").find("span").html("统计绘图中，请稍等-Chart is creating，please wait ......<br>注意：规模较大的图表可能需要较长时间，请耐心等候！<br>Warn: the chart may too large to create in short time, please wait patiently!");
                $("#loadingDialog").dialog("open");
                $('#shclDefault').shCircleLoader();
                $.ajax({
                    type: "POST",
                    url: "/home/backErrorJeansNum",
                    dataType: "json",
                    data: {
                        "beginDate": beginDate,
                        "endDate": endDate
                    },
                    success: function (res) {
                        $("#loadingDialog").dialog("close");
                        var data = [];
                        for (var i = 0; i < res.areaspline.OutDay.length; i++) {
                            data.push(parseInt(res.areaspline.OutDay[i]) + parseInt(res.areaspline.InDay[i]));
                        }
                        chartData[0].data = data.reverse();

                        xDate = [];
                        xDate.length = (new Date(endDate) - new Date(beginDate)) / (1000 * 3600 * 24) + 1;
                        xDate[0] = beginDate;
                        for (var i = 1; i < (new Date(endDate) - new Date(beginDate)) / (1000 * 3600 * 24) + 1; i++) {
                            var myDate = new Date(beginDate);
                            myDate.setDate(myDate.getDate() + i);
                            var str = "" + myDate.getFullYear() + "-";
                            str += (myDate.getMonth() + 1) + "-";
                            str += myDate.getDate();
                            xDate[i] = str;
                        }
                        $("#areaSplineDiv").empty();
                        $("#areaSplineDiv").highcharts({
                            chart: {
                                type: 'areaspline'
                            },
                            title: {
                                text: '每天异常货物数量-The Chart of Warehouse Abnormal Wares Per Day'
                            },
                            /*legend: {
                                layout: 'vertical',
                                align: 'left',
                                verticalAlign: 'top',
                                x: 100,
                                y: 30,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                            },*/
                            xAxis: {
                                categories: xDate
                            },
                            yAxis: {
                                title: {
                                    text: "货物件数-The Wares'Num"
                                }
                            },
                            tooltip: {
                                shared: true,
                                valueSuffix: ' 件-Wares'
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                areaspline: {
                                    fillOpacity: 0.5
                                }
                            },
                            series: chartData
                        });
                    },
                    error: function (e) {
                        $("#loadingDialog").dialog("close");
                        $("#tipDiv").find("p").html("连接失败，请重试！<br>Connect failed! Please retry!");
                        $("#tipDiv").dialog("open");
                    }
                });
            }
        }
    });

    var str = null;
    var myDate = new Date();
    var beginDate = new Date();
    str = "" + myDate.getFullYear() + "-";
    str += (myDate.getMonth() + 1) + "-";
    str += myDate.getDate();
    endDate = str;
    beginDate.setDate(new Date(endDate).getDate() - 11);
    myDate = beginDate;
    beginDate = "" + myDate.getFullYear() + "-";
    beginDate += (myDate.getMonth() + 1) + "-";
    beginDate += myDate.getDate();

    $.ajax({
        type: "POST",
        url: "/home/backErrorJeansNum",
        dataType: "json",
        data: {
            "beginDate": beginDate,
            "endDate": endDate
        },
        success: function (res) {
            $("#loadingDialog").dialog("close");
            var data = [];
            for (var i = 0; i < res.areaspline.OutDay.length; i++) {
                data.push(parseInt(res.areaspline.OutDay[i]) + parseInt(res.areaspline.InDay[i]));
            }
            chartData[0].data = data.reverse();

            xDate = [];
            xDate.length = (new Date(endDate) - new Date(beginDate)) / (1000 * 3600 * 24) + 1;
            xDate[0] = beginDate;
            for (var i = 1; i < (new Date(endDate) - new Date(beginDate)) / (1000 * 3600 * 24) + 1; i++) {
                var myDate = new Date(beginDate);
                myDate.setDate(myDate.getDate() + i);
                var str = "" + myDate.getFullYear() + "-";
                str += (myDate.getMonth() + 1) + "-";
                str += myDate.getDate();
                xDate[i] = str;
            }
            $("#areaSplineDiv").empty();
            $("#areaSplineDiv").highcharts({
                chart: {
                    type: 'areaspline'
                },
                title: {
                    text: '每天异常货物数量-The Chart of Warehouse Abnormal Wares Per Day'
                },
                /*legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 30,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },*/
                xAxis: {
                    categories: xDate
                },
                yAxis: {
                    title: {
                        text: "货物件数-The Wares'Num"
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' 件-Wares'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.5
                    }
                },
                series: chartData
            });
        },
        error: function (e) {
            $("#loadingDialog").dialog("close");
            $("#tipDiv").find("p").html("连接失败，请重试！<br>Connect failed! Please retry!");
            $("#tipDiv").dialog("open");
        }
    });
});