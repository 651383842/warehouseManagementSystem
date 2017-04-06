/**
 * Created by lixiwei on 2017/4/5.
 */
$(function () {
	$( "#menu" ).menu();

	$(".li").eq(0).click(function(){
		location.href="./index.html";
	});

	$(".li").eq(2).click(function(){
		location.href="./goodsEntry.html";
	});

	$(".li").eq(5).parent().find("li").eq(6).click(function(){
		location.href="../shelfCapacity.html";
	});
});