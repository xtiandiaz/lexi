class_name LanguageDisplay extends Label


@export var language_label: Label


func _ready() -> void:
	_update_language_code(Settings.language_selected)
	Settings.language_change.connect(_update_language_code)
	

## Signals


func _update_language_code(code: String) -> void:
	language_label.text = code.to_upper()
