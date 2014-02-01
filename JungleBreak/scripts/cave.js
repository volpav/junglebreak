var Cave = {
    load: function (Q, complete) {
        var _stage;

        // set stage
        Q.scene("cave2", function (stage) {
            var background = new Q.TileLayer({ dataAsset: "cave2.tmx", layerIndex: 0, sheet: "tiles", tileW: 32, tileH: 32, type: Q.SPRITE_NONE });
            stage.insert(background);

            var collision = new Q.TileLayer({ dataAsset: "cave2.tmx", layerIndex: 1, sheet: 'tiles', tileW: 32, tileH: 32 });
            stage.collisionLayer(collision);

            var player = stage.insert(new Q.Player());
            stage.add("viewport").follow(player, { x: true, y: true }, { minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h });

            stage.insert(new Q.Frog({ x: 200, y: 350 }));
            stage.insert(new Q.Frog({ x: 300, y: 350 }));
            stage.insert(new Q.Frog({ x: 400, y: 350 }));
            stage.insert(new Q.Native({ x: 800, y: 350 }));
            stage.insert(new Q.Door({ x: 470, y: 150 }));

            stage.insert(new Q.Frog({ x: 930, y: 20 }));
            stage.insert(new Q.Frog({ x: 1020, y: 20 }));
            stage.insert(new Q.Frog({ x: 1050, y: 20 }));

            _stage = stage;
        });

        //player
        Q.Sprite.extend("Player", {
            init: function (p) {
                this._super(p, { asset: "male_traveler_idle.gif", x: 110, y: 350, jumpSpeed: -380 });
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


        Q.Sprite.extend("Door", {
            init: function (p) {
                this._super(p, { asset: "frog_idle.gif", x: 210, y: 50, jumpSpeed: -380 });
                this.add('2d, aiBounce');

                this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
                    if (collision.obj.isA("Player")) {
                        collision.obj.p.vy = -850;
                    }
                });
            }
        });


        Q.Sprite.extend("Frog", {
            init: function (p) {
                this._super(p, { asset: "frog_idle.gif", x: 210, y: 50, jumpSpeed: -380 });
                this.add('2d, aiBounce');

                this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
                    if (collision.obj.isA("Player")) {
                        Game.message("You've eaten a frog");
                        Game.healthChange(collision.obj, 50);
                        this.destroy();
                    }
                });
            }
        });

        Q.Sprite.extend("Tiger", {
            init: function (p) {
                this._super(p, { asset: "castledoors_0.png", x: 210, y: 50, jumpSpeed: -380 });
                this.add('2d, aiBounce');

                this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
                    if (collision.obj.isA("Player")) {

                        Village.load(Q, function () {
                            Q.stageScene('village');
                        });
                        //Q.stageScene("endGame", 1, { label: "You Won!" });
                        //this.destroy();
                    }
                });
            }
        });

        Q.Sprite.extend("Enemy", {
            init: function (p) {
                this._super(p, { asset: "tiger.png", x: 210, y: 50, jumpSpeed: -380, vx: 100 });
                this.add('2d, aiBounce');

                this.on("bump.left,bump.right,bump.bottom", function (collision) {
                    if (collision.obj.isA("Player")) {
                        Game.healthChange(collision.obj, -25);
                        //Q.stageScene("endGame", 1, { label: "You Died" });
                        //collision.obj.destroy();
                        collision.obj.p.vy = -300;
                    }
                });

                this.on("bump.top", function (collision) {
                    if (collision.obj.isA("Player")) {
                        this.destroy();
                        collision.obj.p.vy = -300;
                    }
                });
            }
        });

        Q.Sprite.extend("Native", {
            init: function (p) {
                this._super(p, { asset: "Nn_still.gif", x: 50, y: 50, jumpSpeed: -380 });
                this.add('2d, aiBounce');

                this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
                    if (collision.obj.isA("Player")) {
                        Game.message("You've met a shaman. He takes your karma but shows you the way out. Just try to reach the door.");
                        Game.karmaChange(-50);
                        _stage.insert(new Q.Tiger({ x: 600, y: 150 }));
                        _stage.insert(new Q.Door({ x: 50, y: 350 }));

                        _stage.insert(new Q.Enemy({ x: 100, y: 350 }));
                        _stage.insert(new Q.Enemy({ x: 200, y: 350 }));
                        _stage.insert(new Q.Enemy({ x: 350, y: 350 }));

                        this.destroy();
                    }
                });
            }
        });

        Q.scene("endGame", function (stage) {
            alert("Game Over!");
            window.location = "";
        });

        // load assets
        Q.load("bw5.gif, male_traveler_idle.gif, cave2.tmx, frog_idle.gif, Nn_still.gif, tiger.png, castledoors_0.png", function () {
            Q.sheet("tiles", "bw5.gif", { tilew: 32, tileh: 32 });
            Q.stageScene("cave2");
        });
    }
};