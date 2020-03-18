import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { LOGIN_ACTIVE } from '../actions';

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
    })
  }

  ngOnInit() {
    this.ngRedux.dispatch({
      type: LOGIN_ACTIVE,
      loginActive: true
    });
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

/*   ngOnDestroy(){
    this.ngRedux.dispatch({
      type: LOGIN_ACTIVE,
      loginActive: false;
    });
  } */

}
