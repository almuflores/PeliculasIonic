import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Estrenos} from '../models/estrenos.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private peliculasCollection: AngularFirestoreCollection<Estrenos>;
  private peliculas: Observable<Estrenos[]>;

  constructor(db:AngularFirestore) {
    this.peliculasCollection = db.collection<Estrenos>('peliculas');
    this.peliculas = this.peliculasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }

   getPeliculas(){
     return this.peliculas;
   }

   getPelicula(id:string){ 
     return this.peliculasCollection.doc<Estrenos>(id).valueChanges();
   }

   updatePelicula(pelicula:Estrenos, id:string){
     return this.peliculasCollection.doc(id).update(pelicula);
   }

   addPelicula(pelicula:Estrenos){
     return this.peliculasCollection.add(pelicula);
   }

   removePelicula(id:string ){
     return this.peliculasCollection.doc(id).delete();
   }

   
}
