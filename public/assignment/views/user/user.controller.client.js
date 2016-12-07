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
            //var promise = UserService.findUserByCredentials(username, password);
            var promise = UserService.login(username, password);

            promise
                .success( function(user) {
                if(user) {

                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "No such user";
                }

            })
                .error(function(error){
                    console.log("error "+ error);
                });

        }

    }

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;

        vm.saveProfile = saveProfile;
        vm.logout = logout;

        //var userId = $routeParams.uid;

        function saveProfile() {
            UserService.updateUser(vm.user);
        }

        var promise =  UserService.findCurrentUser();

        promise
            .success( function(user) {
                if(user) {
                    vm.user = user;
                }
            })
            .error(function(error){
                console.log("error "+ error);
            });

        function logout() {
            UserService.logout()
                .success(function () {
                      $location.url("/login");
                });


        }


    }

    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;

        function register(username, password){

            var user  = {username: username, password: password};
            var promise = UserService.register(user);
            promise
                .success(
                    function(user) {

                        if(user == "0") {
                            alert("User already exists! Choose a different username !");
                        }
                        else {
                            //$rootScope.currentUser = user;
                            $location.url("/user/"+user._id);
                        }
                    })
                .error(function(error){
                    console.log("error "+ error);
                });
        }
    }
})();