$(function() {
    // Placeholder for jQuery ready function if needed
});

function formValidation() {
    // Get the HTML elements
    var userId = GetUserID();
    var txtname = document.getElementById("signup-name").value;
    if (!txtname) {
        alert('Please enter name!');
        return false;
    }
    var email = document.getElementById("signup-email").value;
    if (!email) {
        alert('Please enter email!');
        return false;
    }
    var emailfilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailfilter.test(email)) {
        alert('Please enter a valid email address!');
        return false;
    }

    var userObj = {
        "id": userId,
        "name": txtname,
        "email": email
    };

    addUserDataToLocalStorage(userObj);
    // Clear the form fields
    document.getElementById('signup-name').value = "";
    document.getElementById('signup-email').value = "";
    
    // Redirect to the membership.html
    window.location.href = 'membership.html';
    return false;
}

function GetUserID() {
    const ID = Date.now();
    return ID;
}

function addUserDataToLocalStorage(userObj) {
    var users = JSON.parse(localStorage.getItem('userData')) || [];
    users.push(userObj);
    localStorage.setItem('userData', JSON.stringify(users));
}
$(function() {
    loadUsers();
});

function loadUsers() {
    var users = JSON.parse(localStorage.getItem('userData')) || [];
    var tableBody = $('#userTable');
    tableBody.empty();
    users.forEach(function(user) {
        var row = '<tr>';
        row += '<td>' + user.id + '</td>';
        row += '<td>' + user.name + '</td>';
        row += '<td>' + user.email + '</td>';
        row += '<td><button onclick="editUser(' + user.id + ')" class="btn btn-primary btn-edit">Edit</button> ';
        row += '<button onclick="deleteUser(' + user.id + ')" class="btn btn-danger btn-delete">Delete</button></td>';
        row += '</tr>';
        tableBody.append(row);
    });
}

function saveUser() {
    var userId = GetUserID();
    var userName = $('#username').val();
    var userEmail = $('#email').val();
    var userObj = {
        "id": userId,
        "name": userName,
        "email": userEmail
    };

    addUserDataToLocalStorage(userObj);
    loadUsers();
    clearForm();
}

function editUser(userId) {
    var users = JSON.parse(localStorage.getItem('userData')) || [];
    var user = users.find(u => u.id === userId);
    if (user) {
        $('#userId').val(user.id);
        $('#username').val(user.name);
        $('#email').val(user.email);
        $('#btn-add').hide();
        $('#btn-update').show();
    }
}

function updateUser() {
    var userId = parseInt($('#userId').val());
    var userName = $('#username').val();
    var userEmail = $('#email').val();

    var users = JSON.parse(localStorage.getItem('userData')) || [];
    var userIndex = users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        users[userIndex].name = userName;
        users[userIndex].email = userEmail;
        localStorage.setItem('userData', JSON.stringify(users));
        loadUsers();
        clearForm();
        $('#btn-add').show();
        $('#btn-update').hide();
    }
}

function deleteUser(userId) {
    var users = JSON.parse(localStorage.getItem('userData')) || [];
    var updatedUsers = users.filter(u => u.id !== userId);
    localStorage.setItem('userData', JSON.stringify(updatedUsers));
    loadUsers();
}

function clearForm() {
    $('#userId').val('');
    $('#username').val('');
    $('#email').val('');
}

function GetUserID() {
    return Date.now();
}
