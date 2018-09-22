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
public class SearchPropertyDetailDAO {
    /**
     * Gets an ArrayList of Loan detail entries
     * @return an ArrayList of Loan detail entries from the database
     */
    public ArrayList<SearchPropertyDetail> getLoanDetails() {
        ArrayList<SearchPropertyDetail> list = new ArrayList<SearchPropertyDetail>();
        PreparedStatement stmt = null;
        Connection conn = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("select * from search_logs");
            rs = stmt.executeQuery();

            String location = "";
            String propertyType = "";
            String bedroom = "";
            String priceRange = "";
            String areaRange = "";
            String min_price_range = "";
            String max_price_range = "";
            String min_area_range = "";
            String max_area_range = "";

            while (rs.next()) {

                propertyType = rs.getString(1);
                location = rs.getString(1);
                propertyType = rs.getString(2);
                bedroom = rs.getString(3);
                priceRange = rs.getString(4);
                areaRange = rs.getString(5);
                min_price_range = rs.getString(6);
                max_price_range = rs.getString(7);
                min_area_range = rs.getString(8);
                max_area_range = rs.getString(9);

                SearchPropertyDetail detail = new SearchPropertyDetail(location, propertyType, bedroom, min_price_range, max_price_range, min_area_range, max_area_range);

                list.add(detail);
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
    public void insertRecord(String details) {
        Connection conn = null;
        PreparedStatement ps = null;
        String query = "";
        query = details;

        String insertSQLdata = "insert into search_logs VALUES (" + query + ")";

        try {
            conn = ConnectionManager.getConnection();
            ps = conn.prepareStatement(insertSQLdata);
            // ps.setString(1, propertyType);
            ps.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionManager.close(conn, ps, null);
        }
    }
}