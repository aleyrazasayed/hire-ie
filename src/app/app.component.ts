import { LoginService } from 'src/app/services/login.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  navigate: any[] = [];
  showSplash = true;
  subscription: Subscription;
  constructor(
    public route: Router,
    public toaster: ToasterService,
    public loginService: LoginService
  ) {
    this.subscription = this.loginService.getChangeUser().subscribe((state) => {
      console.log('state', state);
      this.setMenu();
    });
  }

  ngOnInit(): void {
    this.setMenu();
    setTimeout(() => {
      this.showSplash = false;
    }, 2500);
  }

  setMenu() {
    this.navigate = [
      {
        title: 'Posted Jobs',
        url: 'posted-jobs',
        icon: 'briefcase',
        isForward: 'yes',
        isShow: localStorage.getItem('isRecruiter') === 'true' ? true : false,
      },
      {
        title: 'Saved Jobs',
        url: 'saved-jobs',
        icon: 'briefcase',
        isForward: 'yes',
        isShow: localStorage.getItem('isRecruiter') === 'true' ? false : true,
      },
      {
        title: 'Applied Jobs',
        url: 'applied-jobs',
        icon: 'briefcase',
        isForward: 'yes',
        isShow: localStorage.getItem('isRecruiter') === 'true' ? false : true,
      },
      {
        title: 'Profile',
        url: 'profile',
        icon: 'briefcase',
        isForward: 'yes',
        isShow: localStorage.getItem('isRecruiter') === 'true' ? false : true,
      },
      {
        title: 'Logout',
        url: 'logout',
        icon: 'log-out',
        isForward: 'no',
        isShow: true,
      },
    ];
  }

  navigateTo(key: string): void {
    switch (key) {
      case 'logout':
        localStorage.clear();
        this.loginService.resetUser();
        this.toaster.presentToast('Logged out successfully', 'success');
        this.route.navigate(['login']);
        break;
      case 'posted-jobs':
        this.route.navigate(['posted-jobs']);
        break;
      case 'saved-jobs':
        this.route.navigate(['saved-jobs']);
        break;
      case 'applied-jobs':
        this.route.navigate(['applied-jobs']);
        break;
      case 'profile':
        this.route.navigate(['profile']);
        break;
      default:
        break;
    }
  }
}
