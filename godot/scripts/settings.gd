extends Node


class Language:
	
	var code: String
	
	var name: String:
		get:
			match code:
				"es": return "Español"
				"en": return "English"
				_: return code
				
	var dictionary_url: String:
		get:
			match code:
				"es": return "https://dle.rae.es"
				"en": return "https://dictionary.cambridge.org/dictionary/english"
				_: return "dict://"
			
	
	func _init(code: String): 
		self.code = code


signal language_change(language: Language)


var languages: Array[Language] = [
	Language.new("es"), 
	Language.new("en")
]

var _save_file_path = "user://settings.save"


@onready var language_selected: Language = languages[0]:
	set(value):
		if language_selected != value:
			language_change.emit(value)
		language_selected = value
	get: 
		return language_selected


func _ready() -> void:
	if not FileAccess.file_exists(_save_file_path):
		print("No save file.")
		return
		
	var save_file = FileAccess.open(_save_file_path, FileAccess.READ)
	var json_parser = JSON.new()
	var parse_result = json_parser.parse(save_file.get_line())
	if not parse_result == OK:
		print("JSON parse error: ", json_parser.get_error_message())
		return
	
	var save_data = json_parser.data
	print("save data: ", save_data)
	
	language_selected = Language.new(save_data["language"])


func save() -> void:
	var save_data = {
		"language": language_selected.code
	}
	var save_file = FileAccess.open(_save_file_path, FileAccess.WRITE)
	var json_data = JSON.stringify(save_data)
	
	save_file.store_line(json_data)
	print("saved: ", json_data)
