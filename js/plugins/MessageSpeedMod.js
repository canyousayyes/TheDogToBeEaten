//=============================================================================
// MessageSpeedMod.js
//=============================================================================

/*:
 * @plugindesc Adjust text showing speed in message window.
 * @author Gene Ng
 *
 * @help
 *
 * Plugin Command:
 *   MessageSpeed 6     # Wait 6 frames (0.1 second) after each character is displayed.
 *
 */

(function() {
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand,
        _Window_Message_updateMessage = Window_Message.prototype.updateMessage,
        _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast,
        characterWait = 0;

    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'MessageSpeed') {
            var newCharacterWait = Number(args[0]);
            if (isNaN(newCharacterWait)) {
                characterWait = 0;
            } else {
                characterWait = newCharacterWait.clamp(0, Infinity);
            }
        }
    };

    Window_Message.prototype.updateMessage = function () {
        var result = _Window_Message_updateMessage.call(this);
        if ((this._waitCount === 0) && (characterWait > 0)) {
            this.startWait(characterWait);
        }
        return result;
    };

    Window_Message.prototype.updateShowFast = function () {
        _Window_Message_updateShowFast.call(this);
        if (Input.isPressed('cancel')) {
            this._showFast = true;
        }
    };
})();
