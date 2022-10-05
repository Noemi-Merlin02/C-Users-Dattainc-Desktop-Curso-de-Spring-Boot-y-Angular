import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user ={

username :'',
password :'',
nombre :'',
apellido: '',
email:'',
telefono :'',

  }

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {

  }
forSubmit(){

console.log(this.user);
if(this.user.username == ''|| this.user.username == null){
alert ('El nombre de usuario es requerido');
this.snack.open('El nombre de usuario es requerido  !!', 'Aceptar',{
duration : 3000,
verticalPosition : 'top',
horizontalPosition :'right'

});
return;

}
this.userService.añadirUsuario(this.user).subscribe(
  (data) => {
    console.log(data);
Swal.fire('usuario guardado','usuario registrado con exito en el sistema','success')

  }, (error) =>{
    console.log(error);

    this.snack.open('ha ocurrido un error en el sistema  !!', 'Aceptar',{
      duration : 3000,
      
      });
   
  }
)

}


}
