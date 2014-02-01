var Village = {
	load: function(Q, complete) {
		Q.scene('village', function (stage) {
			var background = new Q.TileLayer({ 
				dataAsset: "village.tmx", 
				layerIndex: 1, 
				sheet: 'village.tiles', 
				tileW: 32, 
				tileH: 32, 
				type: Q.SPRITE_NONE 
			});

            stage.insert(background);

            //var collision = new Q.TileLayer({ dataAsset: "cave.tmx", layerIndex: 1, sheet: 'tiles', tileW: 24, tileH: 24 });
            //stage.collisionLayer(collision);
        });

        Q.load('village.house.png, village.terrain.png', function () {
            Q.sheet('village.tiles', 'village.terrain.png', { tilew: 32, tileh: 32 });

            complete();
        });
	}
};