class_name Slate extends Container


@export var word_label: Label
@export var notes_label: Label


var _input_prefix: String
	

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
	

func _show_result(word: String, synonyms: PackedStringArray) -> void:
	word_label.text = word
	notes_label.text = StringArray_.from_packed_array(synonyms).stringified(", ")

## Signals


func _on_lexicon_word_started(start_chunk: String) -> void:
	_input_prefix = start_chunk
	word_label.text = _input_prefix
	notes_label.text = ""
	

func _on_lexicon_word_input(input: String) -> void:
	word_label.text = _input_prefix + input
	

func _on_lexicon_word_completed(word: String, clue_count: int, synonyms: PackedStringArray) -> void:	
	_show_result(word, synonyms)


func _on_lexicon_word_skipped(word: String, synonyms: PackedStringArray) -> void:
	_show_result(word, synonyms)
