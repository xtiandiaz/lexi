extends Node


const LANGUAGES: Array[String] = ["es", "en"]


@onready var language_selected: String = LANGUAGES[0]


var dictionary_url: String:
	get: 
		match language_selected:
			"es": return "https://dle.rae.es"
			"en": return "https://dictionary.cambridge.org/dictionary/english"
			_: return ""
