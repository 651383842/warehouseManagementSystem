/**
 * Created by lixiwei on 2017/4/5.
 */
/**
 * Created by lixiwei on 2017/4/2.
 */
$(function () {
	var shelf = [];
	var shelfNum = 9;

	$("#backButton").click(function(){
		location.href = "./checkShelf.html";
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
					if($(this).find(".fractionSpan").html() == num+"<br>|<br>"+(35-num)){
						if(num > 27) {
							$(this).find(".usedSpan").css("background-color","#3dbd7d");
						}else if(num > 7){
							$(this).find(".usedSpan").css("background-color","#ffbf00");
						}else{
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
