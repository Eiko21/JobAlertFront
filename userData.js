module.export = function userData(){
    //Devuelve los datos de la sesión iniciada
    let user = {}
    chrome.storage.local.set({'email': data.email, 'password': data.password, 'id': response.data._id}, function(result) {
        user.push(result);
    });
    return user;
}