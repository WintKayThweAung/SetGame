
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.setgame.rest;

import com.setgame.business.CardBean;
import com.setgame.model.Card;
import com.setgame.model.Game;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.faces.bean.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.sse.EventOutput;
import org.glassfish.jersey.media.sse.SseFeature;

/**
 * 
 *
 * @author Nu Nu
 */
//@RequestScoped
@ApplicationScoped
@Path("/card")

public class CardResource {
    
    @Inject private CardResult cardresult;
    @EJB private CardBean cardbean; 
    Card[] result;
    Map<Integer,Card[]> gamemap=new HashMap<>();
    @GET   
    @Path("/twelvecard")
    @Produces(MediaType.APPLICATION_JSON)
     public Response get(){
        
        JsonArrayBuilder builder=Json.createArrayBuilder();
        //List<Card> result=cardbean.getTwelveCards();
        //System.out.println(result);
         result=cardbean.getTwelveCards();
        
        for(Card c:result)
        {
            //System.out.println("Looping Card resource");
            builder.add(c.toJson());                  
        }
        JsonObject jo = Json.createObjectBuilder().add("cards",builder).build();
            
        return (Response.ok(jo).build());
        
    }
     
     @GET
     @Path("/result")
     @Produces(SseFeature.SERVER_SENT_EVENTS)    
     
     //public Response connect(@PathParam("GameId") Integer gameid){
     //this is eventoutput part.
      public Response connect(){
        
        System.out.println("New Connection");
        EventOutput eo=new EventOutput();      
        cardresult.add(eo);
        return (Response.ok(eo).build());
    }
      @GET
     @Path("/all")
     public Response getAll(){
         JsonArrayBuilder builder=Json.createArrayBuilder();
         List<Game> result=cardbean.getall();
         result.stream().forEach((g) -> {
             builder.add(g.toJson());
        });
        JsonObject jo = Json.createObjectBuilder().add("Game",builder).build();
            
        return (Response.ok(jo).build());
         
     }
     @GET
     @Path("{GameId}")
     public void storeGameId(@PathParam("GameId") Integer gameid){
         System.out.println("This is gameid;"+gameid);
        result=cardbean.getTwelveCards();
        System.out.println("Hello this is Game Map");
        gamemap.put(gameid, result);
        System.out.println("This is a Map value:"+gamemap.get(gameid));
     }
     
}
