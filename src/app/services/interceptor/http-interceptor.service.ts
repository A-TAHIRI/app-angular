import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {LoaderService} from "../../components/loader/service/loader.service";
import {AuthenticationResponse} from "../../models/authenticationResponse";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // N'intercepter pas les requêtes vers /login ou /register
    if (req.url.includes('/login')||req.url.includes('/email/send/**')||req.url.includes('/reset-password')||req.url.includes('/update/password')) {
      return next.handle(req); // Passez la requête au handler sans modifications
    }
    this.loaderService.show();
    let authenticationResponse: AuthenticationResponse = {};
    if (localStorage.getItem('accessToken')) {
      authenticationResponse = JSON.parse(
        localStorage.getItem('accessToken') as string
      );
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + authenticationResponse
        })
      });
      return  this.handleRequest(authReq, next);
    }
    return  this.handleRequest(req, next);
  }

  /**
   * ecteur d'evenment de la réponse
   * @param req
   * @param next
   */
  handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.loaderService.hiede();
      }
    }, error => {
      this.loaderService.hiede()
    }))
  }
}
