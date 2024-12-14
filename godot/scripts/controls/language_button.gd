class_name LanguageButton extends Button


var _language: Settings.Language:
	set(value):
		text = value.name
		_language = value
	get: 
		return _language


static func instantiate(language: Settings.Language) -> LanguageButton:
	var instance = load("res://scenes/controls/language_button.tscn").instantiate()
	instance._language = language
	return instance
	
