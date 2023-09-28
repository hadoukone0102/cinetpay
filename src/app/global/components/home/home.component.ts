import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private meta: Meta,private titleService:Title){

  }
  ngOnInit() {
    this.meta.addTag({name: 'author', content: 'eglise mukasa'});
    this.meta.addTag({name: 'description', content: "Découvrez le site internet de l'église mukasa balikuddembe pour vos dons, vos demandes de messe, vos quêtes, vos célébrations de baptêmes et de mariage et vos catechese"})
    this.meta.addTag({name: 'keywords', content: 'Saint-joseph, mukasa,eglise, parroisse, catholique, eglise mukasa'})
    this.meta.addTag({property: 'og:site_name', content: 'eglise mukasa'});
    this.meta.addTag({property: 'og:type', content: 'Accueil'});
    this.meta.addTag({property: 'og:title', content: 'Eglise Mukasa'});
    this.meta.addTag({property: 'og:description', content: "Découvrez le site de l'église Mukasa Balikuddembe"});
    this.titleService.setTitle("Eglise Mukasa - Accueil");
  }
  

}
