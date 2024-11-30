class_name Background extends Control


@export var colorground: ColorRect


var color: Color:
	set(value): colorground.color = value


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	color = Color_.DARK_GRAY_COLOR


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
