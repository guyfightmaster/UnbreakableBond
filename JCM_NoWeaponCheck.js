/*:
 * @plugindesc Adds a method to check if a battler has no weapons equipped.
 * @help This plugin adds a method to the Game_Battler class to check if the
 * battler has no weapons equipped.
 */

(function() {
    Game_Battler.prototype.hasNoWeapons = function() {
        if (this.isActor()) {
            // Check if the actor has no weapons equipped
            return this.weapons().length === 0;
        } else if (this.isEnemy()) {
            // Enemies do not have weapons, so return true
            return true;
        }
        return false; // Fallback (should not be reached)
    };
})();