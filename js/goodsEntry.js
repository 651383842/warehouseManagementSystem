/**
 * Created by lixiwei on 2017/4/4.
 */
$(function () {
	var shelf = [];
	var shelfNum = 9;
	var customShelf = "";
	var customPosition = "";
	var autoShelf = "";
	var autoPosition = "";
	var method = "";
	var delIndex = "";
	var totalBoolean = false;

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
	$("#delAllGoodsDiv").dialog({
		autoOpen: false,
		width: 400,
		dialogClass: "no-close",
		buttons: [
			{
				text: "确定-Ok",
				click: function() {
					$(".goodsTr").remove();
					$("#totalTdInput").val(0);
					totalBoolean = false;
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
	$("#delGoodsDiv").dialog({
		autoOpen: false,
		width: 400,
		dialogClass: "no-close",
		buttons: [
			{
				text: "确定-Ok",
				click: function() {
					var total = 0;
					$("#detailsTable").find("tr").eq(delIndex).remove();
					$(".goodsTr").find("input").each(function(){
						total += parseInt($(this).val());
					});
					$("#totalTdInput").val(total);
					/*total -= parseInt($("#detailsTable").find("tr").eq(delIndex).find("input").val());
					$("#totalTdInput").val(total);
					$("#detailsTable").find("tr").eq(delIndex).remove();*/
					if($("#totalInput").val() != $("#totalTdInput").val()){
						$("#totalTdInput").css("color","red");
						totalBoolean = false;
					}else{
						$("#totalTdInput").css("color","black");
						totalBoolean = true;
					}
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

	$("#totalInput").on('input propertychange', function(){
		if($("#totalInput").val() != $("#totalTdInput").val()){
			$("#totalTdInput").css("color","red");
			totalBoolean = false;
		}else{
			$("#totalTdInput").css("color","black");
			totalBoolean = true;
		}
	});

	$("#addButton").click(function(){
		var no = 1 + Number($(".goodsTr").last().find("td").eq(0).text());
		var supplier = $("#supplierSelect").val();
		var style = $("#styleSelect").val();
		var color = $("#colorSelect").val();
		var size = $("#sizeSelect").val();
		var num = $("#numInput").val();
		var total = 0;
		if(num == 0 || isNaN(num)){
			$(".dialogP").css("display","none");
			$("#notNullP").css("display","block");
			$("#dialogDiv").dialog("open");
		}else {
			$("#totalTr").before("<tr class='goodsTr'><td>" + no + "</td><td>" + supplier + "</td><td>" + style + "</td><td>" + color + "</td><td>" + size + "</td><td><input class='tdInput' type='text' value='" + num + "' readonly></td><td><span class='delSpan'>删除delete</span></td></tr>");
			$(".goodsTr").find("input").each(function(){
				total += parseInt($(this).val());
			});
			$("#totalTdInput").val(total);
			if($("#totalInput").val() != $("#totalTdInput").val()){
				$("#totalTdInput").css("color","red");
				totalBoolean = false;
			}else{
				$("#totalTdInput").css("color","black");
				totalBoolean = true;
			}
		}
	});

	$("#delAllSpan").click(function() {
		$("#delAllGoodsDiv").dialog("open");
	});

	$("#detailsTable").on('click','.delSpan',function(){
		delIndex = $(this).parent().parent().index();
		$("#delGoodsDiv").dialog("open");
	});

	$("#saveButton").click(function () {
		if($("input[name='placedMethod']:radio").is(":checked") == ""){
			$(".dialogP").css("display","none");
			$("#warnP").css("display","block");
			$("#dialogDiv").dialog("open");
		}else if(totalBoolean == false) {
			$(".dialogP").css("display","none");
			$("#totalP").css("display","block");
			$("#dialogDiv").dialog("open");
		} else if($("#autoPlacedRadio").is(":checked")){
			if(autoShelf == "" || autoPosition == ""){
				$(".dialogP").css("display","none");
				$("#warnP").css("display","block");
				$("#dialogDiv").dialog("open");
			}else {
				$(".dialogP").css("display", "none");
				$("#confirmP").css("display", "block");
				$("#selectedShelfSpan").text(autoShelf);
				$("#positionSpan").text(autoPosition);
				$("#dialogDiv").dialog("open");
			}
		}else if($("#customPlacedRadio").is(":checked")){
			if(customShelf == "" || customPosition == ""){
				$(".dialogP").css("display","none");
				$("#warnP").css("display","block");
				$("#dialogDiv").dialog("open");
			}else {
				$(".dialogP").css("display", "none");
				$("#confirmP").css("display", "block");
				$("#selectedShelfSpan").text(customShelf);
				$("#positionSpan").text(customPosition);
				$("#dialogDiv").dialog("open");
			}
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
			customShelf = $("#shelfSelect-button").find(".ui-selectmenu-text").text();

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
					customPosition = $("#positionInput").val();
				}else{
					$("#positionInput").val(row + "" + clo);
					customPosition = $("#positionInput").val();
				}
			});
		}
	});

	$("#positionInput").on('input propertychange', function(){
		var value = $("#positionInput").val();
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
			customPosition = $("#positionInput").val();
		}
		if(value <= 100){
			$("#positionInput").css("border","thin solid red");
		}else{
			$("#positionInput").css("border","thin solid grey");
		}
	});

	$("input[name='placedMethod']:radio").click(function(){
		if($(this).is(":checked")) {
			$("#methodSpan").text($(this).attr("value"));
			method = $(this).attr("value");
			if(totalBoolean == false){
				$(".dialogP").css("display","none");
				$("#totalP").css("display","block");
				$("#dialogDiv").dialog("open");
			}
		}
	});

});