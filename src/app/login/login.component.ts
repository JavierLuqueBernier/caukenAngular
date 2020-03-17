import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  formularioEnviado: boolean;

  constructor(private userService: UserService) { 
    this.formularioEnviado = false;
    this.formLogin = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      password: new FormControl('', [
        Validators.pattern(/^(?=.*\d).{4,8}$/)
      ]),
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
    .then(response => {
      console.log(response['success']);
      localStorage.setItem('token', response['success']);
    })
    .catch(err => {
      console.log(err);
    });
  }

}
