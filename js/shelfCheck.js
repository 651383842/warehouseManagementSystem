/**
 * Created by lixiwei on 2017/4/5.
 */
/**
 * Created by lixiwei on 2017/4/2.
 */
$(function () {
	var shelf = [];
	var shelfNum = 9;

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

});
