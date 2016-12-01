"use strict";
this.users = [];

var User = function () {
    this.users = [
        {id: 1, user_name: 'user1'},
        {id: 2, user_name: 'user2'},
        {id: 3, user_name: 'user3'},
        {id: 4, user_name: 'user4'}];
}

User.prototype.list = function () {
    return this.users;
}

User.prototype.find = function (id) {
    if (!id)
        return null;

    var users = this.list();
    var user = null;
    for (var i in users) {
        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }

    return user;
}

User.prototype.findBySocket = function (socketId) {
    if (!socketId)
        return null;

    var users = this.list();
    var user = null;
    for (var i in users) {
        if (users[i].socket == socketId) {
            user = users[i];
            break;
        }
    }

    return user;
}

User.prototype.findByUsername = function (username, password) {
    if (!username || !password)
        return null;

    var users = this.list();
    var user = null;
    
    for (var i in users) {
        if (users[i].user_name == username && '123456' == password) {
            user = users[i];
            break;
        }
    }

    return user;
}

User.prototype.save = function (id, user) {
    if (!user)
        return null;

    var users = this.list();
    var self = this;

    for (var i in users) {
        if (users[i].id == id) {
            users[i] = user;
            self.users = users;
            break;
        }
    }

    return user;
}

module.exports = User;
