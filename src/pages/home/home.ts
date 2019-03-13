import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // parametros do construtor são injetados como dependência
  constructor(public navCtrl: NavController) {

  }

  login() {
    this.navCtrl.setRoot('CategoriasPage')
  }

}
