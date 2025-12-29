import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { Auth } from '../services/auth';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [RouterLink]
})
export class NavComponent implements OnInit {
  
  isLogin=signal<boolean>(false);
  private authService:Auth=inject(Auth);
  private router: Router = inject(Router);


 

  ngOnInit() {
    this.checkLogin();
  }


   
  checkLogin()
  {
     this.authService.userData.subscribe({
      next:(res)=>
        {
          if(this.authService.userData.getValue() == null)
           {
              this.isLogin.set(false);
           }
          else
           {
              this.isLogin.set(true);
           }
        }
     })

  }
  isLogout()
  {
    localStorage.removeItem('userToken');
    this.authService.userData.next(null);
    this.isLogin.set(false);
    this.router.navigateByUrl('/login');

  }
  
}