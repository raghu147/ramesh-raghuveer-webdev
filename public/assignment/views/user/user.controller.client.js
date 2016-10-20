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
            var user = UserService.findUserByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }




    }

    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.saveProfile = saveProfile;



        var userId = parseInt($routeParams.uid);

        function saveProfile() {

            UserService.updateUser(userId+"", user);

        }

        var user = UserService.findUserById(userId+"");

        if(user != null) {
            vm.user = user;
        }
    }

    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;

        function register(username, password){

            var user = {_id:getRandomNumber(),username:username, password: password};
            UserService.createUser(user);
            vm.user = user;

            $location.url("/user/" + user._id);

        }

        function getRandomNumber() {
            var randomNumber = Math.floor(Math.random() * 90000);
            if(randomNumber < 0)
                randomNumber *= -1;

            return randomNumber+"";
        }
    }
})();