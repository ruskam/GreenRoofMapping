/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greenroof.data;

import com.google.gson.Gson;
import com.greenroof.bean.Module;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.Date;

/**
 *
 * @author rustamkamberov
 */
public class ModuleDB {
    
    public static Module selectModule(int clientModuleID) {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        Module module = null;
        
        String query = "select m.moduleid, m.moduledepth, m.species, m.slope, "
                        + "w.sessionid, w.sessiondate, w.lifterweigh, r.moduleweight " 
                        + "from modules as m, results as r, weighsession as w " 
                        + "where m.moduleid = r.moduleid " 
                        + "and w.sessionid = r.sessionid "
                        + "and m.moduleid = ? "
                        + "order by w.sessionid asc ;";
        try {
            ps = connection.prepareStatement(query);
            ps.setInt(1, clientModuleID);
            rs = ps.executeQuery();
            module = new Module();
            
            while (rs.next()) {
                module.setModuleID(rs.getInt("moduleid"));
                module.setModuleDepth(rs.getString("moduledepth").replaceAll("\\s+", ""));
                module.setSpecies(rs.getString("species").replaceAll("\\s+", ""));
                module.setLifterWeight(getRounded(rs.getDouble("lifterweigh")));
                module.setSlope(rs.getString("slope").replaceAll("\\s+", ""));
                module.setWeightMap(rs.getInt("sessionid"), getRounded(rs.getDouble("moduleweight")));
            
            }
            return module;
            
        } catch (SQLException e) {            
            System.out.println(e);
            return null;
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }
    
    public static boolean moduleExists(int clientModuleID) {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        String query = "SELECT m.moduleid FROM modules as m WHERE m.moduleid = ?"; 
        try {
            ps = connection.prepareStatement(query);
            ps.setInt(1, clientModuleID);
            rs = ps.executeQuery();
            System.out.println("rs.next() in ModuleDB: " + rs.next());
            return rs.next();
        } catch (SQLException e) {
            System.out.println(e);
            return false;
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }
    
    private static double getRounded(double number) {
        DecimalFormat df = new DecimalFormat("#.##");
        number = Double.valueOf(df.format(number));
        return number;
    }
}
