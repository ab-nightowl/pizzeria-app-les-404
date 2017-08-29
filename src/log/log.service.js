export default class logService {
    constructor($http, apiUrlsService){
        this.$http = $http
        this.apiUrls = apiUrlsService
    }
    
    isConnected(){
        if(sessionStorage.getItem('session')){
            return true
        }else{
            return false
        }
    }
    
    checkUser(email, password){
        return this.$http.get(this.apiUrls.account)
            .then(users => {
                return users.data
            })
            .then(users => {
                let found = false;
                if(users.length>0){
                    users.forEach(user => {
                        if(user.email == email && user.password == password){
                            found = user.id
                        }
                    })
                }
                return found;
            })
    }
    
    isMailFree(email){
        return this.$http.get(this.apiUrls.account)
            .then(users => {
                return users.data
            })
            .then(users => {
                let free = true;
                users.forEach(user => {
                    if(user.email == email){
                        free = false;
                    }
                })
                return free
            })
    }
    
    connect(userId){
        sessionStorage.setItem('session', true)
        sessionStorage.setItem('userId', userId)
    }
    
    disconnect(){
        sessionStorage.removeItem('session')
        sessionStorage.removeItem('userId')
        sessionStorage.clear()
    }
    
    createUser(user){
        if(user.email && user.password){
            this.$http.post(this.apiUrls.account, user)
        }
    }
}