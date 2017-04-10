/**
 * Created by lixiwei on 2017/4/2.
 */

$(function () {
	var beginDate = null;
	var endDate = null;
	var xDate = [
			"2017.3.1",
			"2017.3.2",
			"2017.3.3",
			"2017.3.4",
			"2017.3.5",
			"2017.3.6",
			"2017.3.7",
			"2017.3.8",
			"2017.3.9",
			"2017.3.10",
			"2017.3.11",
			"2017.3.12"
	];
	var chartData1 =[{
		name: '出库-Outbound ',
		data: [30, 40, 30, 50, 40, 100, 120, 50, 60, 80, 90, 200]
		}, {
		name: '入库-Inbound',
		data: [10, 30, 40, 30, 30, 50, 40, 60, 100, 120, 50, 10]
	}];
	var chartData2 =[{
		name: '出库-Outbound',
		data: [1230, 4321, 2512, 6670, 1320, 4322, 2513, 1324, 4325, 2516, 6671, 1322],
	}, {
		name: '入库-Inbound',
		data: [1333, 1562, 6471, 4082, 1063, 1336, 1568, 6476, 4080, 1062, 1335, 1568],
		color: "grey",
	}];
	var usedData = 120.0;
	var restData = null;
	var year = 2016;

	$("#datePicker1").datepicker();
	$("#datePicker2").datepicker();

	/*$(".button").click(function(){
		if($("#datePicker1").val() < $("#datePicker2").val()){
			beginDate = $("#datePicker1").val();
			endDate = $("#datePicker2").val();
			alert(beginDate);
		}else{
			beginDate = $("#datePicker2").val();
			endDate = $("#datePicker1").val();
			alert(beginDate);
		}
	});*/

	$("#areaSplineDiv").highcharts({
		chart: {
			type: 'areaspline'
		},
		title: {
			text: '入库出库统计图-The Chart Of Wares Inbound and Outbound '
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 100,
			y: 30,
			floating: true,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		xAxis: {
			categories: xDate
		},
		yAxis: {
			title: {
				text: '包裹数量/包-The number Of Wares/Packet'
			}
		},
		tooltip: {
			shared: true,
			valueSuffix: ' 包-Packet'
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
			}
		},
		series: chartData1
	});

	if(usedData > 100){
		restData = 0;
		$('#pieChartDiv').empty();
		$('#pieChartDiv').highcharts({
			chart: {
				type: 'pie'
			},
			title: {
				text: '当前库存量（1000）使用情况-The Current Warehouse Usage(Max-Standard:1000)'
			},
			subtitle: {
				text: '内环为标准库存，外环为过载库存-The Inside Is Standard Usage. The Outside Is Overload Usage'
			},
			yAxis: {
				title: {
					text: '总百分比市场份额'
				}
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				pie: {
					shadow: false,
					center: ['50%', '53%']
				}
			},
			tooltip: {
				valueSuffix: '%',
				useHTML: true,
				pointFormatter: function() {
					if(this.name === ''){
						return null
					}else{
						return '<span style="display:inline-block;border-radius:10px;width:9px;height:9px;background-color:'+this.color+'"></span> '+this.name+': <b>'+this.percentage+'%</b><br/>'
					}
				}
			},
			series: [{
				name: '标准-Standard',
				data: [
					{
						name: '未使用-Rest',
						y: 0,
						color: 'white'
					},
					{
						name: '已使用-Used',
						y: 100,
						color: 'orange'
					}
				],
				size: '70%',
				dataLabels: {
					format: '{point.name}: {point.percentage} %',
					color: 'white',
					distance: -30
				}
			}, {
				name: '过载-Overload',
				data: [
					{
						name: '过载-Overload',
						y: usedData-100,
						sliced: true,
						selected: true,
						color: 'red'
					},
					{
						name: '',
						y: 200-usedData,
						color: 'PaleGreen'
					}
				],
				size: '130%',
				innerSize: '60%',
				dataLabels: {
					formatter: function() {
						if(this.point.name == '过载-Overload'){
							return this.point.name+':'+(usedData-100)+'%'
						}else{
							return ''
						}
					},
					color: 'white',
					style: {
						color: 'black',
						fontSize: '13px',
						fontWeight: 'normal',
					},
					distance: -5
				}
			}]
		});
	}else{
		restData = 100 - usedData;
		$('#pieChartDiv').empty();
		$("#pieChartDiv").highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: '当前库存量（1000）使用情况-The Current Warehouse Usage(Max-Standard:1000)'
			},
			tooltip: {
				headerFormat: '{series.name}<br/>',
				pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						distance: -39,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
							fontSize: "13px",
							fontWeight: "normal"
						}
					}
				}
			},
			series: [{
				type: 'pie',
				name: '当前库存量-Current Usage',
				data: [
					{
						name: '未使用-Rest',
						y: restData,
						sliced: true,
						selected: true,
						color: '#50B432'
					},
					{
						name: '已使用-Used',
						y: usedData,
						color: 'orange'
					}
				]
			}]
		});
	}

	$("#barChartDiv").highcharts({
		chart: {
			type: 'bar'
		},
		title: {
			text: '2016年仓储入库出库情况-The Chart Of Wares Inbound and Outbound In ' + year
		},
		xAxis: {
			categories: ['十二月-Dec.', '十一月-Nov.', '十月-Oct.', '九月-Sept.', '八月-Aug.', '七月-July', '六月-June', '五月-May', '四月-Apr.', '三月-Mar', '二月-Feb.', '一月-Jan.'],
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: '包裹数量/包-The Number Of Wares/Packet',
				align: 'high'
			},
			labels: {
				overflow: 'justify'
			}
		},
		tooltip: {
			valueSuffix: ' 包(Packet)'
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -5,
			y: 30,
			floating: true,
			borderWidth: 1,
			backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			shadow: true
		},
		credits: {
			enabled: false
		},
		series: chartData2
	});
});