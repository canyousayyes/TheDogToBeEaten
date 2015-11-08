//=============================================================================
// SkipTitleScreen.js
//=============================================================================

/*:
 * @plugindesc Skip the title screen and starts a new game immediately.
 * @author Gene Ng
 *
 * @param Fade In Mode
 * @desc How to fade in the game map. Default is 0 (None).
 * 0: None, 1: Black, 2: White
 * @default 0
 *
 * @param Fade In Speed
 * @desc Length (in frames) of the fade in animation. Default is 60.
 * @default 60
 *
 * @help
 *
 * Plugin Command:
 *   StartNewGame    # Start a new game and go to initial map scene immediately
 *
 */

(function() {
    var /* Constants */
        FADE_IN_MODE = { NONE: 0, BLACK: 1, WHITE: 2 },
        /* Variables */
        _Scene_Boot_start = Scene_Boot.prototype.start,
        _Scene_Map_start = Scene_Map.prototype.start,
        _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand,
        triggerFadeIn = false,
        /* User defined parameters */
        parameters = PluginManager.parameters('SkipTitleScreen'),
        fadeInMode = (Number(parameters['Fade In Mode'])).clamp(0, 2),
        fadeInSpeed = (Number(parameters['Fade In Speed'])).clamp(0, Infinity);

    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);
        if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {
            DataManager.setupNewGame();
            triggerFadeIn = true;
            SceneManager.goto(Scene_Map);
        }
    };

    Scene_Map.prototype.start = function () {
        _Scene_Map_start.call(this);
        if (triggerFadeIn) {
            triggerFadeIn = false;
            if (fadeInMode === FADE_IN_MODE.BLACK) {
                this.startFadeIn(fadeInSpeed, false);
            } else if (fadeInMode === FADE_IN_MODE.WHITE) {
                this.startFadeIn(fadeInSpeed, true);
            }
        }
    };

    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'StartNewGame') {
            SceneManager.goto(Scene_Boot);
        }
    };
})();
