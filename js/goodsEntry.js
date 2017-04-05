/**
 * Created by lixiwei on 2017/4/4.
 */
$(function () {
	var shelf = [];
	var shelfNum = 9;
	var placeShelf = "";
	var placePosition = "";
	var method = "";

	$("select").selectmenu();
	$("#addButton").button();
	$("#startAutoButton").button();
	$("#saveButton").button();
	$("#printButton").button();
	$("#autoPlacedRadio").checkboxradio();
	$("#customPlacedRadio").checkboxradio();
	$("#totalTd").tooltip();

	//alert($("#positionInput").val());

	for(var i = 1;i <= shelfNum;i++){
		$("#shelfSelect").append($("<option id='shelfOption"+i+"'></option>").text("货架"+i));
		$("#shelfOption"+i).attr("value",i);
	}

	$("#dialogDiv").dialog({
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

	$("#saveButton").click(function () {
		if($("input[name='placedMethod']:radio").is(":checked") == ""){
			$(".dialogP").css("display","none");
			$("#warnP").css("display","block");
			$("#dialogDiv").dialog("open");
		}else if($("#autoPlacedRadio").is(":checked")){
			$(".dialogP").css("display","none");
			$("#confirmP").css("display","block");
			$("#selectedShelfSpan").text(placeShelf);
			$("#positionSpan").text(placePosition);
			$("#dialogDiv").dialog("open");
		}
	});

	$("#startAutoButton").click(function(){
		$(this).text("重新推荐-recommend again");
		var trLength = 3;
		var tdLength = 36;

		$("#autoShelfDiv").css("height","20rem");
		$("#autoPlacedTable").empty();

		for(var i = 0;i < trLength;i++){
			$("#autoPlacedTable").append($("<tr></tr>").html(function(){
				for(var n = 0;n < tdLength;n++){
					var rand = parseInt(Math.random() * (0 - 100 + 1) + 100);
					var num = Math.round(rand/100*35);
					$(this).append("<td> <div class='useDiv'><span class='fractionSpan'>"+num+"<br>|<br>"+(35-num)+"</span><span class='restSpan'style='height: "+rand+"%'></span> <span class='usedSpan'style='height: "+(100-rand)+"%'></span> </div> </td>");
				}
			}));
		}

		$("#autoPlacedTable").find("tr").eq(parseInt(Math.random() * trLength)).find("td").eq(parseInt(Math.random() * tdLength)).css({"border":"solid red","box-shadow": "0 0 0.5rem 0 red inset"});
	});

	$("#shelfSelect").selectmenu({
		change:function(){
			//	选择货架后，向后端提交货架号，获取货架详细信息。
			//	alert($(this).children('option:selected').val());
			var trLength = 3;
			var tdLength = 36;
			//$("#shelfSelect-button").find(".ui-selectmenu-text").text();

			$("#customShelfDiv").css("height","20rem");
			$("#customPlacedTable").empty();
			$("#positionInput").val("");

			for(var i = 0;i < trLength;i++){
				$("#customPlacedTable").append($("<tr></tr>").html(function(){
					for(var n = 0;n < tdLength;n++){
						var rand = parseInt(Math.random() * (0 - 100 + 1) + 100);
						var num = Math.round(rand/100*35);
						$(this).append("<td> <div class='useDiv'><span class='fractionSpan'>"+num+"<br>|<br>"+(35-num)+"</span><span class='restSpan'style='height: "+rand+"%'></span> <span class='usedSpan'style='height: "+(100-rand)+"%'></span> </div> </td>");
					}
				}));
			}

			$("#customPlacedTable").find("td").click(function(){
				$("#customPlacedTable").find("td").css({"border":"thin solid cornflowerblue","box-shadow": "0 0 0.2rem 0 cornflowerblue inset"});
				$(this).css({"border":"solid red","box-shadow": "0 0 0.5rem 0 red inset"});
				var row = 0;
				var clo = $(this).index() + 1;
				if($(this).parent().index() == 0){
					row =  3;
				}
				if($(this).parent().index() == 1){
					row =  2;
				}
				if($(this).parent().index() == 2){
					row =  1;
				}
				$("#positionInput").val("");
				if(clo < 10) {
					$("#positionInput").val(row + "0" + clo);
				}else{
					$("#positionInput").val(row + "" + clo);
				}
			});
		}
	});

	$("#positionInput").on('input propertychange', function(){
		var value = $("#positionInput").val();
		placePosition = $("#positionInput").val();
		var row = parseInt(value/100);
		var clo = value%100 - 1;
		$("#customPlacedTable").find("td").css({"border":"thin solid cornflowerblue","box-shadow": "0 0 0.2rem 0 cornflowerblue inset"});
		if($("#shelfSelect-button").find(".ui-selectmenu-text").text() != "请选择货架-please select shelf" && value > 100){
			if(parseInt(value/100) == 1){
				row =  2;
			}
			if(parseInt(value/100) == 2){
				row =  1;
			}
			if(parseInt(value/100) == 3){
				row =  0;
			}
			$("#customPlacedTable").find("tr").eq(row).find("td").eq(clo).css({"border":"solid red","box-shadow": "0 0 0.5rem 0 red inset"});
		}
	});

	$("input[name='placedMethod']:radio").click(function(){
		if($(this).is(":checked")) {
			$("#methodSpan").text($(this).attr("value"));
			method = $(this).attr("value");
		}
	});

});