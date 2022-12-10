import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  showSplash = true;

  constructor(public route:Router, private splashScreen: SplashScreen) { }


  ngOnInit() {
    setTimeout(() => {
      this.showSplash = false
    }, 3500);
    

// this.splashScreen.hide();
  }
  redirectLogin(){
    this.route.navigateByUrl('/login')
  }

}
