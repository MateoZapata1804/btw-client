import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  
  userForm: FormGroup | any;
  roles: any[] = [];
  submitted: boolean = false;

  constructor(private userSvc: UserService) {  }

  ngOnInit(): void {
    this.userSvc.getRoles()
      .then(resp => this.roles = resp)
      .catch(e => { console.log(e) });

    this.userForm = new FormGroup({
      nombre: new FormControl("Fulanito", Validators.required),
      apellido1: new FormControl("Perez", Validators.required),
      apellido2: new FormControl(),
      email: new FormControl("", Validators.required),
      rol: new FormControl("", Validators.required),
      clave: new FormControl("", Validators.required)
    });
  }

  onFormSubmit(data: any): void {
    if (this.userForm.valid) {
      this.submitted = true; // Para desactivar el boton
      
      this.userSvc.createUser(data).then(resp => {
        console.log("response: ", resp);
        alert("¡Usuario creado exitosamente!");
        window.location.href = "/usuarios";
      }).catch(err => { console.log(err) });
    }
  }
}
