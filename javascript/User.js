function emailTest (email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

async function myFunction() {

    var email = document.getElementById("email").value;

    document.getElementById("error-box").innerHTML = null;

    var message = await run(email);
}

function showMessage(message, type) {
    document.getElementById("error-box").innerHTML = '<p class="alert alert-' + type +'">'+message+'</p>';
}

async function run(email) {
    if (email.length === 0) {
        return showMessage('Email Required', 'danger');
    }

    var emailTestResult = emailTest(email);
    var hash = md5(email.trim().toLowerCase());

    if (!emailTestResult) {
        return showMessage('Email invalid', 'danger');
    }

    if (document.getElementById(hash)) {
        return showMessage('You have already searched this email.', 'warning');
    }

    var url = "https://secure.gravatar.com/avatar/"+ hash + "?s=200";
    var account = "https://en.gravatar.com/"+ email + ".json";
        
    var request = await fetch(account);

    if (!request.ok) {
        return showMessage('Gravatar account not found', 'danger');
    }

    var $imgs = $("<img src="+ url +" alt='Gravatar img' class='Gravatar-img' id=" + hash +">");

    $("#display").append($imgs);
}

// var account = "https://en.gravatar.com/"+ email + ".json";

//     console.log(url);

//     var request = new XMLHttpRequest();
//     request.open('GET', account, true);
//     request.onload = function () {

//     var data = JSON.parse(this.response);
//     if (request.status >= 200 && request.status < 400) {
//         console.log(data);
//     } else {
//         const errorMessage = document.createElement('marquee');
//         errorMessage.textContent = `Gah, it's not working!`;
//         app.appendChild(errorMessage);
//     }
//     };
//     request.send();

