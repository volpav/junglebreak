var Jungle = {
    load: function (Q, complete) {

        // load assets
        Q.load(["jungle_tile_set.png", "male_traveler_idle.gif", "waspidle.gif", "girlidle.gif", "jungle3.tmx"], function () {
            Q.sheet("jungle_tiles", "jungle_tile_set.png", { tilew: 32, tileh: 32 });
            complete();
        });

        // set stage
        Q.scene("jungle", function (stage) {
            var background = new Q.TileLayer({ dataAsset: "jungle3.tmx", layerIndex: 0, sheet: "jungle_tiles", tileW: 32, tileH: 32 });
            stage.insert(background);

            var collision = new Q.TileLayer({ dataAsset: "jungle3.tmx", layerIndex: 1, sheet: 'jungle_tiles', tileW: 32, tileH: 32 });
            stage.collisionLayer(collision);

            var player = stage.insert(new Q.Player());
            stage.add("viewport").follow(player, { x: true, y: true }, { minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h });

            var waspEnemy1 = new Q.Wasp({ x: 700, y: 18 * 32, rangeY: 40, asset: 'waspidle.gif' });
            stage.insert(waspEnemy1);

            var waspEnemy2 = new Q.Wasp({ x: 1600, y: 10 * 32, rangeY: 100, asset: 'waspidle.gif' });
            stage.insert(waspEnemy2);

            var girl = new Q.Girl({ x: 32 * 97, y: 10 * 32 });
            stage.insert(girl);
        });

        // cerate a player
        Q.Sprite.extend("Player", {
            init: function (p) {
                var topDistance = 20 * 32 - 3 * 32;
                this._super(p, { asset: "male_traveler_idle.gif", x: 110, y: topDistance, jumpSpeed: -380 });
                this.add('2d, platformerControls');
            },
            step: function (dt) {
                if (Q.inputs['left'] && this.p.direction == 'right') {
                    this.p.flip = 'x';
                }
                if (Q.inputs['right'] && this.p.direction == 'left') {
                    this.p.flip = false;
                }
            }
        });

        Q.Sprite.extend("Girl", {
            init: function (p) {
                var topDistance = 20 * 32 - 3 * 32;
                this._super(p, { asset: "girlidle.gif", x: 110, y: topDistance, jumpSpeed: -380 });
                this.add('2d');
                this.p.flip = 'x';

                this.on("bump.left,bump.right,bump.bottom", function (collision) {
                    if (collision.obj.isA("Player")) {
                        Q.stageScene("winGame");
                    }
                });
            }
        });

        // create an enemy
        Q.Sprite.extend("Wasp", {
            init: function (p) {
                this._super(p, { asset: 'waspidle.gif', vy: -100, rangeY: 100, gravity: 0 });
                this.add('2d');

                this.p.initialY = this.p.y;

                this.on("bump.left,bump.right,bump.bottom", function (collision) {
                    if (collision.obj.isA("Player")) {
                        Q.stageScene("endGame", 1, { label: "Game Over!" });
                        collision.obj.destroy();
                    }
                });
                this.on("bump.top", function (collision) {
                    if (collision.obj.isA("Player")) {
                        collision.obj.p.vy -= 100;
                        this.destroy();
                    }
                });
            },
            step: function (dt) {
                if (this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
                    this.p.vy = -this.p.vy;
                } else if (-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
                    this.p.vy = -this.p.vy;
                }
            }
        });

        Q.scene("endGame", function (stage) {
            alert("Game Over!");
            window.location = "";
        });

        Q.scene("winGame", function (stage) {
            alert("You got the girl! You Won!");
        });
    }
}