# Lexicon-Godot

Implemented with: **Godot 4.3**

Playable at: [xtiandiaz.github.io](https://xtiandiaz.github.io/lexi/godot/builds/web)

## Languages

- Español (native tongue)
- English

Feel free to try out the existing ones, and later on clone and replace the word listings to those of your preference.

Add more languages in the same manner at your own fork, and register them in code for selection within the game.

## How to play

The game will simply read your vocabulary lists, shuffle the resulting array, and ask you to guess each one at a time.

1. Arrange the word by tapping on the keypad or typing the word. The background will turn mint-colored on success.
Optionally: 
      * Take a clue <img src="http://xtiandiaz.github.io/lexicon/godot/commonalities/icons/clue.png" height="24" /> (if available) to either delete all the unmatching letters or add the next correct one as a hint, or
      * Pick the "Clueless" <img src="http://xtiandiaz.github.io/lexicon/godot/commonalities/icons/clueless.png" height="24" /> option to reveal the word.
2. At the result state, the game will reveal the synomyns (or notes) collected in the vocabulary files (separated by commas right after the main term).
3. Tap on the book/dictionary <img src="http://xtiandiaz.github.io/lexicon/godot/commonalities/icons/dictionary.png" height="24" /> button to open the definition on the browser and at the website stated in code (for instance, [RAE](https://dle.rae.es) for Español and [Cambridge Dictionary](https://dictionary.cambridge.org/dictionary/english) for English).
4. Tap on the continue <img src="http://xtiandiaz.github.io/lexicon/godot/commonalities/icons/continue.png" height="24" /> button to guess the next word.

The game keeps track of the count of words played in terms of medals <img src="http://xtiandiaz.github.io/lexicon/godot/commonalities/icons/medal.png" height="24"> which are earned by completing the words without a clue. And, calculates and marks a score based on the fully, partially and "skipped" words. 

5. Go to the settings <img src="http://xtiandiaz.github.io/lexicon/godot/commonalities/icons/gear.png" height="24" /> to switch languages.


## License

See at the root of the `main` branch.


