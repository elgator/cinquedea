var DEBUG = false; //change for true for debug prints
var garbage_chars = ",. :'\"-`";

function is_palindrome(pal_str){
	
	if (pal_str.length == 0 || pal_str.length == 1){
		if (DEBUG) console.log("EQ :");
		return true;
	
	} else {
		
		first_char = pal_str[0].toLowerCase();
		last_char = pal_str[pal_str.length - 1].toLowerCase();
		shorter = '';
		
		// drop first if garbage
		if (garbage_chars.includes(first_char)){ 
			shorter = pal_str.substr(1, pal_str.length - 1);
			if (DEBUG) console.log("FST: " + shorter);
			return is_palindrome(shorter);
		
		// drop last if garbage
		} else if (garbage_chars.includes(last_char)){ 
			shorter = pal_str.substr(0, pal_str.length - 1);
			if (DEBUG) console.log("LST: " + shorter);
			return is_palindrome(shorter);
		
		// we need to go deeper -- drop 2 outer chars
		} else if (first_char == last_char){ 
			shorter = pal_str.substr(1, pal_str.length - 2);
			if (DEBUG) console.log("BTH: " + shorter);
			return is_palindrome(shorter);
		
		} else {
				if (DEBUG) console.log("UEQ:");
				return false;
		}
	}
}

function test_pal(pal_str, required){
	if (DEBUG) console.log("\nCHK: " + pal_str);
	
	let req_space = "";
	let pal_space = "";
	
	if (required) req_space = " ";
	pal = is_palindrome(pal_str);
	if (pal) pal_space = " ";
	if (DEBUG) console.log("SHOULD | ACTUAL | STRING");
	console.log(" " + req_space + required + " |  " + pal_space + pal + " | " + pal_str);
}

//testing
console.log("\nTESTS\n");
console.log("SHOULD | ACTUAL | STRING");
console.log("------------------------");
test_pal("d", true);
test_pal("aa", true);
test_pal("cdc", true);
test_pal("abcdcba", true);
test_pal("abccba", true);
test_pal("abcabc", false);
test_pal("acd", false);
test_pal("blah, blah", false);
test_pal("Madam, I'm Adam", true);
test_pal("a,,,a", true);
test_pal("a.,.  .,a", true);
test_pal("a,,b,a", true);
test_pal("a.,. c .,a", true);
test_pal("a,,,bca", false);
test_pal("ab.,.  .,da", false);
test_pal("a,,,c", false);
test_pal("A man, a plan, a canal - Panama", true)
