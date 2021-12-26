const alias= document.getElementById("alias");
const email= document.getElementById("email");
const subject= document.getElementById("subject");
const message= document.getElementById("message");
const form= document.getElementById("contact");

form.addEventListener('submit', async function(e){
  e.preventDefault()

if (!new RegExp(/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/).test(email.value)) {
  email.value= ""
  email.setAttribute("placeholder", "invalid email");
  email.style.borderColor="red"
  return false
}

  try {
      const data= {
        alias: this.alias.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
      }
      const options=  { 
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
          }
    
     await  fetch ('/sendMessage', options)
      form.reset()
      console.log ("data sent")
    } catch (error) {
      console.log (error)
      console.log ("we failed")
    }

  
});




 