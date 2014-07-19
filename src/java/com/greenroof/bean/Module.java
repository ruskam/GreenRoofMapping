package com.greenroof.bean;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Module implements Serializable{
    private int moduleID;
    private String moduleDepth;    
    private String species;
    private String slope;
    private double lifterWeight;
    
    //private Map<Integer, Double> weightsMap = new HashMap<Integer, Double>();
    private Map<Integer, Double> weightsMap;   
    private static final long serialVersionUID = 42L; 
    
    public Module(){
        this.moduleID = 0;
        this.moduleDepth = "";
        this.species = "";
        this.lifterWeight = 0;
        this.slope = "";
        this.weightsMap = new HashMap<Integer, Double>();
    }
    
    public Module(int moduleID, String moduleDepth, String species, int sessionID,
            String sessionDate, double lifterWeight, Map weightsMap, String slope){
        
        this.moduleID = moduleID;
        this.moduleDepth = moduleDepth;
        this.species = species;
        this.lifterWeight = lifterWeight;
        this.weightsMap = weightsMap;
        this.slope = slope;
    }
    
    public String getSlope() {
        return this.slope;
    }
    
    public void setSlope(String slope) {
        if (slope == null) {
            System.out.println("Slope is null");
            System.exit(0);
        }
        else {
            this.slope = slope;
        }
    }
    
    public String toString() {
        String str;
        str = "Module ID: " + this.moduleID + ", weights: " + weightsMap;
        return str;
    }
    
    public String getModuleDepth() {
        return moduleDepth;
    }

    public void setModuleDepth(String moduleDepth) {
        this.moduleDepth = moduleDepth;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public void setLifterWeight(double lifterWeight) {
        this.lifterWeight = lifterWeight;
    }
    
    public double getLifterWeight() {
        return this.lifterWeight;
    }
    
    public boolean setWeightMap(Integer sessionID, Double weight){
        this.weightsMap.put(sessionID, weight);
        return true;
    }
    
    public Object getWeightMap(Integer sessionID){
        return this.weightsMap.get(sessionID);
    }
    
    public Map<Integer, Double> getWeightMap(){
        return this.weightsMap;
    }
    
    public void setModuleID(int moduleID){
        if (moduleID == 0){
            System.out.println("null id");
            System.exit(0);
        }
        else {
            this.moduleID = moduleID;
        }
        
    }
    
    public int getModuleID(){
        return this.moduleID;
    }        
    
}
