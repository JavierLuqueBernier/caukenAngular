import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { OCULTAR_NAV } from '../actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  formularioEnviado: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.formularioEnviado = false;
    this.formLogin = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      password: new FormControl('', [
        Validators.pattern(/^(?=.*\d).{4,8}$/)
      ]),
    });
  }

  ngOnInit() {
    this.ngRedux.dispatch({
      type: OCULTAR_NAV,
      ocultarNav: true,

    });
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response['success']);
        localStorage.setItem('usuario', response['userid']);

        // se obtiene la ruta de la que se venía antes de hacer login y se navega:
        const ruta = this.ngRedux.getState().routeAfter;

        this.router.navigate([ruta]);

      })
      .catch(err => {
        console.log(err);
      });
  }

  dirigirRegister() {
    this.router.navigate(['/register']);
  }

  /*   ngOnDestroy(){
      this.ngRedux.dispatch({
        type: LOGIN_ACTIVE,
        loginActive: false;
      });
    } */

  ngOnDestroy(): void {
    this.ngRedux.dispatch({
      type: OCULTAR_NAV,
      ocultarNav: false,
    });
  }

}
