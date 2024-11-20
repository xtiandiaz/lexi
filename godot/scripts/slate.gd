class_name Slate extends Container


@export var word_label: Label
@export var synonyms_label: Label


var state: String:
	set(value): word_label.text = value
	
var bonus: PackedStringArray:
	set(value): 
		synonyms_label.text = Utils.array_to_string(value, ", ")
		synonyms_label.visible = synonyms_label.text != ""


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	synonyms_label.visible = false


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
