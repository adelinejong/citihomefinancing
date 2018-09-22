
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
/**
 *
 *
 */
@WebServlet(name = "searchSubmit", urlPatterns = {"/PropertyDetailSubmission"})
public class SubmitPropertyDetail extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        String district = (String) session.getAttribute("district");
        String propertyType = (String) session.getAttribute("property_type");
        String bedroom = (String) session.getAttribute("bedroom");
        String min_price_range = (String) session.getAttribute("min_price_range");
        String max_price_range = (String) session.getAttribute("max_price_range");
        String min_area_range = (String) session.getAttribute("min_area_range");
        String max_area_range = (String) session.getAttribute("max_area_range");


        DecimalFormat fmt = new DecimalFormat("#.00");

        SearchPropertyDetail searchDetail = new SearchPropertyDetail(
                district,
                propertyType,
                bedroom,
                min_price_range,
                max_price_range,
                min_area_range,
                max_area_range);

        String searchDetails = district+ ", " +propertyType + ", " + bedroom + ", " + min_price_range + ", " + max_price_range + ", " + min_area_range + ", " + max_area_range;

        SearchPropertyDetailDAO dao = new SearchPropertyDetailDAO();
        dao.insertRecord(searchDetails);

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
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
        processRequest(request, response);
    }

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
        processRequest(request, response);
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