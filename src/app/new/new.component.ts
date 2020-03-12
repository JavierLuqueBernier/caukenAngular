import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPostForm: FormGroup;
  constructor() {
    this.newPostForm = new FormGroup({
      titulo: new FormControl(),
      imagen: new FormControl(),
      categoria: new FormControl(),
      contenido: new FormControl(),
      colabo: new FormControl(),
      publico: new FormControl(),
    });
  }

  ngOnInit() {
  }

  manejarSubmit() {
    console.log(this.newPostForm.value);
    const formulario = this.newPostForm.value;
    if (formulario.publico === 'guardarnext') {
      formulario.publico = 'privado';
    } else if (formulario.publico === 'publicarnext') {
      formulario.publico = 'publico';
    }
    console.log(formulario);
  }
}
