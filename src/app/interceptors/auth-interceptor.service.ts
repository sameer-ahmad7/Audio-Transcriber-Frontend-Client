import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { from, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token$ = from(Auth.currentAuthenticatedUser()).pipe(
      map((authUser: CognitoUser) =>
        authUser.getSignInUserSession().getIdToken().getJwtToken()
      )
    );

    return token$.pipe(
      // if the X-""-Bypass-Auth header is sent, dont send a bearer token
      mergeMap((token) => {
        if (req.headers.get("X-""-No-Auth") != null) {
          // dont send the bearer token
          token = null;
          // dont send the X-""-No-Auth header
          req = req.clone({
            headers: req.headers.delete("X-""-No-Auth"),
          });
        } else {
          // add the bearer token to the request
          if (environment.production == false) {
            console.log("Token: ", token);
          }
          req = req.clone({
            headers: req.headers.append("Authorization", `Bearer ${token}`),
          });
        }
        // issue the request
        return next.handle(req);
      })
    );
  }
}
