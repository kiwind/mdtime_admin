define(function(require, exports, module){
	var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var AppView = require('appview');
    var UserModule = require('user');
    var UserView = UserModule.UserView;

    var AppRouter = Backbone.Router.extend({
    	routes: {
            "login": "login",
            "index": "index"
        },

    	initialize: function(g_user){
    		// 设置全局用户
            this.g_user = g_user;
            // 初始化项目, 显示首页
            this.appView = new AppView();
            this.userView = new UserView();
            this.indexFlag = false;
    	},

    	login: function(){
            //this.loginView.show();
            alert(123);
        },

        index: function(){
            if (this.g_user && this.g_user.id != undefined) {
                this.appView.show();
                this.indexFlag = true;  // 标志已经到达主页了
            }
        }
    });

    return AppRouter;
});