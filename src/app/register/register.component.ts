import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { OCULTAR_NAV } from '../actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  formularioEnviado: boolean;

  errores: any;

  constructor(
    private userService: UserService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) {
    this.formularioEnviado = false;
    this.formRegister = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      password: new FormControl('', [
        Validators.pattern(/^([a-zA-Z0-9@*#]{8,15})$/)
      ]),
      repite_password: new FormControl()
    }, [this.passwordValidator]);
    this.errores = [];
  }

  ngOnInit() {
    this.ngRedux.dispatch({
      type: OCULTAR_NAV,
      ocultarNav: true,
    });
  }

  onSubmit() {
    this.formularioEnviado = true;
    this.userService.registro(this.formRegister.value)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        this.errores = err.error;
      });
  }

  passwordValidator(form) {
    const passwordValue = form.controls.password.value;
    const repitePasswordValue = form.controls.repite_password.value;

    if (passwordValue === repitePasswordValue) {
      return null;
    } else {
      return { passwordvalidator: true };
    }
  }

  dirigirHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.ngRedux.dispatch({
      type: OCULTAR_NAV,
      ocultarNav: false,

    });

  }

}
