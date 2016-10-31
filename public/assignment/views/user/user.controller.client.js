(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;


        function login(username, password) {
            var promise = UserService.findUserByCredentials(username, password);

            promise
                .success( function(user) {
                console.log("response="+user);
                if(user === null) {
                    vm.error = "No such user";
                } else {
                    $location.url("/user/" + user._id);
                }

            })
                .error(function(error){
                    console.log("error "+ error);
                });

        }

    }

    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.saveProfile = saveProfile;

        var userId = parseInt($routeParams.uid);

        function saveProfile() {
            UserService.updateUser(vm.user);
        }

        var promise =  UserService.findUserById(userId+"");

        promise
            .success( function(user) {
                if(user != null) {
                    vm.user = user;
                }
            })
            .error(function(error){
                console.log("error "+ error);
            });


    }

    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;

        function register(username, password){

            var promise = UserService.findUserByUsername(username);

            promise
                .success( function(user) {

                    if(user != '0')
                    alert("User already exists! Choose a different username !");
                    else
                    {
                        doRegister(username, password);
                    }
                })
                .error(function(error){
                    console.log("error "+ error);
                });


            function doRegister()
            {
                var user = {username:username, password: password};
                var promise = UserService.createUser(user);

                promise
                    .success( function(user) {
                        vm.user = user;
                        $location.url("/user/" + user._id);
                    })
                    .error(function(error){
                        console.log("error "+ error);
                    });
            }

        }
    }
})();