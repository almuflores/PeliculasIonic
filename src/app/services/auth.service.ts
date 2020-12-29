import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth) { }

  //metodo para salir 
  async logout():Promise<void>{
    try{
      await this.afAuth.signOut();
    }catch(error){
      console.log('Error: ', error);
    }
  }

  //metodo para logearte
  async login(email:string,password:string): Promise<User>{
    try{
      const {user}=await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    }catch(error){
      console.log('Error: ', error);
    }
  }

  //metodo para registarte
  async register(email:string,password:string): Promise<User>{
    try{
      const {user} = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return user;
    }catch(error){
      console.log('Error: ', error);
    }
  }

  isEmailVerified(user:User):boolean{
    return user.emailVerified===true ? true :false;
  }
}
