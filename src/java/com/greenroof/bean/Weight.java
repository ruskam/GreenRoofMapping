/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greenroof.bean;

import java.io.Serializable;

/**
 *
 * @author rk
 */
public class Weight implements Serializable{
    
    private String w1;
    private String w2;
    
    public Weight(){};
    
    public void setW1(String w1){
        this.w1 = w1;
    }
    
    public String getW1(){
        return this.w1;
    }
    
    public void setW2(String w2){
        this.w2 = w2;
    }
    
    public String getW2(){
        return this.w2;
    }
    
}
