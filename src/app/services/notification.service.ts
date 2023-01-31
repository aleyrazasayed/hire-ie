import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly toastService: ToasterService,
    private readonly router: Router
  ) {}

  init() {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        this.toastService.presentToast('Permission not grated!', 'danger');
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      sessionStorage.setItem('push_token', token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      this.toastService.presentToast(
        'Error on registration: ' + JSON.stringify(error),
        'danger'
      );
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        if (notification.data) {
          const payload = JSON.parse(notification.data);
          if (sessionStorage.getItem('isRecruiter') == 'true') {
            if (payload.forRecruiter) {
              this.toastService.presentToast(
                `${notification.title}`,
                'success'
              );
              console.log(
                'New Application from ' + notification.title,
                payload
              );
            }
          } else {
            if (!payload.forRecruiter) {
              this.toastService.presentToast(
                `${notification.title}`,
                'success'
              );
              console.log(notification.title, notification.body, payload);
            }
          }
        }
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        if (notification.notification.data) {
          const payload = JSON.parse(notification.notification.data);
          if (sessionStorage.getItem('isRecruiter') == 'true') {
            if (payload.forRecruiter) {
              this.toastService.presentToast(
                `${notification.notification.title}`,
                'success'
              );
              console.log(
                'New Application from ' + notification.notification.title,
                payload
              );
            }
          } else {
            if (!payload.forRecruiter) {
              this.toastService.presentToast(
                `${notification.notification.title}`,
                'success'
              );
              console.log(notification.notification.title, payload);
            }
          }
        }
      }
    );
  }
}
