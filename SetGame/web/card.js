var source;
$(document).ready(function(){
    var cardTemplate=Handlebars.compile($("#cardTemplate").html());   
    var newcardTemplate=Handlebars.compile($("#newcardTemplate").html());
    
       $.getJSON("api/card/twelvecard")
               .done(function(result){
                //console.log(result);   
                //var result =JSON.stringify(result);      
               //console.log(result);
               //var json=JSON.parse(result);
               
                var count1=0;
                for(var a=0; a<result.cards.length; a++)
                {
                    
                   // var cardElement=cardTemplate({count:count1,position:result.cards[a].CardUrl});
                   // $("#img_col").append($(cardElement));                    
                    //console.log(cardElement);
                   // count1++;
                       
                    var cardElement=cardTemplate({position:result.cards[a].CardUrl});
                    $("#"+a).append($(cardElement));
                    
                      
                }
               }).fail(function (){
                   
                  console.log("Not found!"); 
               });   
   
});

$(function(){             
    var cardTemplate=Handlebars.compile($("#cardTemplate").html());   
    var newcardTemplate=Handlebars.compile($("#newcardTemplate").html());
    
    source=new EventSource("api/card/result");
    source.onmessage=function(event){
     //var chat=JSON.parse(event.data);   
     //console.log(chat);    
    console.log("Event : "+JSON.stringify(event.data));
    var temp=JSON.parse(event.data);
    var cards = temp.Cards;
   // console.log(cards);
  
    for (var i in cards) {
        JSON.stringify(cards[i]);
        //console.log(i + " = " + cards[i]["CardUrl"]);        
    if(i==0){    
         //var cardElement=cardTemplate({count:$("#card1").val(),position:cards[i]["CardUrl"]}); 
         
        //$('div').remove('#'+$("#card1").val());  
        //var temp='<div id='+$("#card1").val()+'>'+($(cardElement))+'</div>';
        
        var cardElement=newcardTemplate({newid:$("#card1").val(),newposition:cards[i]["CardUrl"]}); 
        $("#"+$("#card1").val()).replaceWith($(cardElement));
        
       // $("#img_col").append($(cardElement)); 
       // $("#img_col").append($("#"+$("#card1").val()).append($(cardElement))); 
        console.log("Replace Card1");
            }
    else if(i==1){                    
       // var cardElement=cardTemplate({count:$("#card2").val(),position:cards[i]["CardUrl"]});
      
        //$('div').remove('#'+$("#card2").val());
        //var temp='<div id='+$("#card2").val()+'>'+($(cardElement))+'</div>';
        //$("#img_col").append(temp);
         var cardElement=newcardTemplate({newid:$("#card2").val(),newposition:cards[i]["CardUrl"]});
          $("#"+$("#card2").val()).replaceWith($(cardElement));
          
       // $('div'+"#"+$("#card2").val()).append($(cardElement)); 
       //$("#img_col").append($("#"+$("#card2").val()).append($(cardElement))); 
        console.log("Replace Card2");
                }
    else if (i==2){                    
        // var cardElement=cardTemplate({count:$("#card3").val(),position:cards[i]["CardUrl"]});
          //$('div').remove('#'+$("#card3").val());
         // var temp='<div id='+$("#card3").val()+'>'+($(cardElement))+'</div>';
          //$("#img_col").append(temp);
          var cardElement=newcardTemplate({newid:$("#card3").val(),newposition:cards[i]["CardUrl"]});
           $("#"+$("#card3").val()).replaceWith($(cardElement));
       
        //$("#img_col").append($(cardElement)); 
       // $('div'+"#"+$("#card3").val()).append($(cardElement)); 
      // $("#img_col").append($("#"+$("#card3").val()).append($(cardElement))); 
        console.log("Replace Card3");
                }
    else if(i==3){
        //console.log($("#card3").val());
        var cardElement=cardTemplate({count:$("#card4").val(),position:cards[i]["CardUrl"]});
        $("#correct_img").append($(cardElement)); 
        console.log("Show correct card1");        
                }
    else if(i==4){     
         var cardElement=cardTemplate({count:$("#card5").val(),position:cards[i]["CardUrl"]});
         $("#correct_img").append($(cardElement)); 
         console.log("Show correct card2");        
                 }
    else{        
        var cardElement=cardTemplate({count:$("#card6").val(),position:cards[i]["CardUrl"]});
        $("#correct_img").append($(cardElement)); 
        console.log("Show correct card3");        
        }   
                
}
   
   // $("#right_col").append("<img src=libs/images/"+chat.CardUrl+">");
    /*for(var a=0; a<result.cards.length; a++)
    {
        $result.append("<img src=libs/images/"+result.cards[a].CardUrl+">");
    }*/
    }
});
               
$(function(){
     $("#Btnsubmit").on("click",function(){
        console.log("From JS");
        $.get("validateCard",{
            card1:$("#card1").val(),
            card2:$("#card2").val(),
            card3:$("#card3").val(),
            //console.log($("#card1").val())
                    }).done(function(){
                          $("#card1").val("");
                          $("#card2").val("");
                          $("#card3").val("");
                    });
    });
});


