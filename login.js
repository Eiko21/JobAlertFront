async function login(){
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }
  axios.post('http://localhost:3333/api/sign', data)
  .then(function(response) {
    // handle success
    if(response.status === 200){
      chrome.storage.local.set({'email': data.email, 'password': data.password, 'id': response.data._id}, function() {
        window.location.href = "/suscripciones/subs.html";
        userLogin();
      });
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}
$("#login").on("click", function(){
  login();
})