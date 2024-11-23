class_name Keypad extends Container


signal input(letter: String)
signal keyboard_input(letter: String)
signal delete()


@export var letter_container: Container
@export var delete_button: Button


var _letter_buttons: Array[LetterButton] = []
var _pressed_buttons: Array[LetterButton]:
	get: return _letter_buttons.filter(func(b): return b.disabled)
var _unpressed_buttons: Array[LetterButton]:
	get: return _letter_buttons.filter(func(b): return !b.disabled)


func reset(letters: Array[String]) -> void:	
	_letter_buttons.map(func(button): button.queue_free())
	_letter_buttons.clear()
	_letter_buttons.assign(
		letters.map(func(letter): return LetterButton.instantiate(letter))
	)
	for i in _letter_buttons.size():
		var button = _letter_buttons[i]
		button.pressed.connect(_on_letter_button_pressed.bind(button))
		letter_container.add_child(button)
		
	_reset_delete_button()


func restore_letter_button(letter: String) -> void:
	var presses = _pressed_buttons
	presses.reverse()
	
	var button_index = _find_first_button_index(letter, presses)
	if button_index >= 0:
		Utils.set_button_enabled(presses[button_index], true)
		presses.remove_at(button_index)
		
	_reset_delete_button()


func simulate_press(letter: String) -> void:
	var unpressed_btns = _unpressed_buttons
	var button_index = _find_first_button_index(letter, unpressed_btns)
	if button_index >= 0:
		Utils.set_button_enabled(unpressed_btns[button_index], false)
	
	_reset_delete_button()


func _reset_delete_button() -> void:
	delete_button.visible = _pressed_buttons.size() > 0


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	_reset_delete_button()


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _input(event) -> void:
	if !visible:
		return
	
	if not event.is_pressed() or event is not InputEventKey:
		return
		
	if event.keycode == KEY_BACKSPACE:
		_on_delete_button_pressed()
		return
	
	var letter = char(event.unicode)
	#print(letter)
	if letter.length() == 0:
		return
	
	var button_index = _find_first_button_index(letter, _unpressed_buttons, true)
	if  button_index != -1:
		keyboard_input.emit(letter)


func _find_first_button_index(
	letter: String, 
	buttons: Array[LetterButton], 
	should_normalize_letters: bool = false
	) -> int:
	if should_normalize_letters:
		letter = Utils.normalized_string(letter)
	
	for i in buttons.size():
		var button_letter = buttons[i].letter if !should_normalize_letters else Utils.normalized_string(buttons[i].letter)
		if button_letter == letter:
			return i
	
	return -1
	

## SIGNALS


func _on_letter_button_pressed(button: LetterButton) -> void:
	if _pressed_buttons.has(button):
		return
	
	Utils.set_button_enabled(button, false)
	_reset_delete_button()
	
	input.emit(button.letter)


func _on_delete_button_pressed() -> void:
	if _pressed_buttons.size() == 0:	
		return
	
	delete.emit()
