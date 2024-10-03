export default class Profile {
  username : string;
  name : string;
  email : string;
  avatar : string;

  constructor (data : IProfile) {
    this.username = data.username;
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
  }
}

export interface IProfile {
  username : string;
  name : string;
  email : string;
  avatar : string;
}