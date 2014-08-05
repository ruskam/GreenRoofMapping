/* June 21
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.greenroof.servlets;


import com.google.gson.Gson;
//import com.google.gson.JsonObject;
import com.google.gson.JsonObject;
import com.greenroof.bean.Module;
import com.greenroof.data.ModuleDB;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author rk
 */
@WebServlet(name = "BringJavaBean", urlPatterns = {"/bringModule"})
public class BringJavaBean extends HttpServlet {
    

    
    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        
        try {
            StringBuilder sb = new StringBuilder();
            String s = "";
            while ((s = request.getReader().readLine()) != null) {
                sb.append(s);
            }
            Module clientModule = gson.fromJson(sb.toString(), Module.class);
            
            int clientModuleID = clientModule.getModuleID(); 
            //System.out.println("clientModuleID: " + clientModuleID);
            
            Module responseModule = ModuleDB.selectModule(clientModuleID);
            System.out.println("module on servlet: " + responseModule.toString());
            String jsonBean = new Gson().toJson(responseModule);
               
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jsonBean);
            
        } catch (Exception e) {
            System.out.println(e);
        }
        
        
        
    }
    
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        
        try {
            StringBuilder sb = new StringBuilder();
            String s = "";
            while ((s = request.getReader().readLine()) != null) {
                sb.append(s);
            }
            Module clientModule = gson.fromJson(sb.toString(), Module.class);
            
            int clientModuleID = clientModule.getModuleID(); 
            //System.out.println("clientModuleID: " + clientModuleID);
            
            Module responseModule = ModuleDB.selectModule(clientModuleID);
            System.out.println("module on servlet: " + responseModule.toString());
            String jsonBean = new Gson().toJson(responseModule);
               
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jsonBean);
            
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
    
    

}
