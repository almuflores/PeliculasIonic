import { Component, OnInit} from '@angular/core';
import {Estrenos} from '../models/estrenos.interface';
import {PeliculaService} from '../services/pelicula.service';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  pelicula: Estrenos ={
    titulo: ''
  }

  peliculaId=null;

  constructor(private route: ActivatedRoute, private nav:NavController,  private peliculaService:PeliculaService, private loadingController:LoadingController){

   }

  ngOnInit() {
    this.peliculaId = this.route.snapshot.params['id'];
    if(this.peliculaId){
      this.loadPelicula();
    }
  }

  async loadPelicula(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.peliculaService.getPelicula(this.peliculaId).subscribe(resp=>{
      loading.dismiss();
      this.pelicula=resp;
    })
  }

  async savePelicula(){
    const loading = await this.loadingController.create({
      message: 'Guardando...'
  });

  await loading.present();

  if(this.peliculaId){
    //update
    this.peliculaService.updatePelicula(this.pelicula, this.peliculaId).then(()=>{
      loading.dismiss();
      this.nav.navigateForward('/home');
    });
  }else{
    //añadimos uno nuevo
    this.peliculaService.addPelicula(this.pelicula).then(()=>{
      loading.dismiss();
      this.nav.navigateForward('/home');
  
  });
  }
}

  onRemove(peliculaid: string){
    this.peliculaService.removePelicula(peliculaid);
  }

}
