var Village = {
	takledToOldGuy: false,

	load: function(Q, complete) {
		Q.Sprite.extend('Sitizen', {
		    init: function (p) {
		        this._super(p, { asset: 'oldmanidle.gif', x: 1400, y: 450, jumpSpeed: -380 });
		        this.p.flip = 'x';
				this.add('2d, aiBounce');

                this.on("bump.left, bump.right, bump.bottom, bump.top", function (collision) {
                	if (collision.obj.isA("Player") && !Village.takledToOldGuy) {
                    	Game.callout('Greetings, stranger!<br /><br />This village is full of creepy people and this iseland is about to sink under the water... <br /><br />You should not have come here.', { x: 300, y: 225 });

                    	setTimeout(function() {
                    		$('#callout').hide();

                    	}, 4000);

                    	Village.takledToOldGuy = true;
                    }
                });


		    }
		});

		Q.Sprite.extend('Shaman', {
		    init: function (p) {
		        this._super(p, { asset: 'Nn_Still.gif', x: 1400, y: 450, jumpSpeed: -380 });
		        this.p.flip = 'x';
				this.add('2d, aiBounce');

                this.on("bump.left, bump.right, bump.bottom, bump.top", function (collision) {
                	if(collision.obj.isA("Player") && Village.takledToOldGuy) {
                		Cave.load(Q, function () {
                            Q.stageScene('cave2');
                        });
                	}
                	
                });


		    }
		});

		Q.Sprite.extend('Player', {
		    init: function (p) {
		        this._super(p, { asset: 'male_traveler_idle.gif', x: 500, y: 300, jumpSpeed: -380 });
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

		Q.scene('village', function (stage) {
        	var background = new Q.TileLayer({ 
				dataAsset: 'village.tmx', 
				layerIndex: 2, 
				sheet: 'village.tiles.background', 
				tileW: 32, 
				tileH: 32, 
				type: Q.SPRITE_NONE 
			});

            stage.insert(background);

            var grass = new Q.TileLayer({ 
				dataAsset: 'village.tmx', 
				layerIndex: 1, 
				sheet: 'village.tiles.terrain', 
				tileW: 32, 
				tileH: 32, 
				type: Q.SPRITE_NONE 
			});

			stage.insert(grass);

			var houses = new Q.TileLayer({ 
				dataAsset: 'village.tmx', 
				layerIndex: 3, 
				sheet: 'village.tiles.houses', 
				tileW: 32, 
				tileH: 32, 
				type: Q.SPRITE_NONE 
			});

			stage.insert(houses);

			var collision = new Q.TileLayer({
				dataAsset: 'village.tmx', 
				layerIndex: 0, 
				sheet: 'village.tiles.terrain', 
				tileW: 32, 
				tileH: 32
			});

			var player = stage.insert(new Q.Player());

			stage.add('viewport').follow(player, {
				x: true, 
				y: false
			});

			stage.insert(new Q.Sitizen({ x: 700, y: 450 }));
			stage.insert(new Q.Shaman({ x: 1400, y: 450 }));

			stage.collisionLayer(collision);
	    });

		Q.load(['village.terrain.png', 'village.house.png', 'village.tmx', 'male_traveler_idle.gif', 'oldmanidle.gif', 'Nn_Still.gif'], function () {
            Q.sheet('village.tiles.background', 'village.house.png', { tilew: 32, tileh: 32 });
            Q.sheet('village.tiles.terrain', 'village.terrain.png', { tilew: 32, tileh: 32 });
            Q.sheet('village.tiles.houses', 'village.house.png', { tilew: 32, tileh: 32 });

            complete();
        });
	}
};

