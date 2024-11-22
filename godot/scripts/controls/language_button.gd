class_name LanguageButton extends Button


var language_code: String:
	set(value):
		language_code = value
		text = Utils.language_name(language_code)
	get: return language_code


static func instantiate(language_code: String) -> LanguageButton:
	var instance = load("res://scenes/controls/language_button.tscn").instantiate()
	instance.language_code = language_code
	return instance
	
