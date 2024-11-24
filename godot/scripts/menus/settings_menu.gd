class_name SettingsMenu extends CanvasLayer


class State:
	var language_code: String
	
	func _init(language_code: String) -> void:
		self.language_code = language_code


@export var language_button_container: Container
@export var version_label: Label


var _state: State = State.new(Settings.language_selected)
var _language_buttons: Array[LanguageButton] = []


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	version_label.text = "v{0}".format([ProjectSettings.get_setting("application/config/version")])
	
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
	
	_state.language_code = language_code


func _on_close_button_pressed() -> void:
	Settings.language_selected = _state.language_code
	
	Settings.save()
	
	queue_free()
