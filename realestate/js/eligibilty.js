var loan_prices = new Array();
loan_prices["5year"]=5;
loan_prices["10year"]=10;
loan_prices["15year"]=15;
loan_prices["20year"]=20;
loan_prices["25year"]=25;
loan_prices["30year"]=30;
loan_prices["35year"]=35;


var factor_options = new Array();
factor_options["public"]=400000;
factor_options["private"]=9000000;

function getHousingPrice() {
    var factorSelect;
    var limit = document.getElementById('valueLimit').value;
    if(limit !== null && limit !== ''){
        factorSelect = limit;
    }else{
        factorSelect = factor_options[document.getElementById('user-factor').value];
    }
    //alert(factor_options[factorSelect.value]);

    return factorSelect;
}

function getLoanYear() {
    var user_input= 0;
    var selectedFactorOption = document.getElementById('loanyearrange');
    return parseInt(selectedFactorOption.value);
    
}

function getMainUserAge() {
	return parseInt(document.getElementById('ageinput').value);
}

function getJointUserAge() {
    return parseInt(document.getElementById('jointageinput').value);
}

function getMSR() {
	return parseFloat(getSalary()*0.3);
}

function getSalary() {
	mainSalary = parseFloat(document.getElementById('salaryinput').value);
    jointSalary = parseFloat(document.getElementById('jointsalaryinput').value);
    salary = mainSalary + jointSalary;

	return salary;
}

function getSavings() {
	mainSavings = parseFloat(document.getElementById('savingsinput').value);
    jointSavings = parseFloat(document.getElementById('jointsavingsinput').value);
    savings = mainSavings + jointSavings;

	return savings;
}

function getMainCPF() {
    var cpf = parseFloat(document.getElementById('cpfinput').value);
    return cpf;
}

function getJointUserCPF() {
    var cpf = parseFloat(document.getElementById('jointcpfinput').value);
    return cpf;
}

function getGrant() {
    mainUserGrant = parseFloat(document.getElementById('grantinput').value);
    jointUserGrant = parseFloat(document.getElementById('jointgrantinput').value);

	return (mainUserGrant + jointUserGrant);
}

function getDebt() {
    mainUserDebt = parseFloat(document.getElementById('debtinput').value);
    jointUserDebt = parseFloat(document.getElementById('jointdebtinput').value);

	return (mainUserDebt + jointUserDebt);
}

function calculateTotal() {
    var total =0;
	total = Math.abs(getHousingPrice() -((getSalary() - getDebt())*getLoanYear()*12 + getSavings() + getMainCPF() + getGrant())) ;
	var totalEl = document.getElementById('totalPrice');

	document.getElementById('totalPrice').innerHTML = total;
	totalEl.style.display = 'block';
}

function hideTotal() {
	var totalEl = document.getElementById('totalPrice');
	totalEl.style.display = 'none';
}

function calculateMonthlyPayment() {
    // Assume that payments are made at the end of the period (month)
    var amount = getHousingPrice();
    var interest_rate = 1.7*0.01/12;
    var months = getLoanYear() * 12;
    
    var pvif = Math.pow(1+interest_rate, months);
    var payment = interest_rate * amount * pvif/(1 - pvif);
    
    
    var monthlyPayment = parseFloat(-1*payment).toFixed(2);
    var totalPaymentEl = document.getElementById('monthlyPayment');
    
    totalPaymentEl.innerHTML = monthlyPayment;
    totalPaymentEl.style.display = 'block';
    return monthlyPayment;
}

function getDSR() {
    // Rule 1: Net Income/ Debt < DSR
    var dsr = 0.6;
    var monthlyWage = parseFloat(getSalary()).toFixed(2);

    if (monthlyWage <= 3000){
        dsr = 0.6;
    } else if (monthlyWage <= 6000){
        dsr = 0.7;
    } else if (monthlyWage <= 10000){
        dsr = 0.75;
    } else {
        dsr = 0.8;
    }
    var belowDSR = document.getElementById('dsrValue');
    belowDSR.innerHTML = "Total Debt Servicing Ratio (%) <h1><strong>" + dsr + "</strong></h1>";
    return dsr;
}

