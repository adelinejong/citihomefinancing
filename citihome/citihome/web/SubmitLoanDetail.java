
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
@WebServlet(name = "loanSubmit", urlPatterns = {"/LoanDetailSubmission"})
public class SubmitLoanDetail extends HttpServlet {

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
        /*
        user-factor - Type of Loan (Public HDB/ Private)
        valueLimit - Valuation Limit
        property-count - Number of Property

        ageinput
        salaryinput
        savingsinput
        cpfinput
        debtinput
        grantinput

        jointageinput
        jointsalaryinput
        jointsavingsinput
        jointcpfinput
        jointdebtinput
        jointgrantinput

         */
        String propertyType = (String) session.getAttribute("user-factor");
        String valueLimit = (String) session.getAttribute("valueLimit");
        String propertyCount = (String) session.getAttribute("property-count");
        String ageinput = (String) session.getAttribute("ageinput");
        String salaryinput = (String) session.getAttribute("salaryinput");
        String savingsinput = (String) session.getAttribute("savingsinput");
        String cpfinput = (String) session.getAttribute("cpfinput");
        String debtinput = (String) session.getAttribute("debtinput");
        String grantinput = (String) session.getAttribute("grantinput");

        String jointageinput = (String) session.getAttribute("jointageinput");
        String jointsalaryinput = (String) session.getAttribute("jointsalaryinput");
        String jointsavingsinput = (String) session.getAttribute("jointsavingsinput");
        String jointcpfinput = (String) session.getAttribute("jointcpfinput");
        String jointdebtinput = (String) session.getAttribute("jointdebtinput");
        String jointgrantinput = (String) session.getAttribute("jointgrantinput");
        String maxLoan = (String) session.getAttribute("totalPrice");


        DecimalFormat fmt = new DecimalFormat("#.00");

        LoanDetails loanDetail = new LoanDetails(
                propertyType,
                valueLimit,
                propertyCount,
                ageinput,
                salaryinput,
                savingsinput,
                cpfinput,
                debtinput,
                grantinput,
                jointageinput,
                jointsalaryinput,
                jointsavingsinput,
                jointcpfinput,
                jointdebtinput,
                jointgrantinput,
                maxLoan);

        String loanDetails = propertyType + ", " + valueLimit + ", " + propertyCount + ", " + ageinput + ", " + salaryinput + ", " + savingsinput + ", "
                + cpfinput + ", "
                + debtinput + ", "
                + grantinput + ", "
                + jointageinput + ", "
                + jointsalaryinput + ", "
                + jointsavingsinput + ", "
                + jointcpfinput + ", "
                + jointdebtinput + ", "
                + jointgrantinput + ", "
                + maxLoan;

        LoanDetailsDAO dao = new LoanDetailsDAO();
        dao.insertRecord(loanDetails);

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