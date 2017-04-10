/**
 * Created by lixiwei on 2017/4/2.
 */
$(function () {
	var shelf = [];
	var shelfNum = 9;

	$("#dialogDiv").dialog({
		autoOpen: false,
		width: 400,
		dialogClass: "no-close",
		buttons: [
			{
				text: "确定-Ok",
				click: function() {
					var exTdLength = $("#cloInput").val();
					var exSpaceCapacity = $("#spaceInput").val();
					if(exTdLength != 0 && exSpaceCapacity != 0){
						for(var i = 0;i < exTdLength;i++){
							$(".shelfTable tr").append("<td> <div class='useDiv'><span class='fractionSpan'>"+exSpaceCapacity+"<br/>|<br/>0</span><span class='restSpan'style='height: 100%'></span> <span class='usedSpan'style='height: 0'></span> </div> </td>");
							$(".shelfTable tr").find("td").each(function(){
								var row = 0;
								var clo = $(this).index() + 1;
								var position = 0;
								alert($(this).parent().index());
								if($(this).parent().index() == 0){
									row =  3;
								}
								if($(this).parent().index() == 1){
									row =  2;
								}
								if($(this).parent().index() == 2){
									row =  1;
								}
								if(clo < 10) {
									position = row + "0" + clo;
								}else{
									position = row + "" + clo;
								}
								$(this).find(".usedSpan").text(position);
								$(this).find(".usedSpan").css({"display":"flex","align-items":"flex-end","color":"blue"});
							});
						}
						$(this).find("input").val("");
						$(this).dialog( "close" );
					}else{
						if(!($(this).find("p").length > 0)){
							$(this).append("<p class='inputSpan' style='color: red'>输入不能为空！<br/>Input cannot be null!<p>")
						}
					}
				}
			},
			{
				text: "取消-Cancel",
				click: function() {
					$(this).find("input").val("");
					$(this).find("p").remove();
					$(this).dialog( "close" );
				}
			}
		]
	});

	$("#packetDiv").dialog({
		autoOpen: false,
		width: 400,
		dialogClass: "no-close",
		buttons: [
			{
				text: "确定-Ok",
				click: function() {
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

	$("#ex-shelfButton").click(function () {
		$("#dialogDiv").dialog("open");
	});

	for(var i = 1;i <= shelfNum;i++){
		$("#shelfSelect").append($("<option id='shelfOption"+i+"'></option>").text("货架"+i));
		$("#shelfOption"+i).attr("value",i);
	}

	$("#shelfSelect").change(function(){
			//	选择货架后，向后端提交货架号，获取货架详细信息。
			//	alert($(this).children('option:selected').val());
			var trLength = 3;
			var tdLength = 36;

			$(".shelfTable").empty();

			for(var i = 0;i < trLength;i++){
				$(".shelfTable").append($("<tr></tr>").html(function(){
					for(var n = 0;n < tdLength;n++){
						var rand = parseInt(Math.random() * (0 - 100 + 1) + 100);
						var num = Math.round(rand/100*35);
						$(this).append("<td> <div class='useDiv'><span class='fractionSpan'>"+num+"<br/>|<br/>"+(35-num)+"</span><span class='restSpan'style='height: "+rand+"%'></span> <span class='usedSpan'style='height: "+(100-rand)+"%'></span> </div> </td>");
						$(this).find("td").each(function(){
							var row = 0;
							var clo = $(this).index() + 1;
							var position = 0;
							if(i == 0){
								row =  3;
							}
							if(i == 1){
								row =  2;
							}
							if(i == 2){
								row =  1;
							}
							if(clo < 10) {
								position = row + "0" + clo;
							}else{
								position = row + "" + clo;
							}
							$(this).find(".usedSpan").text(position);
							$(this).find(".usedSpan").css({"display":"flex","align-items":"flex-end","color":"blue"});
							if($(this).find(".fractionSpan").html() == num+"<br/>|<br/>"+(35-num)){
								console.log($(this).find(".fractionSpan").html());
								if(num > 12) {
									$(this).find(".usedSpan").css("background-color","#3dbd7d");
								}else if(num > 0){
									$(this).find(".usedSpan").css("background-color","#ffce3d");
								}else if(num < 1 ){
									$(this).find(".usedSpan").css("background-color","#f46e65");
								}
							}
						});
					}
				}));
			}

			$(".shelfTable").find("td").click(function () {
				var trLength = 5;
				var tdLength = 7;

				$(".packetTable").empty();

				for(var i = 0;i < trLength;i++){
					$(".packetTable").append($("<tr></tr>").html(function(){
						for(var n = 0;n < tdLength;n++){
							var id = parseInt(Math.random() * (0 - 1000 + 1) + 1000);
							$(this).append("<td>包裹ID<br/><span style='color: blue'>" +id+"</span></td>");
						}
					}));
				}
				$("#packetDiv").dialog("open");
			});
	});

});
