class UserDTO{
    constructor(user){
        this._id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.profileImage=user.profileImage,
        this.isTailor=user.isTailor
    }
}

module.exports = UserDTO;