function getMaxCPFWithdrawal(){
    var valuationLimit = getHousingPrice();
    var withdrawlLimit = valuationLimit*1.2;

    // Main User
    // Basic Retirement Sum
    var brs = 90000;
    if (getMainUserAge() <= 53){
        brs = 90000;
    } else if (getMainUserAge() == 54){
        brs = 88000;
    } else if (getMainUserAge() == 55){
        brs = 85000;
    } else if (getMainUserAge() == 56){
        brs = 83000;
    } else if (getMainUserAge() >= 57){
        brs = 80500;
    }

    var mainCPF = getMainCPF();
    var maxCPF1 = 0;
    if (getMainCPF() <= valuationLimit){
        maxCPF1 = getMainCPF();
    } else {
        // Set aside valuation limit
        maxCPF1 = getMainCPF() - brs;
        if (maxCPF1 >= withdrawlLimit){
            maxCPF1 = withdrawlLimit;
        }
    }

    // Joint User
    // Basic Retirement Sum
    var jointbrs = 90000;
    if (getJointUserAge() <= 53){
        jointbrs = 90000;
    } else if (getJointUserAge() == 54){
        jointbrs = 88000;
    } else if (getJointUserAge() == 55){
        jointbrs = 85000;
    } else if (getJointUserAge() == 56){
        jointbrs = 83000;
    } else if (getJointUserAge() >= 57){
        jointbrs = 80500;
    }

    mainCPF = getJointUserCPF();
    var maxCPF2 = 0;
    if (getJointUserCPF() <= valuationLimit){
        maxCPF2 = getJointUserCPF();
    } else {
        // Set aside valuation limit
        maxCPF2 = getJointUserCPF() - jointbrs;
        if (maxCPF2 >= withdrawlLimit){
            maxCPF2 = withdrawlLimit;
        }
    }

    var outputCPF = maxCPF1 + maxCPF2;


    var getElement = document.getElementById('maxcpf');
    getElement.innerHTML = "Max CPF Withdrawal ($) <h1><strong>"+ outputCPF.toLocaleString()+"</strong></h1>";
    return parseFloat(outputCPF);
}

function getNetDebtOverNetIncome(){
    var annualIncome = getSalary()*12 + getSavings()/getLoanYear();
    var annualDebt = calculateMonthlyPayment()*12 + getDebt()*12;

    return annualDebt/annualIncome;
}

function getGrossIncome(){
    return (getSalary() + getSavings()/getLoanYear());
}

function checkEligibility() {
    var eligibility = false;
    // Check eligibility
    // Rule 1: Net Income/ Debt < DSR

    if (getNetDebtOverNetIncome() < getDSR()){
        eligibility = true; // Throw DSR exceeded
    }

    // Rule 2: Mortgage Servicing Ratio (MSR) < 30%
    if (calculateMonthlyPayment() < 0.3*(getGrossIncome())){
        eligibility = true;  // Throw MSR exceeded
    }

    var eligibilityStatus = document.getElementById('eligibilityStatusBelow');
    var eligibilityTop = document.getElementById('eligibilityStatus');

    if(eligibility){
        eligibilityStatus.innerHTML = "<h2 style='text-transform: uppercase;color:#34a853' ><strong><i class='fa fa-check'></i> Eligible to Purchase</strong></h2>"
        eligibilityTop.innerHTML = "<div style='font-size:30px;color:#34a853;text-align:center'><i class='fa fa-check'></i> Eligible</div>"


    }else{
        eligibilityStatus.innerHTML = "<h2 style='text-transform: uppercase;color:#ea4335' ><strong><i class='fa fa-times-circle'></i> Not Eligible to Purchase</strong></h2>"
        eligibilityTop.innerHTML = "<div style='font-size:30px;color:#ea4335;text-align:center'><i class='fa fa-times-circle'></i> Not Eligible</div>"

    }

}

