define(function(require, exports, module) {
    var $ = require('jquery');
    
    var Login = function(){
        var _form = $("#login").find("form"),
            _userName = $("#userName"),
            _pwd = $("#pwd"),
            _btnSubmit = $("#btnSubmit"),
            _loginErr = $("#loginErr"),
            _timer = null,
            _loginFlag = true;

        _btnSubmit.off().on("click",function(){
            validate();
        });

        $(document).on("keydown",function(e){
            if(e.keyCode == 13)
            {
                validate();
            }
        });

        function validate(){
            if(!_loginFlag) return;
            if(_userName.val() == '')
            {
                _loginErr.text("用户名不能为空!");
                _userName.focus();
                return;
            }
            else if(_pwd.val() == '')
            {
                _pwd.text("密码不能为空!");
                _pwd.focus();
                return;
            }
            else
            {
                _loginFlag = false;
                _form.submit();
            }
        }
    };

    $(function(){
        Login();
    });
});