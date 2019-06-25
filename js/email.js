let subjectEl = document.getElementById('subject')
let messageEl = document.getElementById('message')
let emailEl = document.getElementById('email')
let alertEl = document.getElementById('alert')
let alertHeader = alertEl.getElementsByClassName("form__alert_header")[0]
let alertMessage = alertEl.getElementsByClassName("form__alert_message")[0]

function submitForm() {
    let subject = subjectEl.value
    let message = messageEl.value
    let email = emailEl.value

    if (subject == "" || message == "" || email == "") {
        showAlert("Заполните все поля", "error", 3000)
        return;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(xhttp.response);
            console.log(response.success)
            if (response.success) {
                showAlert("Сообщение успешно отправлено", "success", 3000)
            } else {
                showAlert("Ошибка при отправке сообщения", "error", 3000)
            }
        }

    }
    xhttp.open("POST", "http://localhost:8081/email", true)
    xhttp.setRequestHeader("content-type", "application/json")
    let data = {};
    data.email = email;
    data.text = message;
    data.subject = subject;
    let json = JSON.stringify(data);
    xhttp.send(json)
}

function showAlert(message, type, millis) {
    let cssClass = "";
    switch (type) {
        case "error": {
            alertHeader.textContent = "Ошибка"
            cssClass = "form__alert_error"
            break
        }
        case "success": {
            alertHeader.textContent = "Успех"
            cssClass = "form__alert_success"
            break
        }
    }
    alertMessage.innerText = message
    alertEl.classList.add(cssClass)
    setTimeout(() => {
        alertEl.classList.remove(cssClass)
    }, millis)
}