var DEBUG = false;

function areParenthesesOK(par_str, lvl){
	
	if (lvl === undefined){
		lvl = 0; // если поставить let, то после выхода из блока if lvl снова undefined %|
	}
	
	if (par_str == ''){
		return !!(lvl == 0);
	
	} else if (par_str[0] == ")"){
		if (DEBUG) console.log(")  : " + lvl);
		if (lvl >= 1){
			return areParenthesesOK(par_str.substr(1), lvl - 1);
		} else {
			return false;
		}
	
	} else {
		return areParenthesesOK(par_str.substr(1), lvl + 1);
	}
}

function test_par(par_str, required){
	if (DEBUG) console.log("\nCHK: " + par_str);
	
	let req_space = "";
	let par_space = "";
	
	if (required) req_space = " ";
	let par = areParenthesesOK(par_str);
	if (par) par_space = " ";
	if (DEBUG) console.log("SHOULD | ACTUAL | STRING");
	console.log(" " + req_space + required + " |  " + par_space + par + " | " + par_str);
}

//testing
console.log("\nTESTS\n");
console.log("SHOULD | ACTUAL | STRING");
console.log("------------------------");
test_par(")", false);
test_par("(", false);
test_par("()", true);
test_par("(())", true);
test_par("((()", false);
test_par(")()(", false);
test_par("(()())", true);