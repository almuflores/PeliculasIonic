import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {Estrenos} from '../models/estrenos.interface';
import {PeliculaService} from '../services/pelicula.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  peliculas:Estrenos[];
  favoritas = [] as any;

  constructor(private peliculaService:PeliculaService, private router:Router, public alertController: AlertController){

  }
// res => this.peliculas=res
  ngOnInit(){
    this.peliculaService.getPeliculas().subscribe((peliculas)=>{
      console.log('Peliculas', peliculas);
      this.peliculas=peliculas;
    });
  }

  obtenerPelicula(pelicula : object){

    this.favoritas.push(pelicula)
    console.log(this.favoritas)

  }

  mandar(){
    let nav : NavigationExtras = {
      state: {peliculasFav: this.favoritas}
    }
    this.router.navigate(['/fav'], nav)
    this.favoritas = [];
  }

  send(){
    if (this.favoritas.length < 1){
      this.presentAlert();
    } else{
      this.mandar();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: '',
      buttons: ['OK']
    });

    await alert.present();
  }

}
