import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-covers-list',
  templateUrl: './covers-list.component.html',
  styleUrls: ['./covers-list.component.css']
})
export class CoversListComponent implements OnInit {
  @Input() tituloSeccion: string;
  arrPosts: Post[];
  constructor(private postService: PostService) {
    /* this.arrPosts = [
      new Post(1, 'Título', '../assets/images/1.jpg',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt sapiente eum iure voluptates! Doloribus consectetur odio molestiae tempore consequuntur voluptas vero dignissimos suscipit adipisci iure at autem deleniti accusamus dolores perferendis rerum, cumque beatae possimus error expedita vitae ad itaque! Laboriosam quae tenetur voluptatum saepe, tempora assumenda omnis sapiente ipsum optio animi rerum, nisi sed fuga excepturi illum porro nulla itaque debitis! Ea incidunt explicabo quidem doloremque cumque ad, architecto repellendus dicta quae saepe cum ratione necessitatibus officia possimus repellat deleniti, repudiandae quod aspernatur? Tenetur fuga debitis laudantium modi ipsam, unde corporis, tempora nam accusantium harum, consectetur consequatur saepe.', 'fantasía', 'autor', 23, 450),
      new Post(2, 'Título', '../assets/images/2.jpg',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt sapiente eum iure voluptates! Doloribus consectetur odio molestiae tempore consequuntur voluptas vero dignissimos suscipit adipisci iure at autem deleniti accusamus dolores perferendis rerum, cumque beatae possimus error expedita vitae ad itaque! Laboriosam quae tenetur voluptatum saepe, tempora assumenda omnis sapiente ipsum optio animi rerum, nisi sed fuga excepturi illum porro nulla itaque debitis! Ea incidunt explicabo quidem doloremque cumque ad, architecto repellendus dicta quae saepe cum ratione necessitatibus officia possimus repellat deleniti, repudiandae quod aspernatur? Tenetur fuga debitis laudantium modi ipsam, unde corporis, tempora nam accusantium harum, consectetur consequatur saepe.', 'fantasía', 'autor', 23, 450),
      new Post(3, 'Título', '../assets/images/3.jpg',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt sapiente eum iure voluptates! Doloribus consectetur odio molestiae tempore consequuntur voluptas vero dignissimos suscipit adipisci iure at autem deleniti accusamus dolores perferendis rerum, cumque beatae possimus error expedita vitae ad itaque! Laboriosam quae tenetur voluptatum saepe, tempora assumenda omnis sapiente ipsum optio animi rerum, nisi sed fuga excepturi illum porro nulla itaque debitis! Ea incidunt explicabo quidem doloremque cumque ad, architecto repellendus dicta quae saepe cum ratione necessitatibus officia possimus repellat deleniti, repudiandae quod aspernatur? Tenetur fuga debitis laudantium modi ipsam, unde corporis, tempora nam accusantium harum, consectetur consequatur saepe.', 'fantasía', 'autor', 23, 450),
      new Post(4, 'Título', '../assets/images/4.jpg',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt sapiente eum iure voluptates! Doloribus consectetur odio molestiae tempore consequuntur voluptas vero dignissimos suscipit adipisci iure at autem deleniti accusamus dolores perferendis rerum, cumque beatae possimus error expedita vitae ad itaque! Laboriosam quae tenetur voluptatum saepe, tempora assumenda omnis sapiente ipsum optio animi rerum, nisi sed fuga excepturi illum porro nulla itaque debitis! Ea incidunt explicabo quidem doloremque cumque ad, architecto repellendus dicta quae saepe cum ratione necessitatibus officia possimus repellat deleniti, repudiandae quod aspernatur? Tenetur fuga debitis laudantium modi ipsam, unde corporis, tempora nam accusantium harum, consectetur consequatur saepe.', 'fantasía', 'autor', 23, 450),
      new Post(5, 'Título', '../assets/images/5.jpg',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt sapiente eum iure voluptates! Doloribus consectetur odio molestiae tempore consequuntur voluptas vero dignissimos suscipit adipisci iure at autem deleniti accusamus dolores perferendis rerum, cumque beatae possimus error expedita vitae ad itaque! Laboriosam quae tenetur voluptatum saepe, tempora assumenda omnis sapiente ipsum optio animi rerum, nisi sed fuga excepturi illum porro nulla itaque debitis! Ea incidunt explicabo quidem doloremque cumque ad, architecto repellendus dicta quae saepe cum ratione necessitatibus officia possimus repellat deleniti, repudiandae quod aspernatur? Tenetur fuga debitis laudantium modi ipsam, unde corporis, tempora nam accusantium harum, consectetur consequatur saepe.', 'fantasía', 'autor', 23, 450),
      new Post(6, 'Título', '../assets/images/6.jpg',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt sapiente eum iure voluptates! Doloribus consectetur odio molestiae tempore consequuntur voluptas vero dignissimos suscipit adipisci iure at autem deleniti accusamus dolores perferendis rerum, cumque beatae possimus error expedita vitae ad itaque! Laboriosam quae tenetur voluptatum saepe, tempora assumenda omnis sapiente ipsum optio animi rerum, nisi sed fuga excepturi illum porro nulla itaque debitis! Ea incidunt explicabo quidem doloremque cumque ad, architecto repellendus dicta quae saepe cum ratione necessitatibus officia possimus repellat deleniti, repudiandae quod aspernatur? Tenetur fuga debitis laudantium modi ipsam, unde corporis, tempora nam accusantium harum, consectetur consequatur saepe.', 'fantasía', 'autor', 23, 450),
      new Post(7, 'Título', '../assets/images/7.jpg',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt sapiente eum iure voluptates! Doloribus consectetur odio molestiae tempore consequuntur voluptas vero dignissimos suscipit adipisci iure at autem deleniti accusamus dolores perferendis rerum, cumque beatae possimus error expedita vitae ad itaque! Laboriosam quae tenetur voluptatum saepe, tempora assumenda omnis sapiente ipsum optio animi rerum, nisi sed fuga excepturi illum porro nulla itaque debitis! Ea incidunt explicabo quidem doloremque cumque ad, architecto repellendus dicta quae saepe cum ratione necessitatibus officia possimus repellat deleniti, repudiandae quod aspernatur? Tenetur fuga debitis laudantium modi ipsam, unde corporis, tempora nam accusantium harum, consectetur consequatur saepe.', 'fantasía', 'autor', 23, 450),
      new Post(8, 'Título', '../assets/images/8.jpg',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt sapiente eum iure voluptates! Doloribus consectetur odio molestiae tempore consequuntur voluptas vero dignissimos suscipit adipisci iure at autem deleniti accusamus dolores perferendis rerum, cumque beatae possimus error expedita vitae ad itaque! Laboriosam quae tenetur voluptatum saepe, tempora assumenda omnis sapiente ipsum optio animi rerum, nisi sed fuga excepturi illum porro nulla itaque debitis! Ea incidunt explicabo quidem doloremque cumque ad, architecto repellendus dicta quae saepe cum ratione necessitatibus officia possimus repellat deleniti, repudiandae quod aspernatur? Tenetur fuga debitis laudantium modi ipsam, unde corporis, tempora nam accusantium harum, consectetur consequatur saepe.', 'fantasía', 'autor', 23, 450),
      new Post(9, 'Título', '../assets/images/9.jpg',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt sapiente eum iure voluptates! Doloribus consectetur odio molestiae tempore consequuntur voluptas vero dignissimos suscipit adipisci iure at autem deleniti accusamus dolores perferendis rerum, cumque beatae possimus error expedita vitae ad itaque! Laboriosam quae tenetur voluptatum saepe, tempora assumenda omnis sapiente ipsum optio animi rerum, nisi sed fuga excepturi illum porro nulla itaque debitis! Ea incidunt explicabo quidem doloremque cumque ad, architecto repellendus dicta quae saepe cum ratione necessitatibus officia possimus repellat deleniti, repudiandae quod aspernatur? Tenetur fuga debitis laudantium modi ipsam, unde corporis, tempora nam accusantium harum, consectetur consequatur saepe.', 'fantasía', 'autor', 23, 450),
    ]; */

  }

  async ngOnInit() {
    try {
      this.arrPosts = await this.postService.getAll();
    } catch (err) {
      console.log(err)

    }
  }

}
