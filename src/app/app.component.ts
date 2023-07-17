import { Component, OnInit } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe((loginResponse: LoginResponse) => {
      const { isAuthenticated, userData, accessToken, idToken, configId } = loginResponse;
        
      /*...*/
    });
  }
  title = 'video-platform-ui';
  
}
