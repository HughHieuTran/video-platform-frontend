import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-llci0ka8nbhgt885.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'bdn3khB3wD8NBX10aE3mhXvS6ffum4NY',
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes:['https://localhost:8080/'],
            customParamsAuthRequest:{
                audience: "http://localhost:8080/"
            }
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
