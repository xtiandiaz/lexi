class_name SettingsMenu extends CanvasLayer


signal closed()


@export var language_button_container: Container


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	for lang in Settings.LANGUAGES:
		var button = Button.new()
		button.text = lang
		button.button_pressed = lang == Settings.language_selected
		button.pressed.connect(_on_language_button_pressed.bind(lang))
		language_button_container.add_child(button)


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


## Signals


func _on_language_button_pressed(language: String) -> void:
	Settings.language_selected = language


func _on_close_button_pressed() -> void:
	closed.emit()
	queue_free()
