import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
"username" : '',
"password" : '',


  }

  constructor(private snack:MatSnackBar, private loginService: LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(): void {

    if(this.loginData.username.trim() ==  '' || this.loginData.username.trim() == null){
this.snack.open('El nombre de usuario es requerido !!', 'Aceptar',{
duration:3000

})
return;
    }
    if(this.loginData.username.trim() ==  '' || this.loginData.username.trim() == null){
      this.snack.open('La contraseña de usuario es requerida !!', 'Aceptar',{
      duration:3000
      
      })
      return;
          }

this.loginService.generateToken(this.loginData).subscribe(
  (data: any) => {
    console.log(data);
    this.loginService.loginUser(data.token);
    this.loginService.getCurrenUser().subscribe((user:any) => {
    this.loginService.setUser(user);
     console.log(user);
   
   if(this.loginService.getUserRole() == "ADMIN"){
    //dashboard admin
//window.location.href = '/admin';

   
this.router.navigate(['admin']);
this.loginService.loginStatusSubjec.next(true);


    }
    else if (this.loginService.getUserRole() == "NORMAL"){
     //user dashboard
     //window.location.href  = '/user-deshboard';
 
     this.router.navigate(['user-dashboard']);
     this.loginService.loginStatusSubjec.next(true);
}
else {
this.loginService.logout();
}
   
   
    })
  },(error) => {
    console.log(error);
    this.snack.open('Detalles invalidos, vuelva a intentar !!','Aceptar',{
    duration:3000   

    })
  }
)      
  }
}
