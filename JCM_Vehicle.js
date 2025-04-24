//=============================================================================
// JCM_Vehicle.js
//=============================================================================

var Imported = Imported || {};
Imported.JCM_Vehicle = true;

var JCM = JCM || {};
JCM.Vehicle = JCM.Vehicle || {};
JCM.Vehicle.version = 1.0;

//=============================================================================
 /*:
 * @plugindesc v1.0 This plugin ensures the player's speed and frequency
 * return to default when dismounting a vehicle.
 * Additionally, it ensures vehicles assume desired speeds.
 * @author JCM
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the player's speed and frequency to 3 when they
 * dismount a vehicle.
 * Additionally, it ensures vehicles assume desired speeds.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0:
 * - Plugin baseline.
 *
 * ============================================================================
 */
//=============================================================================

(function() {
    // Ensure setFrequency method exists
    if (typeof Game_Player.prototype.setFrequency !== 'function') {
        Game_Player.prototype.setFrequency = function(frequency) {
            this._moveFrequency = frequency;
        };
    }

    var _Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
    var _Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
    var _Game_Player_updateVehicle = Game_Player.prototype.updateVehicle;
    var _Game_Player_performTransfer = Game_Player.prototype.performTransfer;

    Game_Player.prototype.getOffVehicle = function() {
        console.log("Getting off vehicle...");
        var wasInVehicle = this.isInVehicle();
        var vehicleType = this._vehicleType;

        _Game_Player_getOffVehicle.call(this);

        if (wasInVehicle && !this.isInVehicle()) {
            console.log("Successfully dismounted. Setting speed and frequency to 3.");
            this.setMoveSpeed(3);
            this.setFrequency(3);
        }
    };

    Game_Player.prototype.getOnVehicle = function() {
        console.log("Getting on vehicle...");
        var wasWalking = !this.isInVehicle();

        _Game_Player_getOnVehicle.call(this);

        if (this.isInBoat()) {
            console.log("Setting boat speed and frequency...");
            this.setMoveSpeed(Karberus.LandBoat.Speed);
            this.setFrequency(5);
        } else if (this.isInShip()) {
            console.log("Setting ship speed and frequency to 3...");
            this.setMoveSpeed(3);
            this.setFrequency(3);
        } else if (this.isInAirship()) {
            console.log("Setting airship speed and frequency...");
            this.setMoveSpeed(6);
            this.setFrequency(5);
        }
    };

    Game_Player.prototype.updateVehicle = function() {
        var wasInVehicle = this.isInVehicle();
        _Game_Player_updateVehicle.call(this);

        if (this.isInVehicle()) {
            if (this.isInBoat()) {
                console.log("Updating vehicle: setting boat speed and frequency...");
                this.setMoveSpeed(Karberus.LandBoat.Speed);
                this.setFrequency(5);
            } else if (this.isInShip()) {
                console.log("Updating vehicle: setting ship speed and frequency to 3...");
                this.setMoveSpeed(3);
                this.setFrequency(3);
            } else if (this.isInAirship()) {
                console.log("Updating vehicle: setting airship speed and frequency...");
                this.setMoveSpeed(6);
                this.setFrequency(5);
            }
        } else if (wasInVehicle && !this.isInVehicle()) {
            console.log("Updating vehicle: dismounted. Setting speed and frequency to 3...");
            this.setMoveSpeed(3);
            this.setFrequency(3);
        }
    };

    Game_Player.prototype.performTransfer = function() {
        console.log("Performing transfer...");
        var wasInVehicle = this.isInVehicle();
        _Game_Player_performTransfer.call(this);

        if (wasInVehicle && !this.isInVehicle()) {
            console.log("Transferred from vehicle. Setting speed and frequency to 3...");
            this.setMoveSpeed(3);
            this.setFrequency(3);
        }
    };
})();