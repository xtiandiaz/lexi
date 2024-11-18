class_name Game extends CanvasLayer

@export var background: ColorRect
@export var continuation_container: Container
@export var score_label: Label
@export var slate: Slate
@export var game_pad: GamePad
@export var clue_button: Button
@export var extras_container: Container

var _words: PackedStringArray
var _current_word_index: int
var _current_word: String
var _start_hint: String
var _inputable: String
var _inputable_letters: Array[String]
var _input: String:
	set(value): 
		_input = value
		slate.state = _start_hint + _input
var _clue_count_available: int:
	set(value):
		_clue_count_available = value
		clue_button.text = "💡 × {0}".format([value])
		clue_button.disabled = value <= 0
var _clue_count_used_in_current_word: int
var _score: int:
	set(value): 
		_score = maxi(0, value)
		score_label.text = "{0}".format([_score])
var _can_give_clue: bool:
	get: return _clue_count_available > 0

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var file = FileAccess.open("res://words/es.txt", FileAccess.READ)
	var content = file.get_as_text()
	_words = content.split("\n")
	
	_clue_count_available = 1
	_score = 0
	_reset()


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass

func _reset() -> void:
	background.color = Color.DARK_SLATE_GRAY
	continuation_container.visible = false
	_clue_count_used_in_current_word = 0
	
	_reset_word()
	
	game_pad.visible = true
	extras_container.visible = true
	
	$"Controls/Extras Container/Clue Button".grab_focus()


func _reset_word() -> void:
	_current_word_index = randi() % _words.size()
	_current_word = _words[_current_word_index].split(",")[0]
	
	_start_hint = _current_word.substr(0, _current_word.length() / 4)
	_inputable = _current_word.substr(_start_hint.length())
	_inputable_letters = Utils.string_to_char_array(_inputable)
	
	var game_pad_letters = _inputable_letters
	game_pad_letters.shuffle()
	game_pad.reset(game_pad_letters)
	
	_input = ""
	slate.bonus = []
	clue_button.disabled = !_can_give_clue


func _give_clue() -> void:
	var matching_input = ""
	for li in _input.length():
		if _input[li] == _inputable[li]:
			matching_input += _inputable[li]
			
	print("Matching input: ", matching_input)
	
	if matching_input == _input:
		var clue_letter_index = _input.length()
		var clue = _inputable[clue_letter_index]
		print("clue: ", clue)
		_input += clue
		game_pad.simulate_press(clue)
	else:
		var input_to_restore = _input.substr(maxi(0, matching_input.length() - 1))
		print("Input to restore: ", input_to_restore)
		_input = _inputable.substr(0, matching_input.length())
		for l in input_to_restore:
			game_pad.restore_letter_button(l)


func _recalculate_score() -> void:
	var did_not_use_clues = _clue_count_used_in_current_word == 0
	_score += maxi(0, _current_word.length() - _clue_count_used_in_current_word) * 10 \
		+ (50 if did_not_use_clues else 0)
	_clue_count_available += 1 if did_not_use_clues else 0


func _show_success() -> void:
	background.color = Color.SEA_GREEN
	
	var all_words_at_current_index = _words[_current_word_index].split(",")
	if all_words_at_current_index.size() > 1:
		slate.bonus = all_words_at_current_index.slice(1)
	
	continuation_container.visible = true
	game_pad.visible = false
	extras_container.visible = false
	continuation_container.grab_focus()
	
	$"Controls/Continuation Container/Continue Button".grab_focus()
	
	_recalculate_score()
	

func _show_game_over() -> void:
	background.color = Color.INDIAN_RED
	continuation_container.visible = true
	game_pad.visible = false
	extras_container.visible = false


func _launch_definition() -> void:
	OS.shell_open("https://dle.rae.es/{0}".format([_current_word.to_lower()]))


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


func _on_skip_button_pressed() -> void:
	_score -= _current_word.length() * 10
	_reset()


func _on_continue_button_pressed() -> void:
	_reset()


func _on_define_button_pressed() -> void:
	print("define ", _current_word)
	_launch_definition()
	

func _on_clue_button_pressed() -> void:
	if !_can_give_clue:
		return
	
	_give_clue()
	_clue_count_used_in_current_word += 1
	_clue_count_available -= 1


func _on_game_pad_input(letter: String) -> void:
	_input += letter
	
	if (_start_hint + _input) == _current_word:
		_show_success()


func _on_game_pad_keyboard_input(letter: String) -> void:
	var possible_letters = _letter_indices(letter, Utils.normalized_string(_inputable)).map(func(li): return _inputable[li])
	var remaining_letters = _remaining_letters()
	#print("remaining letters: ", remaining_letters)
	
	var target_letter_index = Utils.normalized_array(remaining_letters).find(letter)
	if target_letter_index < 0:
		return
	
	var target_letter = remaining_letters[target_letter_index]
	#print("target letter: ", target_letter)
	game_pad.simulate_press(target_letter)
	_on_game_pad_input(target_letter)
	

func _on_game_pad_delete() -> void:
	if _input.length() == 0:
		return
	var last_index = _input.length() - 1
	var letter_to_restore = _input[last_index]
	_input = _input.substr(0, last_index)
	game_pad.restore_letter_button(letter_to_restore.to_lower())
