(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function findUserByUsername(username) {
            for (var u in users) {
                user = users[u];
                if (user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {

            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].password = user.password;
                    users[i].username = user.username;
                }
            }
        }

        function deleteUser(userId) {

            users.forEach(function (result, index) {
                if (result["_id"] === userId) {
                    users.splice(index, 1);
                    return;
                }
            });
        }

        function findUserById(userId) {

            for (var u in users) {
                user = users[u];
                if (user._id === userId) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                user = users[u];
                if (user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function createUser(user) {

            if (isNotEmpty(user.username) &&
                isNotEmpty(user.password) &&
                isNotEmpty(user._id))
                users.push(user);
        }

        function isNotEmpty(val) {
            return !( val === null || val === "" || val === undefined );
        }

    }
})();