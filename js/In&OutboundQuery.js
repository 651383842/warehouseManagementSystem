/**
 * Created by lixiwei on 2017/4/9.
 */
$(function () {
	/*var thisURL = document.URL;
	var param =thisURL.split("?")[1];
	var packetID= param.split("=")[1];

	if(packetID){
		$("#idInput").val(packetID);
	}else{
		alert("null");
	}*/

	$("#datePicker").datepicker();

	$("#outboundCheckbox").click(function(){
		if($(this).is(":checked")){
			$("#datePicker").attr("placeholder","出库时间-OutboundTime");
			$("#query").click(function(){
				$("#timeTd").text("出库时间-OutboundTime");
			});
		}else{
			$("#datePicker").attr("placeholder","入库时间-InboundTime");
			$("#query").click(function(){
				$("#timeTd").text("入库时间-InboundTime");
			});
		}
	});

	$(".packetTr").click(function(){
		var packetId = $(this).find("td").eq(1).text();
		$("#tab").find(".wareTr").find("td").each(function(){
			if($(this).html() == packetId){
				$(this).parent().fadeToggle();
			}
		});
	});
});
