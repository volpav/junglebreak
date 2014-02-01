var Game = {
    healthChange: function (player, change) {

        var newHealth = jQuery(".health").width() + change;

        if (newHealth > 300) {
            newHealth = 300;
        }

        jQuery(".health").width(newHealth);

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

    callout: function (text, position) {
        var q = $('#quintus_container').offset();

        $('#callout .text').html(text);

        $('#callout').css({ 
            left: q.left + position.x + 'px',
            top: q.top + position.y + 'px'
        }).show();
    }
};
