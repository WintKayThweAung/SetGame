
$(document).ready(function(){

    var allgameTemplate=Handlebars.compile($("#allgameTemplate").html());    
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

});
var gameid;
$(function(){
    var allgameTemplate=Handlebars.compile($("#allgameTemplate").html());
    console.log("This is li click.");    
        $("#allgamelist").on("click","a[data-game]",function(){
            console.log("Please-----------");
            gameid=$(this).attr("id");
            console.log("GameId"+" "+gameid);
            $.get("api/card/"+ gameid).done(function(){
   
            });            
        });            
});
         

 