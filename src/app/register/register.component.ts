import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Login',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  private AuthService: Auth;
  private Router: Router;
  errorMessage = signal<string>('');
  isLoadoing = signal<boolean>(false);
  registerForm: FormGroup = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{6}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{6}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^[01][01235][0-9]{9}$/)]),
  }, this.confirmation);

  constructor(private authService: Auth, private router: Router) 
  {
    this.AuthService = authService;
    this.Router = router;
  }

  confirmation(g: AbstractControl) {

    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    }
    else {
      return { 'notMatched': true }
    }


  }

  registerSubmit() {
    if (this.registerForm.valid) {
       this.isLoadoing.set(true);
      this.AuthService.registerApi(this.registerForm.value).subscribe({

        next: (res) => {
          if (res.message == 'success') {
            this.router.navigate(['/Login']);
             this.isLoadoing.set(false);
          }

        },
        error: (err) => {
          console.log(err);
          this.errorMessage.set(err.error.message)
          this.isLoadoing.set(false);},
        complete: () => { }



      })
    }

  }


  ngOnInit() {
  }

}
