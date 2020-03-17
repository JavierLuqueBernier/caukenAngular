import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  formularioEnviado: boolean;

  constructor() { 
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

}
