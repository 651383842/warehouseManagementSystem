/**
 * Created by jessicababy on 2017/4/6.
 */
$(function(){
    var queryStyle = "inbound";
    $("#del1").click(function (){
    var $info= $("<div class='queryDiv'><input class='name' type='text' placeholder='包裹ID-Package'> " +
        "<select class='select1'>" +
        "<option selected = 'selected'>款式Style</option>" +
        "<option>1</option>" +
        "<option>2</option>" +
        "<option>3</option>" +
        "<option>4</option>" +
        "</select>" +
        "<select>" +
        "<option selected = 'selected'>颜色Color</option>" +
        "<option>1</option> " +
        "<option>2</option> " +
        "<option>3</option> " +
        "<option>4</option> " +
        "</select> " +
        "<select> " +
        "<option selected = 'selected'>尺码Size</option> " +
        "<option>1</option> " +
        "<option>2</option> " +
        "<option>3</option> " +
        "<option>4</option> " +
        "</select></div> ");
        $("#condition").find("form").find("div").last().after($info);
    });

    $( "#dialog" ).dialog({
        autoOpen: false,
        width: 400,
        buttons: [
            {
                text: "确定-Ok",
                click: function() {
                    location.href=("./autoDistribution.html");
                    $( this ).dialog( "close" );
                }
            },
            {
                text: "确定-Cancel",
                click: function() {
                    $( this ).dialog( "close" );
                }
            }
        ]
    });

    $("#del1").click(function () {
        $("#dialog").dialog("open");
    });

    $("#outboundCheckbox").click(function(){
        if($(this).is(":checked")){
            $("#query").click(function(){
                $("#timeTd").text("出库时间-OutboundTime");
            });
        }else{
            $("#query").click(function(){
                $("#timeTd").text("入库时间-InboundTime");
            });
        }
    });
});