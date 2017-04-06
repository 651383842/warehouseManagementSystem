/**
 * Created by lixiwei on 2017/4/2.
 */
$(function () {
	var shelf = [];
	var shelfNum = 9;

	$(".button").button();

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
							$(".shelfTable tr").append("<td> <div class='useDiv'><span class='fractionSpan'>"+exSpaceCapacity+"<br>|<br>0</span><span class='restSpan'style='height: 100%'></span> <span class='usedSpan'style='height: 0'></span> </div> </td>");
						}
						$(this).find("input").val("");
						$(this).dialog( "close" );
					}else{
						if(!($(this).find("p").length > 0)){
							$(this).append("<p class='inputSpan' style='color: red'>输入不能为空！<br>Input cannot be null!<p>")
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

	$("#shelfSelect").selectmenu({
		change:function(){
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
						$(this).append("<td> <div class='useDiv'><span class='fractionSpan'>"+num+"<br>|<br>"+(35-num)+"</span><span class='restSpan'style='height: "+rand+"%'></span> <span class='usedSpan'style='height: "+(100-rand)+"%'></span> </div> </td>");
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
							$(this).append("<td>包裹ID<br><span style='color: blue'>" +id+"</span></td>");
						}
					}));
				}
				$("#packetDiv").dialog("open");
			});

		}
	});

});
