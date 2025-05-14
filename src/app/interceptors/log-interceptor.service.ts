import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { finalize, tap } from 'rxjs/operators';
import { ToastService } from '../shared/components/toast.service';

// #docregion excerpt

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private log: NGXLogger, private toastSvc: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let data: any = null;
    let code: number = null;
    let elapsed: number = null;
    let errMessage: string = null;
    let errText: string = null;

    // extend server response observable with logging
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            const resp: HttpResponse<any> = event as HttpResponse<any>;
            code = resp.status;
            elapsed = Date.now() - started;
            data = resp.body;
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            const resp: HttpErrorResponse = err as HttpErrorResponse;
            errMessage = resp.message || resp.statusText;
            this.toastSvc.show(errMessage, { classname: 'bg-danger text-light', delay: 5000 });
            code = resp.status;
            elapsed = Date.now() - started;
          }
        }
      ),
      // Log when response observable either completes or errors
      finalize(() => {

        if (code >= 200 && code < 300) {
          this.log.debug(
            `${req.method} ${req.urlWithParams} ${code} (${elapsed}ms):`,
            data,
            req.headers,
          );
        } else {
          this.log.error(
            `${req.method} ${req.urlWithParams} ${code} (${elapsed}ms): [${errMessage}] ${errText}`,
            req.headers,
          );
        }
      })
    );
  }
}
