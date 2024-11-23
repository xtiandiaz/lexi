extends Node


signal language_change(code: String)


const LANGUAGES: Array[String] = ["es", "en"]


@onready var language_selected: String = LANGUAGES[0]:
	set(value):
		if language_selected != value:
			language_change.emit(value)
		language_selected = value
	get: 
		return language_selected


var dictionary_url: String:
	get: 
		match language_selected:
			"es": return "https://dle.rae.es"
			"en": return "https://dictionary.cambridge.org/dictionary/english"
			_: return ""
