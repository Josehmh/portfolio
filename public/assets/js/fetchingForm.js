const alias= document.getElementById("alias");
const email= document.getElementById("email");
const subject= document.getElementById("subject");
const message= document.getElementById("message");
const form= document.getElementById("contact");

form.addEventListener('submit', function(e){
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
    
       fetch ('/sendMessage', options)
       console.log(alias)
      
      form.reset()
      console.log ("data sent")
      e.preventDefault()
    } catch (error) {
      console.log (error)
      console.log ("we failed")
    }
});




 