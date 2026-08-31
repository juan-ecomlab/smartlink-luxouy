const $ = id => document.getElementById(id);
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const agregarEmail = async (email, client) => {
    const item = {
        email,
        client
    }

    const urlLambda = "https://u57njg43jj.execute-api.sa-east-1.amazonaws.com/"

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
        };
        fetch(urlLambda, options)
        .then(data => {
            if(!data.ok) {
                throw Error(data.status)
            }
            return data.json()
        }).then(email => {
            console.log(email)
        }).catch(e => {
            console.log(e);
            });
}

window.addEventListener('load', () => {
    $('email').addEventListener('focus', () => {
        $('error').innerText = ""
    })

    $('email').addEventListener('blur', () => {
        $("email").classList.remove("borde")
    })

    $('email').addEventListener('keydown', () => {
        $('error').innerText = ""
    })

    $("form").addEventListener("submit", event => {
        event.preventDefault()
        let error = false
        let form = $('form');

        if(!emailRegex.test($('email').value)){
            error = true
            $('error').innerText = "*Debes ingresar un email válido"
            $("form").elements[0].value = ""
        }

        if(!error) {
            agregarEmail(form.elements[0].value, "luxouy")
            Swal.fire({
                title: "Correo enviado con éxito a <b>" + form.elements[0].value + "</b><br> Por favor, revisá tu casilla",
                background: "#fff url(img/sorpresa.jpg)",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 2500,
                timerProgressBar: true,
                customClass: {
                    title: "title",
                    popup: "alerta",
                  }
              });
            $("form").elements[0].value = ""
        }
    })

})