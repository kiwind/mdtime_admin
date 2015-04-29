define(function(require, exports, module) {
    var $ = require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');

    var User = Backbone.Model.extend({
        urlRoot: '/getUser',
    });

    var UserView = Backbone.View.extend({
        el: "#user_info",
        username: $('#username'),

        show: function(username) {
            this.username.html(username);
            this.$el.show();
        },
    });

    module.exports = {
        "User": User,
        "UserView": UserView
    };
});