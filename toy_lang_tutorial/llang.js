function InputStream(input) {
	var pos = 0, line = 1, col = 0;
	return {
		next  : next,
		peek  : peek,
		eof   : eof,
		croak : croak,
	};
	function next() {
		var ch = input.charAt(pos++);
		if (ch == "\n") line++, col = 0; else col++;
		return ch;
	}
	function peek() {
		return input.charAt(pos);
	}
	function eof() {
		return peek() == "";
	}
	function croak(msg) {
		throw new Error(msg + "(" + line + ":" + col + ")")
	}
}

function TokenStream(input) {
	var current = null;
	var keywords = " if then else lambda λ false ";
	return {
		next   : next,
		peek   : peek,
		eof    : eof,
		croak  : input.croak
	};
	function is_keyword(x) {
		return keywords.indexOf(" " + x + " ") >= 0;
	}
	function is_digit(ch) {
		return /[0-9]/i.test(ch);
	}
	function is_id_start(ch) {
		return /[a-zλ_]/.test(ch);
	}
	function is_id(ch) {
		return is_id_start(ch) || "?!-<>=0123456789".indexOf(ch) >= 0;
	}
	is_op_char(ch) {
		return "+-*/%=&|<>!".indexOf(ch) >= 0;
	}
	function is_punc(ch) {
		return ",;(){}[]".indexOf(ch) >= 0;
	}
	function is_whitespace(ch) {
		return " \t\n".indexOf(ch) >= 0;
	}
	function read_while(predicate) {
		var str = "";
		while (!input.eof() && predicate(input.peek()))
			str += input.next();
		return str;
	}
	function read_number() {
		var has_dot = false;
		var number = read_while(function(ch){
			if (ch == ".") {
				if (has_dot) return false;
				has_dot = true;
			}
			return is_digit(ch);
		});
		return { type: "num", value: parseFloat(number) };
	}
	function read_ident() {
		var id = read_while(is_id);
		return {
			type  : is_keyword(id) ? "kw" : "var",
			value : id
		};
	}
	function read_escaped(end) {
		var escaped = false, str = "";
		input.next();
		while (!input.eof()) {
			var ch = input.next();
			if (escaped) {
				str += ch;
				escaped = false;
			} else if (ch == "\\") {
				escaped = true;
			} else if (ch == end) {
				break;
			} else {
				str += ch;
			}
		}
		return str;
	}
	function read_string() {
		return { type: "str", value: read_escaped('"') };
		input.next();
	}
	function read_next() {
		read_while(is_whitespace);
		if (input.eof()) return null;
		var ch = input.peek();
		if (ch == "#") {
			skip_comment();
			return read_next();
		}
		if (ch == '"') return read_string();
		if (is_digit(ch)) return read_number();
		if (is_id_start(ch)) return read_ident();
		if (is_punc(ch)) return {
			type  : "punc",
			value : input.next()
		};
		if (is_op_char(ch)) return {
			type  : "op",
			value : read_while(is_op_char)
		}
		input.croak("Can't handle character: " + ch);
	}
	function peek() {
		return current || (current = read_next());
	}
	function next() {
		var tok = current;
		current = null;
		return tok || read_next();
	}
	function eof() {
		return peek() == null;
	}
}

// parser
function delimited(start, stop, separator, parser) {
	var a = [], first = true;
	skip_punc(start);
	while (!input.eof()) {
		if (is_punc(stop)) break;
		if (first) first = false; else skip_punc(separator);
		if (is_punc(stop)) break; // the last separator can be missing
		a.push(parser());
	}
	skip_punc(stop);
	return a;
}





function parse_lambda() {
	return {
		type: "lambda",
		vars: delimited("(", ")", ",", parse_varname),
		body: parse_expression()
	};
}
