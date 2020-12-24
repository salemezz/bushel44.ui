//This function checks to see if the user is authenticated. You can replace the contents of this function with however you want to validate user authentication.
export function checkIfAuthenticated(){
    //In this function, we will use local storage to maintain user information.
    return window.localStorage.getItem('user') ? true : false
 }
 
//This function checks to see if the user is authorized to do something. The contents of this are changeable as well.
export function checkIfAuthorized(permission){
    //In this function, we will use the permissions key in the user data in local storage to figure out if they have authorization.
    let userInfo = JSON.parse(window.localStorage.getItem('user'))
    return userInfo ? userInfo.permissions.includes(permission) : false
}

export function getUserData(){
    return checkIfAuthenticated() ? JSON.parse(window.localStorage.getItem('user')) : {}
}

export function deauthenticate(){
    return new Promise((resolve, reject)=>{
        window.localStorage.removeItem('user')
        fetch(`https://herballist-api.herokuapp.com/auth/logout`)
        .then(response=>{
            if(response.ok){
                resolve(true)
            }
            else{
                reject('Invalid Credentials')
            }
        })
        .catch(err=>{
            reject('Network Issues')
        })
    })
}

export function authenticate(username, password){
    return new Promise((resolve, reject)=>{
        window.localStorage.removeItem('user')
        fetch(`https://herballist-api.herokuapp.com/auth/login`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response=>{
            if(response.ok){
                return response.json()
            }
            else{
                reject('Invalid credentials')
            }
        })
        .then(data=>{
            console.log(data)
            window.localStorage.setItem('user', JSON.stringify(data))
            resolve(true)
        })
        .catch(err=>{
            reject('Network Issues')
        })
    })
}