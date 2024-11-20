class_name ScoreDisplay extends Container


@export var score_label: Label
@export var earned_medal_count_label: Label
@export var total_medals_label: Label


var _score: int:
	set(value): 
		_score = maxi(0, value)
		score_label.text = "{0}".format([_score])
	get: 
		return _score
		
var _earned_medal_count: int:
	set(value):
		_earned_medal_count = value
		earned_medal_count_label.text = "{0}".format([value])
	get: 
		return _earned_medal_count

var _total_medals: int:
	set(value):
		_total_medals = value
		total_medals_label.text = "{0}".format([value])
	get:
		return _total_medals


## SIGNALS


func _on_game_word_completed(word: String, clues: int) -> void:
	var no_clues = clues == 0
	_score += maxi(0, word.length() - clues) * 10 + (50 if no_clues else 0)
	
	_total_medals += 1
	if no_clues:
		_earned_medal_count += 1


func _on_game_word_skipped(word: String) -> void:
	_score -= word.length() * 10
	_total_medals += 1
