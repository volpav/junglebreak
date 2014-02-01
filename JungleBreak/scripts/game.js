var Game = {
    healthChange: function (player, change) {
        jQuery(".health").width(jQuery(".health").width() + change);

        if (jQuery(".health").width() == 0) {
            Q.stageScene("endGame", 1, { label: "You Died" });
            player.destroy();
        }
    },


    karmaChange: function (change) {
        jQuery(".karma").width(jQuery(".karma").width() + change);
    },

    message: function (text) {
        jQuery(".message").html(text);
    },
};