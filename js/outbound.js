/**
 * Created by jessicababy on 2017/4/9.
 */
$( "#menu" ).menu();

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
            text: "取消-Cancel",
            click: function() {
                $( this ).dialog( "close" );
            }
        }
    ]
});

$("#del1").click(function () {
    $("#dialog").dialog("open");
});
$("#checkAll").bind("click", function () {
    if($("#checkAll").is(":checked")) {
        $("[name = chkItem]:checkbox").prop("checked", true);
    }
    else{
        $("[name = chkItem]:checkbox").prop("checked", false)
    }
});
$("#checkAll2").bind("click", function () {
    if($("#checkAll2").is(":checked")) {
        $("[name = chkItem2]:checkbox").prop("checked", true);
    }
    else{
        $("[name = chkItem2]:checkbox").prop("checked", false)
    }
});

