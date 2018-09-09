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
factor_options["private"]=90000000;

function getHousingPrice() {
    var factorSelect = document.getElementById('user-factor');

    //alert(factor_options[factorSelect.value]);

    return factor_options[factorSelect.value];
}

function getLoanYear() {
    var user_input= 0;
    var selectedFactorOption = document.getElementsByName('selectedcake');

    for (i=0; i < selectedFactorOption.length; i++) {
        if (selectedFactorOption[i].checked) {
            user_input = selectedFactorOption[i].value;
        }
    }

    return parseInt(loan_prices[user_input]);
}

function getAge() {
	return parseInt(document.getElementById('ageinput').value);
}

function getMSR() {
	return parseFloat(getSalary()*0.3);
}

function getSalary() {
	salary = parseFloat(document.getElementById('salaryinput').value);

	return salary;
}

function getSavings() {
	savings = parseFloat(document.getElementById('savingsinput').value);

	return savings;
}

function getCPF() {
    var cpf = document.getElementById('cpfinput').value;
    var reduceValuationIndex = 0.8; //20% lower than org
    if(getAge() > 55){
        if(cpf > 16100 ){
            cpfcap = reduceValuationIndex*1.2*getHousingPrice();

            if(cpfcap > cpf ){
                return cpf;
            }else{
                return cpfcap;
            }
        }else{
            return 0;
        }
    }else{
        if(cpf > 17100){
            cpfcap = reduceValuationIndex*1.2*getHousingPrice();

            if(cpfcap > cpf ){
                return cpf;
            }else{
                return cpfcap;
            }

        }else{
            return 0;
        }
    }

	return 0;
}

function getGrant() {
	return document.getElementById('grantinput').value;
}

function getDebt() {
	return document.getElementById('debtinput').value;
}



function calculateTotal() {
    var total =0;
	total = Math.abs(getHousingPrice() -((getSalary() - getDebt())*getLoanYear()*12 + getSavings() + getCPF() + getGrant())) ;
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

    var inputCPF = getCPF();
    var outputCPF = 0.0;

    // If age <= 55, Basic Retirement Sum in OA must be > 171,000
    if (getAge() <= 55){
        outputCPF = inputCPF - 171000.00;
    } else {
        outputCPF = inputCPF - 161000.00;
    }

    if (outputCPF < 0){
        outputCPF = 0.0;
    }

    var getElement = document.getElementById('maxcpf');
    getElement.innerHTML = "Max CPF Withdrawal ($) <h1><strong>"+ outputCPF.toLocaleString()+"</strong></h1>";
    return outputCPF;
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
   console.log("netdebt/income: " + getNetDebtOverNetIncome());
   console.log("dsr: " + getDSR());
   console.log("monthly payment: " + calculateMonthlyPayment());
   console.log("30% gross income: " + getGrossIncome());

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
    console.log(numProperties);
    var propertyType = document.getElementById('user-factor').value;

    // Buying HDB
    if (propertyType == "public"){
        // If no outstanding house loan
        if (numProperties == 0) {
            // If loan tenure < 25 AND sum of loan tenure and age <= 65
            if (getLoanYear() <= 25 && ((getLoanYear() + getAge()) <= 65)){
                ltv = 0.75;
            } else if (getLoanYear() > 25 || ((getLoanYear() + getAge()) > 65)){
                ltv = 0.55;
            }
        } else if (numProperties == 1){ // 1 existing house loan
            if (getLoanYear() <= 25 && ((getLoanYear() + getAge()) <= 65)){
                ltv = 0.45;
            } else if (getLoanYear() > 25 || ((getLoanYear() + getAge()) > 65)){
                ltv = 0.25;
            }
        } else if (numProperties == 2){ // 2 existing house loan
            if (getLoanYear() <= 25 && ((getLoanYear() + getAge()) <= 65)){
                ltv = 0.35;
            } else if (getLoanYear() > 25 || ((getLoanYear() + getAge()) > 65)){
                ltv = 0.15;
            }
        }
    } else { // Buying Private Property
        if (numProperties == 0) {
            // If loan tenure < 30 AND sum of loan tenure and age <= 65
            if (getLoanYear() <= 30 && ((getLoanYear() + getAge()) <= 65)){
                ltv = 0.75;
            } else if (getLoanYear() > 30 || ((getLoanYear() + getAge()) > 65)){
                ltv = 0.55;
            }
        } else if (numProperties == 1){ // 1 existing house loan
            if (getLoanYear() <= 30 && ((getLoanYear() + getAge()) <= 65)){
                ltv = 0.45;
            } else if (getLoanYear() > 30 || ((getLoanYear() + getAge()) > 65)){
                ltv = 0.25;
            }
        } else if (numProperties == 2){ // 2 existing house loan
            if (getLoanYear() <= 30 && ((getLoanYear() + getAge()) <= 65)){
                ltv = 0.35;
            } else if (getLoanYear() > 30 || ((getLoanYear() + getAge()) > 65)){
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
    if (getAge() < 21){
        maxLoan = 0;
    }


    var totalEl = document.getElementById('totalPrice');
    var belowLoanEl = document.getElementById('loanValueBelow');
    totalEl.innerHTML = Math.round(maxLoan).toLocaleString();
    belowLoanEl.innerHTML = "Max Loan Amount ($) <strong>" +  Math.round(maxLoan).toLocaleString() +"</strong>";
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

    console.log("recalculate "+ getMaxCPFWithdrawal() + getSavings() + calculateMaxLoan());
    var total = parseFloat(getMaxCPFWithdrawal() + getSavings() + calculateMaxLoan());

    document.getElementById('savingsValue').innerHTML = "Housing Grant($) <h1><strong>"+ savings + "</strong></h1>";
    document.getElementById('grantValue').innerHTML = "Housing Grant($) <h1><strong>"+ document.getElementById('grantinput').value + "</strong></h1>";
    document.getElementById('msrValue').innerHTML = "Monthly Payment Limit <h1><strong>"+ getMSR() + "</strong></h1>";

    document.getElementById('totalValueBelow').innerHTML = "Max Affordable Property ($) <strong>"+ total.toLocaleString(); + "</strong>";

}

$('a.page-scroll').bind('click', function(event) {
    var $ele = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($ele.attr('href')).offset().top - 60)
    }, 1450, 'easeInOutExpo');
    event.preventDefault();
});

