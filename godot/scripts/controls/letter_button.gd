class_name LetterButton extends Button


var letter: String:
	get: return text


static func instantiate(letter: String) -> LetterButton:
	var instance = load("res://scenes/controls/letter_button.tscn").instantiate()
	instance.text = letter
	return instance


func _ready() -> void:
	pass # Replace welements_normalizedh function body.


func _process(delta: float) -> void:
	pass