function getLTV(){
    var ltv = 0.75;
    var numProperties = 0; // Need to create numProperties

    numProperties = document.getElementById('property-count').value;
 
    var propertyType = document.getElementById('user-factor').value;

    // Buying HDB
    if (propertyType == "public"){
        // If no outstanding house loan
        if (numProperties == 0) {
            // If loan tenure < 25 AND sum of loan tenure and age <= 65
            if (getLoanYear() <= 25 && ((getLoanYear() + getMainUserAge()) <= 65)){
                ltv = 0.75;
            } else if (getLoanYear() > 25 || ((getLoanYear() + getMainUserAge()) > 65)){
                ltv = 0.55;
            }
        } else if (numProperties == 1){ // 1 existing house loan
            if (getLoanYear() <= 25 && ((getLoanYear() + getMainUserAge()) <= 65)){
                ltv = 0.45;
            } else if (getLoanYear() > 25 || ((getLoanYear() + getMainUserAge()) > 65)){
                ltv = 0.25;
            }
        } else if (numProperties == 2){ // 2 existing house loan
            if (getLoanYear() <= 25 && ((getLoanYear() + getMainUserAge()) <= 65)){
                ltv = 0.35;
            } else if (getLoanYear() > 25 || ((getLoanYear() + getMainUserAge()) > 65)){
                ltv = 0.15;
            }
        }
    } else { // Buying Private Property
        if (numProperties == 0) {
            // If loan tenure < 30 AND sum of loan tenure and age <= 65
            if (getLoanYear() <= 30 && ((getLoanYear() + getMainUserAge()) <= 65)){
                ltv = 0.75;
            } else if (getLoanYear() > 30 || ((getLoanYear() + getMainUserAge()) > 65)){
                ltv = 0.55;
            }
        } else if (numProperties == 1){ // 1 existing house loan
            if (getLoanYear() <= 30 && ((getLoanYear() + getMainUserAge()) <= 65)){
                ltv = 0.45;
            } else if (getLoanYear() > 30 || ((getLoanYear() + getMainUserAge()) > 65)){
                ltv = 0.25;
            }
        } else if (numProperties == 2){ // 2 existing house loan
            if (getLoanYear() <= 30 && ((getLoanYear() + getMainUserAge()) <= 65)){
                ltv = 0.35;
            } else if (getLoanYear() > 30 || ((getLoanYear() + getMainUserAge()) > 65)){
                ltv = 0.15;
            }
        }
    }


    var belowLTV = document.getElementById('ltvValue');
    belowLTV.innerHTML = "Loan To Value (%) <h1><strong>" + ltv + "</strong></h1>";

    return ltv;
}

function calculateMaxLoan() {
    // Need to factor in LTV

    var maxLoan = getHousingPrice() * getLTV();
    if (getMainUserAge() < 21){
        maxLoan = 0;
    }


    var totalEl = document.getElementById('totalPrice');
    var belowLoanEl = document.getElementById('loanValueBelow');
    totalEl.innerHTML = Math.round(maxLoan).toLocaleString();
    belowLoanEl.innerHTML = "Total Funds Available ($) <strong>" +  Math.round(maxLoan).toLocaleString() +"</strong>";
    totalEl.style.display = 'block';

    return Math.round(maxLoan);
}

function recalculateAmt() {
    calculateMonthlyPayment();
    calculateMaxLoan();

    // results breakdown section
    checkEligibility();
    getLTV();
    getDSR();
    getMaxCPFWithdrawal();

    var total = parseFloat(getMaxCPFWithdrawal() + getSavings() + calculateMaxLoan());

    document.getElementById('savingsValue').innerHTML = "Available Savings ($) <h1><strong>"+ savings + "</strong></h1>";
    document.getElementById('grantValue').innerHTML = "Housing Grant($) <h1><strong>"+ document.getElementById('grantinput').value + "</strong></h1>";
    document.getElementById('msrValue').innerHTML = "Monthly Payment Limit <h1><strong>"+ getMSR() + "</strong></h1>";

    document.getElementById('totalValueBelow').innerHTML = "Total Funds Available ($) <strong>"+ total.toLocaleString(); + "</strong>";

}

$('a.page-scroll').bind('click', function(event) {
    var $ele = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($ele.attr('href')).offset().top - 60)
    }, 1450, 'easeInOutExpo');
    event.preventDefault();
});


$(document).ready(function () {
    $('#rangeText').text($('#loanyearrange').val());

    $('#loanyearrange').slider({
        formatter: function (value) {
            return 'Current value: ' + value;
        }
    });
    $('#loanyearrange').on('input change', function () {
        $('#rangeText').text($(this).val());
    });
});




function toggleJointApp() {
    var x = document.getElementById("jointAppSection");
    if (x.style.display === "none") {
        x.style.display = "block";
        $("#single-btn").removeClass("btn-primary").addClass('btn-secondary');
        $("#joint-btn").removeClass("btn-secondary").addClass('btn-primary');
    } else {
        x.style.display = "none";
        $("#joint-btn").removeClass("btn-primary").addClass('btn-secondary');
        $("#single-btn").removeClass("btn-secondary").addClass('btn-primary');
    }
}