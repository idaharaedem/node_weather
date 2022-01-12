
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOneReturn = document.querySelector('#message-1')
const messageTwoReturn = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value;

    messageOneReturn.textContent = 'Loading'

    fetch('/weather?address=' + location).then((response)=> {
    response.json().then((data)=> {
        if(data.error) {

            messageOneReturn.textContent = data.error
        }else {
            
            messageOneReturn.textContent = 'Location: ' + data.location
            messageTwoReturn.textContent = data.forecast;
           
        }
    })
})
})

