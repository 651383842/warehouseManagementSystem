/**
 * Created by jessicababy on 2017/5/22.
 */
var click=null;
var num=null;
var total=0;
//打开页面展示信息
$.ajax({
    type: "POST",
    url: "/check/backProPac",
    dataType: "json",
    data: {
    },
    success: function (res) {
        for(var i = 0;i < res.backInfo.length;i++){
            var n = i+1;
            var x=res.backInfo[i].length-1;
            $("#tab").append("<tr class='t2'>" +
                "<td>"+n+"</td>" +
                "<td>"+res.backInfo[i][0]+"</td>" +
                "<td>"+res.backInfo[i][1]+"</td>" +
                "<td>"+res.backInfo[i][x]+"</td>" +
                "<td class='delBtn' type='button'><img class='delete' src='./img/check.png' alt='编辑-Edit'></td>" +"</tr>");
        }
        $(".delBtn").on("click",function(){
            click = $(this);
            num = click.parent().find("td").eq(0).html();
            num=num-1;
            var xx=res.backInfo[num].length-1;
            for(var i=2;i<xx;i++){
                if(res.backInfo[num][i][3]=='0'){
                    res.backInfo[num][i][3]=res.backInfo[num][i][2];
                }
            }
            for(var i = 2;i < xx;i++){
                $("#tab2").append("<tr class='t3'>" +
                    "<td style='display: none'>"+res.backInfo[num][i][0]+"</td>" +
                    "<td>"+res.backInfo[num][i][1]+"</td>" +
                    "<td>"+res.backInfo[num][i][2]+"</td>" +
                    "<td>"+res.backInfo[num][i][3]+"</td>" +
                    "<td>"+"<input type='number' value='"+res.backInfo[num][i][2]+"'>"+"</td>" +"</tr>");
            }
            $("#delDialog").dialog( "open" );
        });
        $("#tab2").find("tr").each(function(){ $(this).find("td").eq(0).css("display","none")});
        $("#tab tr:odd").css("background-color", "white");
        $("#tab tr:even").css("background-color", "#f3f3f3");
        $("#t1").css("background-color","#ecf6fd");
        console.log(res);
    },
    error: function(e) {
        console.log("supplierError:"+e);
    }
});
//点击编辑
$("#delDialog").dialog({
    autoOpen: false,
    width: 400,
    modal:true,
    closeOnEscape: false,
    dialogClass: "no-close",
    buttons: [
        {
            text: "保存-Save",
            click: function() {
                for(var n=1;n<$("#tab2").find("tr").length;n++){
                    if($("#tab2").find("tr").eq(n).find("td").eq(4).find("input").val() == ""){
                        $("#checkDialog").dialog( "open" );
                        return;
                    }else {
                        total = total + parseInt($("#tab2").find("tr").eq(n).find("td").eq(4).find("input").val());
                    }
                }
                console.log(total);
                $("#sureDialog").dialog( "open" );
            }
        },
        {
            text: "取消-Cancel",
            click: function() {
                $(".t3").remove();
                $(this).dialog( "close" );
            }
        }
    ]
});
//确认
$("#sureDialog").dialog({
    autoOpen: false,
    width: 600,
    modal:true,
    closeOnEscape: false,
    dialogClass: "no-close",
    buttons: [
        {
            text: "确定-Ok",
            click: function() {
                    var pacID= [0,1];
                    pacID[0]=$("#tab").find("tr").eq(num+1).find("td").eq(1).html();
                    pacID[1]=total;
                    for(var n=1;n<$("#tab2").find("tr").length;n++){
                        var pac = [0,1];
                        pac[0]=$("#tab2").find("tr").eq(n).find("td").eq(0).html();
                        pac[1]=$("#tab2").find("tr").eq(n).find("td").eq(2).html();
                        pac[2]=$("#tab2").find("tr").eq(n).find("td").eq(4).find("input").val();

                        //pac[1]=$("#tab2").find("tr").eq(n).find("td").eq(3).find("input").val().replace(/\D/g,'');
                        pacID.push(pac);
                    }
                var JSONpacId = JSON.stringify(pacID);
                $.ajax({type:"POST",
                    url: "/check/updateProPac",
                    dataType: "json",
                    data:{ "pacID":JSONpacId},
                    success:function(res){
                        if(res.backInfo=="success")
                            location.href=location.href;
                    },
                    error: function(e) {
                        console.log("styleError:"+e);
                    }
                })
            }
        },
        {
            text: "取消-Cancel",
            click: function() {
                total=0;
                $(this).dialog( "close" );
            }
        }
    ]
});
$("#checkDialog").dialog({
   autoOpen: false,
   width: 400,
   modal: true,
   buttons: [
       {
           text: "确定-Ok",
           click: function () {
               total=0;
               $(this).dialog( "close" );
           }
       }
   ]
});

