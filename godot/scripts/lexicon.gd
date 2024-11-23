class_name Lexicon extends CanvasLayer


signal word_started(start_chunk: String)
signal word_input(input: String)
signal word_completed(word: String, clue_count: int, synonyms: PackedStringArray)
signal word_skipped(word: String, synonyms: PackedStringArray)


@export var keypad: Keypad
@export var background: Background
@export var continuation_container: Container
@export var footer: Container
@export var clue_button: Button
@export var continue_button: Button


var _words: PackedStringArray
var _current_word_index: int
var _current_word: String
var _current_word_synonyms: PackedStringArray:
	get:
		var all_words_at_current_index = _words[_current_word_index].split(",")
		return all_words_at_current_index.slice(1) if all_words_at_current_index.size() > 1 else []

var _start_hint: String
var _inputable: String
var _inputable_letters: Array[String]
var _input: String:
	set(value): 
		_input = value
		word_input.emit(value)

var _clue_count_available: int:
	set(value):
		_clue_count_available = value
		clue_button.text = "×{0}".format([value])
		Utils.set_button_enabled(clue_button, value > 0)
var _clue_count_used_in_current_word: int
var _can_give_clue: bool:
	get: return _clue_count_available > 0


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	Settings.language_change.connect(_on_language_changed)
	_load_language_and_reset(Settings.language_selected)


func _load_language_and_reset(language_code: String) -> void:
	var file = FileAccess.open(
		"res://words/{0}.txt".format([language_code]), 
		FileAccess.READ
	)
	var content = file.get_as_text()
	
	_words = content.split("\n")
	_clue_count_available = 1
	
	_reset()


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass


func _reset() -> void:
	background.color = Cosmetics.DARK_GRAY_COLOR
	continuation_container.visible = false
	_clue_count_used_in_current_word = 0
	
	_reset_word()
	
	keypad.visible = true
	footer.visible = true
	
	clue_button.grab_focus()


func _reset_word() -> void:
	_current_word_index = randi() % _words.size()
	_current_word = _words[_current_word_index].split(",")[0]
	
	_start_hint = _current_word.substr(0, _current_word.length() / 4)
	_inputable = _current_word.substr(_start_hint.length())
	_inputable_letters = Utils.string_to_char_array(_inputable)
	
	var keypad_letters = _inputable_letters
	keypad_letters.shuffle()
	keypad.reset(keypad_letters)
	
	word_started.emit(_start_hint)
	
	_input = ""
	
	Utils.set_button_enabled(clue_button, _can_give_clue)


func _give_clue() -> void:
	var matching_input = ""
	for li in _input.length():
		if _input[li] != _inputable[li]:
			break
		matching_input += _inputable[li]
			
	print("Matching input: ", matching_input)
	
	if matching_input == _input:
		var clue_letter_index = _input.length()
		var clue = _inputable[clue_letter_index]
		print("clue: ", clue)
		_input += clue
		keypad.simulate_press(clue)
	else:
		var input_to_restore = _input.substr(maxi(0, matching_input.length()))
		print("Input to restore: ", input_to_restore)
		_input = _inputable.substr(0, matching_input.length())
		for l in input_to_restore:
			keypad.restore_letter_button(l)


func _show_success() -> void:
	background.color = Cosmetics.MINT_COLOR
	
	word_completed.emit(
		_current_word, 
		_clue_count_used_in_current_word,
		_current_word_synonyms
	)
	
	_clue_count_available += 1 if _clue_count_used_in_current_word == 0 else 0
	
	_on_result_shown()
	

func _reveal_solution() -> void:
	background.color = Cosmetics.ORANGE_COLOR
	
	word_skipped.emit(_current_word, _current_word_synonyms)
	
	_on_result_shown()


func _on_result_shown() -> void:	
	continuation_container.visible = true
	keypad.visible = false
	footer.visible = false
	
	continue_button.grab_focus()


func _letter_indices(letter: String, string: String) -> Array[int]:
	var indices: Array[int] = []
	for li in string.length():
		if string[li] == letter:
			indices.append(li)
	return indices
	
	
func _remaining_letters() -> Array[String]:
	var input = Utils.string_to_char_array(_input)
	if input.size() == 0:
		return []
	
	var remaining: Array[String] = []
	for li in _inputable.length():
		var letter = _inputable[li]
		var input_index = input.find(letter)
		if input_index != -1:
			input.remove_at(input_index)
		else:
			remaining.append(letter)
	
	return remaining
	

## SIGNALS


func _on_language_changed(code: String) -> void:
	_load_language_and_reset(code)


func _on_clueless_button_pressed() -> void:
	word_skipped.emit(_current_word, _current_word_synonyms)
	_reveal_solution()


func _on_continue_button_pressed() -> void:
	_reset()


func _on_define_button_pressed() -> void:
	print("Define: ", _current_word)
	OS.shell_open("{0}/{1}".format([Settings.dictionary_url, _current_word.to_lower()]))
	

func _on_clue_button_pressed() -> void:
	if !_can_give_clue:
		return
	
	_give_clue()
	_clue_count_used_in_current_word += 1
	_clue_count_available -= 1


func _on_keypad_input(letter: String) -> void:
	_input += letter
	
	if (_start_hint + _input) == _current_word:
		_show_success()


func _on_keypad_keyboard_input(letter: String) -> void:
	var possible_letters = _letter_indices(letter, Utils.normalized_string(_inputable)).map(func(li): return _inputable[li])
	var remaining_letters = _remaining_letters()
	#print("remaining letters: ", remaining_letters)
	
	var target_letter_index = Utils.normalized_array(remaining_letters).find(letter)
	if target_letter_index < 0:
		return
	
	var target_letter = remaining_letters[target_letter_index]
	#print("target letter: ", target_letter)
	keypad.simulate_press(target_letter)
	_on_keypad_input(target_letter)
	

func _on_keypad_delete() -> void:
	if _input.length() == 0:
		return
	
	var last_index = _input.length() - 1
	var letter_to_restore = _input[last_index]
	_input = _input.substr(0, last_index)
	keypad.restore_letter_button(letter_to_restore.to_lower())


func _on_settings_button_pressed() -> void:
	var settings_menu = load("res://scenes/menus/settings_menu.tscn").instantiate()
	add_child(settings_menu)
