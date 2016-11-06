module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.get("/api/user" , findUser);
    app.get("/api/user/:userId" , findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId" , updateUser);


    function findUser(req, res)
    {
       if(req.query.username && req.query.password) {
           res.send(findUserByCredentials(req.query.username, req.query.password));
       }
       else if(req.query.username)
       {
            res.send(findUserByUsername(req.query.username));
       }
       else res.send('0');

    }

    function findUserByUsername(username) {
        for (var u in users) {
            user = users[u];
            if (user.username === username) {
                return user;
            }
        }
        return '0';
    }

    function updateUser(req, res) {


        var user = req.body;
        var userId = req.params.userId;

        for (var i = 0; i < users.length; i++) {
            if (users[i]._id === userId) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].password = user.password;
                users[i].username = user.username;
                res.send("1");
                return;
            }
        }

        res.send('0');
    }

    function deleteUser(req, res) {

        var userId = req.params.userId;
        users.forEach(function (result, index) {
            if (result["_id"] === userId) {
                users.splice(index, 1);
                res.send("1");
                return;
            }
        });
    }

    function findUserById(req, res) {

        var userId = req.params.userId;
        for (var u in users) {
            user = users[u];
            if (user._id === userId) {
                res.send(user);
                return;
            }
        }
        res.send('0');
    }

    function findUserByCredentials(username, password) {
        for (var u in users) {
            user = users[u];
            if (user.username === username
                && user.password === password) {
                return user;
            }
        }
        return '0';
    }

    function createUser(req, res) {

        var user = req.body;
        if (isNotEmpty(user.username) &&
            isNotEmpty(user.password))
            user._id = new Date().getTime().toString();
            users.push(user);
            res.send(user);
    }

    function isNotEmpty(val) {
        return !( val === null || val === "" || val === undefined );
    }
};