import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private AuthService: Auth;
  private Router: Router;
  errorMessage = signal<string>('');
  isLoadoing = signal<boolean>(false);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{6}$/)]),
  },);


  constructor(private authService: Auth, private router: Router) {
    this.AuthService = authService;
    this.Router = router;
  }
  loginSubmit() {
    if (this.loginForm.valid) {
      this.isLoadoing.set(true);
      this.AuthService.loginApi(this.loginForm.value).subscribe({

        next: (res) => {

          if (res.message == 'success') {
            this.router.navigate(['/Home']);
            this.isLoadoing.set(false);
            localStorage.setItem('userToken', res.token);
            this.AuthService.setUserData();
            console.log(this.AuthService.userData);
         }

        },
        error: (err) => {
          console.log(err);
          this.errorMessage.set(err.error.message)
          this.isLoadoing.set(false);
        },
        complete: () => { }



      })
    }

  }





  ngOnInit() {
  }

}
