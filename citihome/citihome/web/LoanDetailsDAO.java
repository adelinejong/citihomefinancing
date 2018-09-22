/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;

/**
 *
 * A LoanDetailsDAO represents a data access object of Bids
 */
public class LoanDetailsDAO {
    /**
     * Gets an ArrayList of Loan detail entries
     * @return an ArrayList of Loan detail entries from the database
     */
    public ArrayList<LoanDetails> getLoanDetails() {
        ArrayList<LoanDetails> list = new ArrayList<LoanDetails>();
        PreparedStatement stmt = null;
        Connection conn = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("select * from calculator_logs");
            rs = stmt.executeQuery();
            String usernameFromDatabase = "";
            String amountFromDatabase = "";
            String codeFromDatabase = "";
            String sectionFromDatabase = "";

            String propertyType = "";
            String valuationLimit = "";
            String propertyCountInt = "";
            String ageinputInt = "";
            String salaryinputDouble = "";
            String savingsinputDouble = "";
            String cpfinputDouble = "";
            String debtinputDouble = "";
            String grantinputDouble = "";
            String jointageinputInt = "";
            String jointsalaryinputDouble = "";
            String jointsavingsinputDouble = "";
            String jointcpfinputDouble = "";
            String jointdebtinputDouble = "";
            String jointgrantinputDouble = "";
            String maxLoan = "";

            while (rs.next()) {

                propertyType = rs.getString(1);
                valuationLimit = rs.getString(2);
                propertyCountInt = rs.getString(3);
                ageinputInt = rs.getString(4);
                salaryinputDouble = rs.getString(5);
                savingsinputDouble = rs.getString(6);
                cpfinputDouble = rs.getString(7);
                debtinputDouble = rs.getString(8);
                grantinputDouble = rs.getString(9);
                jointageinputInt = rs.getString(10);
                jointsalaryinputDouble = rs.getString(11);
                jointsavingsinputDouble = rs.getString(12);
                jointcpfinputDouble = rs.getString(13);
                jointdebtinputDouble = rs.getString(14);
                jointgrantinputDouble = rs.getString(15);
                maxLoan = rs.getString(16);

                LoanDetails loanDetail = new LoanDetails(
                        propertyType,
                        valuationLimit,
                        propertyCountInt,
                        ageinputInt,
                        salaryinputDouble,
                        savingsinputDouble,
                        cpfinputDouble,
                        debtinputDouble,
                        grantinputDouble,
                        jointageinputInt,
                        jointsalaryinputDouble,
                        jointsavingsinputDouble,
                        jointcpfinputDouble,
                        jointdebtinputDouble,
                        jointgrantinputDouble,
                        maxLoan);

                list.add(loanDetail);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return list;
    }

    /**
     * Adds all successful bids stored in the specific ArrayList of Bids and the given round number
     * @param successfulbids the ArrayList of successfulBids
     * @param round the round number
     */
    public void insertRecord(String loanDetails) {
        Connection conn = null;
        PreparedStatement ps = null;
        if (successfulbids.isEmpty()) {
            return;
        }
        String query = "";
//        query = loanDetails.get

        String insertSQLdata = "insert into calculator_logs(propertyType, valuationLimit,propertyCountInt,ageinputInt,salaryinputDouble,savingsinputDouble,cpfinputDouble,debtinputDouble,grantinputDouble,jointageinputInt,jointsalaryinputDouble,jointsavingsinputDouble,jointcpfinputDouble,jointdebtinputDouble,jointgrantinputDouble,maxLoan) VALUES (" + query + ")";

        try {
            conn = ConnectionManager.getConnection();

            for (Bid addbids : successfulbids) {
                ps = conn.prepareStatement(insertSQLdata);
                // ps.setString(1, propertyType);
                ps.executeUpdate();
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionManager.close(conn, ps, null);
        }
    }
}