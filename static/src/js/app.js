define(function(require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var AppRouter = require('router');
    var UserModule = require('user');

    var User = UserModule.User;

    var g_user = new User();
    var appRouter = new AppRouter(g_user);
    g_user.fetch({
        success: function(model, response, options){
            g_user = response;
            Backbone.history.start({pustState: true});
            console.log(typeof g_user)
            if(g_user === null) {
            	window.location.href = "login";
            } else if (appRouter.indexFlag == false){
                // 跳转到首页
                appRouter.navigate('index', {trigger: true});
            }
        },
        error:function(model, response, options){
	        //当返回格式不正确或者是非json数据时，会执行此方法
	        console.log(response); 
	    }
    }); // 获取当前用户
});