/*:
 * @target MZ
 * @author snailbaron
 * @plugindesc Set switches for debugging

 * @param Switches
 * @text Switches
 * @desc Switches to set for debugging
 * @default []
 * @type string[]

 * @help
 * Set certain switches before starting the game. Works only when you select
*/

(function() {
    "use strict";

    var parameters = PluginManager.parameters("SNBR_DebugSwitches");

    console.log(`switch names before parsing: '${parameters["Switches"]}'`);
    var switchNames = JsonEx.parse(parameters["Switches"]);
    console.log(`switchNames = "${switchNames}"`);

    var _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);
        for (var switchName of switchNames) {
            var switchIndex = $dataSystem.switches.indexOf(switchName);
            if (switchIndex == -1) {
                throw new Error(`SNBR_DebugSwitches: no switch named "${switchName}"`);
            }
            console.log(`setting switch "${switchName}" with index ${switchIndex}`)
            $gameSwitches.setValue(switchIndex, true);
        }
    }
})();