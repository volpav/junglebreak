var Village = {
	load: function(Q, complete) {
		Q.scene('village', function (stage) {
        	var background = new Q.TileLayer({ 
				dataAsset: 'village.tmx', 
				layerIndex: 1, 
				sheet: 'village.tiles.background', 
				tileW: 32, 
				tileH: 32, 
				type: Q.SPRITE_NONE 
			});

            stage.insert(background);

			var collision = new Q.TileLayer({ 
				dataAsset: 'village.tmx', 
				layerIndex: 0, 
				sheet: 'village.tiles.terrain', 
				tileW: 32, 
				tileH: 32 
			});

			stage.collisionLayer(collision);
	    });

		Q.load(['village.terrain.png', 'village.tmx'], function () {
            Q.sheet('village.tiles.terrain', 'village.terrain.png', { tilew: 32, tileh: 32 });
            Q.sheet('village.tiles.background', 'village.terrain.png', { tilew: 32, tileh: 32 });

            complete();
        });
	}
};