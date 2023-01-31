import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public toastController: ToastController) { }

  async presentToast(msg: any, type: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color: type,
      position: 'bottom'
    });
    toast.present();
  }
}
