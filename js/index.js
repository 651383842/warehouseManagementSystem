/**
 * Created by lixiwei on 2017/4/2.
 */

$(function () {
	$("#datePicker1").datepicker();
	$("#datePicker2").datepicker();
	$("#areaSplineDiv").highcharts({
		chart: {
			type: 'areaspline'
		},
		title: {
			text: '入库出库统计图'
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
			categories: [
				'2017.3.1',
				'2017.3.2',
				'2017.3.3',
				'2017.3.4',
				'2017.3.5',
				'2017.3.6',
				'2017.3.7',
				'2017.3.8',
				'2017.3.9',
				'2017.3.10',
				'2017.3.11',
				'2017.3.12'
			]
		},
		yAxis: {
			title: {
				text: '包裹数量/包'
			}
		},
		tooltip: {
			shared: true,
			valueSuffix: ' 包'
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
			}
		},
		series: [{
			name: '出库',
			data: [30, 40, 30, 50, 40, 100, 120, 50, 60, 80, 90, 200]
		}, {
			name: '入库',
			data: [10, 30, 40, 30, 30, 50, 40, 60, 100, 120, 50, 10]
		}]
	});
	$("#pieChartDiv").highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: '当前库存量（1000）使用情况'
		},
		tooltip: {
			headerFormat: '{series.name}<br>',
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
			name: '当前库存量',
			data: [
				{
					name: '未使用',
					y: 20.0,
					sliced: true,
					selected: true,
					color: '#50B432'
				},
				{
					name: '已使用',
					y: 80.0,
					color: 'orange'
				}
			]
		}]
	});
	$("#barChartDiv").highcharts({
		chart: {
			type: 'bar'
		},
		title: {
			text: '2016年仓储出入库情况'
		},
		xAxis: {
			categories: ['十二月', '十一月', '十月', '九月', '八月', '七月', '六月', '五月', '四月', '三月', '二月', '一月'],
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: '包裹数量/包',
				align: 'high'
			},
			labels: {
				overflow: 'justify'
			}
		},
		tooltip: {
			valueSuffix: ' 包'
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
			x: -35,
			y: 10,
			floating: true,
			borderWidth: 1,
			backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			shadow: true
		},
		credits: {
			enabled: false
		},
		series: [{
			name: '出库',
			data: [1230, 4321, 2512, 6670, 1320, 4322, 2513, 1324, 4325, 2516, 6671, 1322],
		}, {
			name: '入库',
			data: [1333, 1562, 6471, 4082, 1063, 1336, 1568, 6476, 4080, 1062, 1335, 1568],
			color: "grey",
		},
		]
	});
});