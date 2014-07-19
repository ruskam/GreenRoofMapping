/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greenroof.bean;

/**
 *
 * @author rk
 */
public class Status {
    private boolean success;
    private String description;
    
    public Status(){
        this.success = false;
        this.description = "";
    }
    
    public void setSuccess(boolean success){
        this.success = success;
    }
    
    public void setDescription(String description){
        this.description = description;
    }
    
    public boolean getSuccess(){
        return this.success;
    }
    
    public String getDescription(){
        return this.description;
    }
}
