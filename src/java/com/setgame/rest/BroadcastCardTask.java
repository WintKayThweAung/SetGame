/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.setgame.rest;

import com.setgame.business.CardBean;
import com.setgame.model.Card;
import java.util.ArrayList;
import javax.ejb.EJB;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.transaction.UserTransaction;
import javax.ws.rs.core.MediaType;
import org.glassfish.jersey.media.sse.OutboundEvent;

/**
 *
 * @author Nu Nu
 */
public class BroadcastCardTask implements Runnable{
    private int Card1;
    private int Card2;
    private int Card3;
    private CardResult cardresult;
    private ArrayList<Card> threecard;
    
    @EJB private CardBean cardBean; 
    

    public BroadcastCardTask(int c1,int c2,int c3,CardResult r,ArrayList<Card> t){
        Card1=c1;
        Card2=c2;
        Card3=c3;
        cardresult=r;
        threecard=t;
    }
    @Override
    public void run() {
        
        System.out.println(">>>BroadcastCard Task"+Card1+Card2+Card3);
        /*ArrayList<Card> threecard = new ArrayList<Card>();
        
        System.out.println("CardBean three cards length"+cardBean.Rules(Card1, Card2, Card3).length);
        threecard=cardBean.Rules(Card1, Card2, Card3);
        
        System.out.println("CardBean three cards length new card and correct card also >>>>"+threecard.size());    
        for (Card threecard1 : threecard) {
            // threecard[i]=cardBean.Rules(Card1, Card2, Card3)[i];
            System.out.println("CardBean three cards value" + threecard1.getCardId() +" " + threecard1.getColour() +" " + threecard1.getNumber() +" " + threecard1.getShade() +" " + threecard1.getShape());
        }*/
      
        JsonArrayBuilder builder=Json.createArrayBuilder();        
        if(threecard!=null)
        {
            for(Card c1:threecard)
            {
                builder.add(c1.toJson());                  
            }           
   
        JsonObject jo = Json.createObjectBuilder().add("Cards",builder).build();
        
            OutboundEvent data;
            data = new OutboundEvent.Builder()
                    .data(JsonObject.class,jo)
                    .mediaType(MediaType.APPLICATION_JSON_TYPE)
                    .build();
            System.out.println("Success Broadcast Cast Task");
            cardresult.send(data);
            System.out.println("Data>>>"+data);
        
        
        }    
    }
    
}
