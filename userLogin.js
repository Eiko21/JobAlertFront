module.export = function userLogin(){
    let data = JSON.stringify({
        email: this.state.email,
        password: this.state.password
    })
    axios.post('http://localhost:3333/api/subscriptions/subscribe', data, {email: data.email,password: data.password})
}