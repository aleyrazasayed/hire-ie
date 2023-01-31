import { Component, OnInit } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UploadMetadata, UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  pageName = 'User Profile';

  loading = false;
  uploadProgress?: Observable<number | undefined>;

  user: {
    firstName: string;
    lastName: string;
    email: string;
    resume?: {
      name: string;
      url: string;
    };
    postId: string;
  } | null = null;

  profileGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private uploadService: UploadService
  ) {
    this.profileGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      resume: ['', Validators.nullValidator],
      fileSource: ['', Validators.nullValidator],
    });
  }

  ngOnInit() {
    this.loading = true;
    this.loginService.getAllUsers().subscribe((resp) => {
      const users = resp.filter(
        (user: any) =>
          user.email === sessionStorage.getItem('email') &&
          user.isRecruiter == 'false'
      );
      if (users.length > 0) {
        this.user = users[0];
      }

      this.patchFormValues(this.user);
      this.loading = false;
    }),
      (err: any) => {
        ;
        this.loading = false;
      };
  }

  patchFormValues(user: any) {
    this.profileGroup.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileGroup.patchValue({
        fileSource: file,
      });
    }
  }

  onSubmit() {
    if (this.profileGroup.valid) {
      this.loading = true;
      var user = {
        firstName: this.profileGroup.get('firstName')?.value,
        lastName: this.profileGroup.get('lastName')?.value,
      };
      this.uploadService
        .uploadFile(
          this.profileGroup.get('fileSource')?.value,
          this.user?.postId!
        )
        .pipe(
          tap((snapshot) => {
            if (snapshot) {
              snapshot.ref.getDownloadURL().then((url) => {
                Object.assign(user, 
                  { 
                    resume: {
                      name: this.profileGroup.get('fileSource')?.value.name,
                      url: url,
                    } 
                  });
                  sessionStorage.setItem('isCvAttached','true')
                this.loginService
                  .updateUser(user, this.user?.postId!)
                  .pipe(
                    tap((resp) => {
                      this.loading = false;
                    }),
                    catchError((err) => {
                      this.loading = false;
                      ;
                      return of(err);
                    })
                  )
                  .subscribe();
              });
            }
          }),
          catchError((err) => {
            this.loading = false;
            ;
            return of(err);
          })
        )
        .subscribe();
    }
  }
}
