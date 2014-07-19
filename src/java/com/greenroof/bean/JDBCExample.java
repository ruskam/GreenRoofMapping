package com.greenroof.bean;



import com.google.gson.Gson;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DecimalFormat;
 
public class JDBCExample {
    
        private static double getRounded(double number) {
            DecimalFormat df = new DecimalFormat("#.##");
            number = Double.valueOf(df.format(number));
            return number;
        }
 
	public static void main(String[] argv) {
                Connection connection = null;
                PreparedStatement ps = null;
                ResultSet rs = null;
		System.out.println("-------- PostgreSQL "
				+ "JDBC Connection Testing ------------");
 
		try {
 
			Class.forName("org.postgresql.Driver");
 
		} catch (ClassNotFoundException e) {
 
			System.out.println("Where is your PostgreSQL JDBC Driver? "
					+ "Include in your library path!");
			e.printStackTrace();
			return;
 
		}
 
		System.out.println("PostgreSQL JDBC Driver Registered!");
 
		
                
                Module module = null;
 
		try {
 
			connection = DriverManager.getConnection(
					"jdbc:postgresql://127.0.0.1:5432/greenroof", "postgres",
					"webgis");
                        
                        String query = "select m.moduleid, w.sessionid, w.lifterweigh, r.moduleweight " 
                                + "from modules as m, results as r, weighsession as w " 
                                + "where m.moduleid = r.moduleid " 
                                + "and w.sessionid = r.sessionid "
                                + "and m.moduleid = ?; ";
                                //+ "order by w.sessionid asc;"; 
                        ps = connection.prepareStatement(query);
                        ps.setInt(1, 4);
                        rs = ps.executeQuery();
                        System.out.println(rs);
                        module = new Module();
                        while (rs.next()) {
                            int modID = rs.getInt("moduleid");
                            module.setModuleID(modID);
                            
                            //int sessID = rs.getInt("sessionid");
                            
                            double lifter = rs.getDouble("lifterweigh");
                            module.setLifterWeight(lifter);
                            
                            double weight = rs.getDouble("moduleweight");
                            
                            module.setWeightMap(rs.getInt("sessionid"), getRounded(rs.getDouble("moduleweight")));
                            
                            System.out.print(modID + " ");
                            System.out.print(rs.getInt("sessionid") + " ");
                            System.out.print(lifter + " ");
                            System.out.print(weight);
                            
                            System.out.println();
                        }
                        System.out.println(module.toString());
                        String jsonBean = new Gson().toJson(module);
                        System.out.println(module.getWeightMap());
                        System.out.println("-----JDBC Examples-----");
                        System.out.println(jsonBean);
 
		} catch (SQLException e) {
 
			System.out.println("Connection Failed! Check output console");
			e.printStackTrace();
			return;
 
		}
 
		if (connection != null) {
			System.out.println("You made it, take control your database now!");
		} else {
			System.out.println("Failed to make connection!");
		}
	}
 
}