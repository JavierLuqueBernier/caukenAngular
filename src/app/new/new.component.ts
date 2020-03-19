import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPostForm: FormGroup;
  errors: any;
  constructor(
    private postService: PostService,
  ) {
    this.newPostForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      imagen: new FormControl('', [
        Validators.maxLength(255)
      ]),
      categoria: new FormControl('', [
        Validators.maxLength(50)
      ]),
      contenido: new FormControl('', [
        Validators.maxLength(4096)
      ]),
      colaborable: new FormControl('colabo', [

      ]),

      publico: new FormControl('publico', [
      ]),
      latitud: new FormControl(null, [
      ]),
      longitud: new FormControl(null, [
      ]),
      //En estos tres campos el valor hay que obtenerlo del usuario y del post padre.
      fk_id_anterior: new FormControl(null, [
      ]),
      fk_usuario: new FormControl('2', [
      ]),
      fk_ancestro: new FormControl(null, [

      ]),

    });
  }

  ngOnInit() {
    //se tiene que tener preparada la id del post anterior y la fk_ancestro si la hubiera, la id del usuario para rellenar los campos ocultos
    //Está preparado en dos campos ocultos latitud y longitud
  }

  async manejarSubmit() {
    console.log(this.newPostForm.value);
    const newPostForm = this.newPostForm.value;
    if (newPostForm.publico === 'guardarnext') {
      newPostForm.publico = 'privado';
    } else if (newPostForm.publico === 'publicarnext') {
      newPostForm.publico = 'publico';
    }
    try {
      await this.postService.create(newPostForm);
    } catch (err) {
      this.errors = err;

    }
  }
}
