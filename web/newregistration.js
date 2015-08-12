

$(function(){
    source=new EventSource("api/chatroom"+$("#roomId").val());
    source.onmessage=function(event){
        console.log("got message");
        var chat=JSON.parse(event.data);
        var $messages=$("#messages");
        console.log(">>>>>>>msg"+JSON.stringify(chat));
        $messages.text(chat.name+" : "+ chat.message+"\n"+$messages.text());
        
    }
   
    $("#sendBtn").on("click",function(){
        $.get("newgame",{
            description:$("#description").val()
            
        }).done(function(){
            $("#description").val("");
            
        });
    });
   /* var allgameTemplate=Handlebars.compile($("#allgameTemplate").html());
    $("#retrieve").on("click",function(){
        console.log("This is entry point.");
        $.get("api/card/all").done(function(result){
            console.log(JSON.stringify(result));
            var allgame=result.Game;
            console.log(JSON.stringify(allgame));
          for(var i in allgame){
              $("#allgamelist").append(allgameTemplate({
                  gameid:allgame[i].GameId,
                  description:allgame[i].Description
                  
              }
                      ));
          }
           
          
        }).fail(function(){
            console.log("No data");
        });
    });*/
$("#push").on("click",function(){
    var status = $(this).attr('gameid');
    console.log(status);
})
});
    
   
    
