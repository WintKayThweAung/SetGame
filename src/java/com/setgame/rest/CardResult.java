/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.setgame.rest;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import javax.enterprise.context.ApplicationScoped;
import org.glassfish.jersey.media.sse.EventOutput;
import org.glassfish.jersey.media.sse.OutboundEvent;
import org.glassfish.jersey.media.sse.SseBroadcaster;

/**
 *
 * @author Nu Nu
 */
@ApplicationScoped
public class CardResult {
    private SseBroadcaster  broadcaster=new SseBroadcaster();
    private ReadWriteLock rwLock=new ReentrantReadWriteLock();
    
    public void add(EventOutput eo){
        final Lock wLock=rwLock.writeLock();
        wLock.lock();
        
        try{
            broadcaster.add(eo);
        }finally{
            wLock.unlock();
        }
    }
    
    public void send(OutboundEvent event){
        final Lock rLock=rwLock.readLock();
        rLock.lock();
        try{
            System.out.println(">>> sending data");
            broadcaster.broadcast(event);
            System.out.println(event);
        }finally{
            rLock.unlock();
        }
    }    
}
