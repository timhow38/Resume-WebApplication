// Create a request variable and assign a new XMLHttpRequest object to it.
var requestApiGitRepos = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
requestApiGitRepos.open('GET', 'https://api.github.com/users/timhow38/repos', true)

requestApiGitRepos.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    var statusHTML = '';
    $.each(data, function(i, status) {
        statusHTML += '<tr>';
        statusHTML += '<td>' + status.id + '</td>';
        statusHTML += '<td>' + status.name + '</td>';
        statusHTML += '<td>' + status.html_url + '</td>';
        statusHTML += '<td>' + status.language + '</td>';
        statusHTML += '</tr>';



    });
    $('tbody').html(statusHTML);
}

// Send request
requestApiGitRepos.send();