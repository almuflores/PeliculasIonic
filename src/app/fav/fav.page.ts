import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estrenos } from '../models/estrenos.interface';
import { PeliculaService } from '../services/pelicula.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  favoritas = [] as any;
  listlenght: any;


  ngOnChanges(): void {
    
    this.verLenght();

  }
  ngOnInit():void {}

  constructor(private peliculaService: PeliculaService, private router:Router, private ar:ActivatedRoute) { 
    this.ar.queryParams.subscribe(() => {
      if(this.router.getCurrentNavigation().extras.state){
        this.favoritas = this.favoritas.concat(this.router.getCurrentNavigation().extras.state.peliculasFav);
        console.log(this.favoritas);
        this.listlenght = this.favoritas.length
      }
    });
  }

  verLenght(){
    this.listlenght = this.favoritas.lenght;
    console.log(this.verLenght);

  }

  verFavoritas(){
    console.log(this.favoritas);
  }

  borrarFav(pelicula: object){
    var i = this.favoritas.indexOf(pelicula)
    this.favoritas.splice(i, 1);
    this.listlenght = this.favoritas.length
    console.log(this.favoritas);
  }

  

}
