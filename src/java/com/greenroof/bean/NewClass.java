/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greenroof.bean;

/**
 *
 * @author rustamkamberov
 */
public class NewClass {
    public static void main(String[] args) {
        Module module = new Module();
        module.setWeightMap(1, 1.11);
        module.setWeightMap(2, 2.22);
        System.out.println("Testing standalone class");
        System.out.println("module: " + module);
        System.out.println("module weight: " + module.getWeightMap(1));
        
        System.out.println("-----------------------------------");
        
        Module module2 = new Module();
        module2.setWeightMap(1, 777.0);
        System.out.println("module2: " + module2);
        System.out.println("module2 weight: " + module2.getWeightMap(1).getClass());
        
        //module.setWeightMap(1, (Double) module.getWeightMap(1));
        System.out.println("-----------------------------------");
        module = module2;
        System.out.println("module weight: " + module.getWeightMap(1));
    }
}
