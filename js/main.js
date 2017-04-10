/**
 * Created by jessicababy on 2017/4/6.
 */
$(function () {
    $( "#menu" ).menu();

    $(".li").eq(0).click(function(){
        location.href="./home.html";
    });

    $(".li").eq(2).click(function(){
        location.href="./inbound.html";
    });

    $(".li").eq(5).parent().find("li").eq(6).click(function(){
        location.href="./shelfCapacity.html";
    });

    $(".li").eq(1).parent().find("li").eq(0).click(function(){
        location.href="./query.html";
    });
	
	$(".li").eq(1).parent().find("li").eq(1).click(function(){
        location.href="./in&OutboundQuery.html";
    });
	
    $(".li").eq(3).click(function(){
        location.href="./outbound.html";
    });
    $(".li").eq(4).parent().find("li").eq(0).click(function(){
        location.href="./checkShelf.html";
    });

    $(".li").eq(4).parent().find("li").eq(1).click(function(){
        location.href="./checkSpace.html";
    });

    $(".li").eq(5).parent().find("li").eq(1).click(function(){
        location.href="./styleManege.html";
    });

    $(".li").eq(5).parent().find("li").eq(2).click(function(){
        location.href="./colorManege.html";
    });

    $(".li").eq(5).parent().find("li").eq(3).click(function(){
        location.href="./sizeManege.html";
    });

    $(".li").eq(5).parent().find("li").eq(5).click(function(){
        location.href="./shelfManege.html";
    });

    $(".li").eq(5).parent().find("li").eq(8).click(function(){
        location.href="./keeper.html";
    });

    $(".li").eq(5).parent().find("li").eq(9).click(function(){
        location.href="./normal.html";
    });

    $("#user").click(function(){
        location.href="./personalInfo.html";
    })
});
