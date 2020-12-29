import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }
  //metodo para registrarse
  async onRegister(email, password){
    try{
      const user= await this.authSvc.register(email.value, password.value);
      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);  
        console.log('verified: ', isVerified);    
      }
    }catch(error)
    {console.log('Error: ', error)}
  }

  //metodo para redirigir
  private redirectUser(isVerified:boolean){
    if(isVerified){
      this.router.navigate(['']);
    }else{
      this.router.navigate(['home']);
    }
  }

}
