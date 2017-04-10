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
	var finalShelf = "";
	var finalPosition = "";
	var finalPacketID = "6666";
	var wareJson = "";
	var total = 0;
	var selectList = 0;
	var suppliers = [];

	$("#autoPlacedRadio").checkboxradio();
	$("#customPlacedRadio").checkboxradio();
	$("#totalTd").tooltip();
	$("#printQueryButton").click(function(){
		location.href="./in&OutboundQuery.html";
	});

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
					if ($(this).find("#confirmP").css("display") == "block") {
						//$.ajax({
						//	type: "POST",
						//	url: "",
						//	dataType: "json",
						//	data: {},
						//	success: function (data) {
								if(method == "智能推荐Automatic Recommend"){
									finalShelf = autoShelf;
									finalPosition = autoPosition;
								}else if(method == "自定义存放Custom Placed"){
									finalShelf = customShelf;
									finalPosition = customPosition;
								}
								$("#resultDialog").find("span").html("success");
								$("#resultDialog").find("p").html("入库成功！该包裹ID为"+ finalPacketID + "，存放于货架" + finalShelf + " 的位置" + finalPosition + " !<br/>" +
										"Inbound Success! The packetID is "+ finalPacketID + ", and it's placed to shelf " + finalShelf + ",position " + finalPosition + " !");
								$("#resultDialog").dialog( "open" );
							//},
							//error: function(e) {
							//	$("#resultDialog").find("span").html("error");
							//	$("#resultDialog").find("p").html("入库失败！error：" + e);
							//}
					//});
						$(this).dialog("close");
					}
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
					total = 0;
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
			$("#totalTdInput").css("color","#f04134");
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
		total = 0;
		if(num == 0 || isNaN(num)){
			$(".dialogP").css("display","none");
			$("#notNullP").css("display","block");
			$("#dialogDiv").dialog("open");
		}else {
			$("#totalTr").before("<tr class='goodsTr'><td>" + no + "</td><td>" + supplier + "</td><td>" + style + "</td><td>" + color + "</td><td>" + size + "</td><td><input class='tdInput' type='text' value='" + num + "' readonly></td><td><span class='delSpan'><img src='./img/delete.png'></span></td></tr>");
			$(".goodsTr").find("input").each(function(){
				total += parseInt($(this).val());
			});
			$("#totalTdInput").val(total);
			if($("#totalInput").val() != $("#totalTdInput").val()){
				$("#totalTdInput").css("color","#f04134");
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
		if(totalBoolean == false || $("#totalInput").val() == 0) {
			$(".dialogP").css("display","none");
			$("#totalP").css("display","block");
			$("#dialogDiv").dialog("open");
		}else if($("input[name='placedMethod']:radio").is(":checked") == ""){
			$(".dialogP").css("display","none");
			$("#warnP").css("display","block");
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
		$(this).text("重新推荐restart");
		var trLength = 3;
		var tdLength = 36;

		$("#autoShelfDiv").css("height","20rem");
		$("#autoPlacedTable").empty();

		for(var i = 0;i < trLength;i++){
			$("#autoPlacedTable").append($("<tr></tr>").html(function(){
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

		$("#autoPlacedTable").find("tr").eq(parseInt(Math.random() * trLength)).find("td").eq(parseInt(Math.random() * tdLength)).css({"border":"solid red","box-shadow": "0 0 0.5rem 0 red inset"});
	});

	$("#shelfSelect").change(function(){
			//	选择货架后，向后端提交货架号，获取货架详细信息。
			//	alert($(this).children('option:selected').val());
			var trLength = 3;
			var tdLength = 36;
			customShelf = $("#shelfSelect").val();

			$("#customShelfDiv").css("height","20rem");
			$("#customPlacedTable").empty();
			$("#positionInput").val("");

			for(var i = 0;i < trLength;i++){
				$("#customPlacedTable").append($("<tr></tr>").html(function(){
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

			$("#customPlacedTable").find("td").click(function(){
				$("#customPlacedTable").find("td").css({"border":"thin solid #49a9ee","box-shadow": "0 0 0.2rem 0 #49a9ee inset"});
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
	});

	$("#positionInput").on('input propertychange', function(){
		var value = $("#positionInput").val();
		var row = parseInt(value/100);
		var clo = value%100 - 1;
		$("#customPlacedTable").find("td").css({"border":"thin solid #49a9ee","box-shadow": "0 0 0.2rem 0 #49a9ee inset"});
		if($("#shelfSelect").val() != "" && value > 100){
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
		}else{
			customPosition = 0;
		}
		if(value <= 100){
			$("#positionInput").css("border","thin solid red");
			customPosition = 0;
		}else{
			$("#positionInput").css("border","thin solid grey");
		}
	});

	$("input[name='placedMethod']:radio").click(function(){
		if($(this).is(":checked")) {
			$("#methodSpan").text($(this).attr("value"));
			method = $(this).attr("value");
			if($("#totalInput").val() == 0){
				$(".dialogP").css("display","none");
				$("#notNullP").css("display","block");
				$("#dialogDiv").dialog("open");
				$("input[name='placedMethod']:radio").attr("checked",false);
			}else if(totalBoolean == false){
				$(".dialogP").css("display","none");
				$("#totalP").css("display","block");
				$("#dialogDiv").dialog("open");
				$("input[name='placedMethod']:radio").attr("checked",false);
			}
		}
	});

	$("#resultDialog").dialog({
		autoOpen: false,
		width: 400,
		dialogClass: "no-close",
		buttons: [
			{
				text: "打印-Print",
				click: function() {
					$("#printDialog").find("p").html("该包裹ID为"+ finalPacketID + "，存放于货架" + finalShelf + " 的位置" + finalPosition + " !<br/>" +
							"The packetID is "+ finalPacketID + ", and it's placed to shelf " + finalShelf + ",position " + finalPosition + " !");
					//另开打印窗口
					localStorage.setItem("packetID",finalPacketID);
					localStorage.setItem("packetTable",$("#detailsTable").html());
					localStorage.setItem("shelf",finalShelf);
					localStorage.setItem("position",finalPosition);
					localStorage.setItem("operationTime",finalPosition);
					window.open("./in&outPrint.html?direction=in");
					$("#printDialog").dialog("open");
					$(this).dialog("close");
				}
			}
		]
	});

	$("#printDialog").dialog({
		autoOpen: false,
		width: 400,
		dialogClass: "no-close",
		buttons: [
			{
				text: "成功-Success!",
				click: function() {
					$(this).dialog("close");
					window.location.reload();
				}
			},
			{
				text: "失败！重新打印-Failure！Query and reprint",
				click: function() {
					//跳转查询
					location.href="./in&OutboundQuery.html?packetID="+finalPacketID;
					$(this).dialog( "close" );
				}
			}
		]
	});

	/*$.ajax({
		type: "POST",
		url: "./testPhp/readjson.php",
		dataType: "json",
		data: {
		},
		success: function (res) {
			var n = 0;
			selectList = res;
			/!*for(var key in selectList.inboundSelect.supplier){
				suppliers[n] = key;
				n++;
			}
			for(var i = 0;i < suppliers.length;i++) {
				$("#supplierSelect").append("<option>"+suppliers[i]+"</option>")
			}
			for(var i = 0;i < selectList.inboundSelect.color.length;i++) {
				$("#colorSelect").append("<option>"+selectList.inboundSelect.color[i]+"</option>")
			}
			for(var i = 0;i < selectList.inboundSelect.size.length;i++) {
				$("#sizeSelect").append("<option>"+selectList.inboundSelect.size[i]+"</option>")
			}*!/
			for(var i = 0;i < selectList.length;i++) {
				$("#supplierSelect").append("<option>"+suppliers[i]+"</option>");
			}

		},
		error: function(e) {
			alert(e);
		}
	});

	$("#supplierSelect").change(function(){
		var n = 0;
		$("#styleSelect").html("<option disabled selected></option>");
		for(var key in selectList.inboundSelect.supplier){
			if($("#styleSelect").val() == key){
				var style = selectList.inboundSelect.supplier[n];
				console.log(style);
				for(var i = 0;i < style.length;i++) {
					$("#styleSelect").append("<option>" + style[i] + "</option>");
				}
			}
			n++;
		}
	});*/

});