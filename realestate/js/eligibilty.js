var inflow = getSalary() + getSavings() + getCPF() + getGrant() ;

var outflow = getDebt();


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
    var user_input= 0;
	var selectedFactorOption = document.getElementsByName('selectedcake');

	for (i=0; i < selectedFactorOption.length; i++) {
		if (selectedFactorOption[i].checked) {
			user_input = selectedFactorOption[i].value;
		}
	}

	return loan_prices[user_input];
}

function getLoanYear() {
	var factorSelect = document.getElementById('user-factor');

	//alert(factor_options[factorSelect.value]);

	return factor_options[factorSelect.value];
}

function getAge() {
	return document.getElementById('ageinput').value;
}

function getResidency() {
	return document.getElementById('residentinput').value;
}


function getSalary() {
	return document.getElementById('salaryinput').value;
}

function getSavings() {
	return document.getElementById('savingsinput').value;
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