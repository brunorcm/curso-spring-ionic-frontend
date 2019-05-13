import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // parametros do construtor são injetados como dependência
  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login() {
    console.log('login');
    this.navCtrl.setRoot('CategoriasPage'); 
    //this.navCtrl.push('CategoriasPage');
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}
