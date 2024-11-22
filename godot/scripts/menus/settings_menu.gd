class_name SettingsMenu extends CanvasLayer


signal closed()


@export var language_button_container: Container


var _language_buttons: Array[LanguageButton] = []


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	for lang in Settings.LANGUAGES:
		var button = LanguageButton.instantiate(lang)
		button.button_pressed = lang == Settings.language_selected
		button.pressed.connect(_on_language_button_pressed.bind(lang))
		language_button_container.add_child(button)
		_language_buttons.append(button)


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


## Signals


func _on_language_button_pressed(language_code: String) -> void:
	for button in _language_buttons:
		button.button_pressed = button.language_code == language_code
	
	Settings.language_selected = language_code


func _on_close_button_pressed() -> void:
	closed.emit()
	queue_free()
