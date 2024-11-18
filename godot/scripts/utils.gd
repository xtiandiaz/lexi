class_name Utils extends Object


static func normalized_string(string: String) -> String:
	var normalized = ""
	for c in string:
		normalized += _normalized_char(c)
	return normalized

	
static func normalized_array(array: Array[String]) -> Array[String]:
	var normalized: Array[String] = []
	for char in array:
		normalized.append(_normalized_char(char))
	return normalized
	
	
static func _normalized_char(char: String) -> String:
	match char:
		"á": return "a"
		"à": return "a"
		"é": return "e"
		"è": return "e"
		"í": return "i"
		"ì": return "e"
		"ó": return "o"
		"ò": return "e"
		"ú": return "u"
		"ù": return "e"
		"ü": return "u"
		_: return char


static func first_char_index_in_string(char: String, string: String) -> int:
	for i in string.length():
		if char == string[i]:
			return i
	return -1


static func string_has_char(string: String, char: String) -> bool:
	return first_char_index_in_string(char, string) != -1


static func string_to_char_array(string: String) -> Array[String]:
	var chars: Array[String] = []
	for char in string.split(""):
		chars.append(char)
	return chars


static func array_to_string(array: Array, separator: String = "") -> String:
	var string = ""
	var array_size = array.size()
	for i in array_size:
		string += String(array[i]) + (separator if i < array_size - 1 else "")
	return string
