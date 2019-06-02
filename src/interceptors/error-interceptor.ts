import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,
        public alertController: AlertController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        return next.handle(req)
        .catch((error, caught) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch (errorObj.status) {
                case 401:
                    this.handle401();
                case 403: 
                    this.handle403();
                    break;
                
                    default:
                    this.handleDefaultError(errorObj);
            }
            return Observable.throw(errorObj);
        }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        let alerta = this.alertController.create({
            title: 'Erro 401: falha na autenticação',
            message: 'Email ou senha incorretos',
            // obriga usuário a clicar no botão do alerta para fechar
            enableBackdropDismiss: false,
            buttons: [
                {text: 'OK'
                }
            ]
        });
        // apresenta o alerta
        alerta.present();
     }

     handleDefaultError(errorObj) {
        let alerta = this.alertController.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            // obriga usuário a clicar no botão do alerta para fechar
            enableBackdropDismiss: false,
            buttons: [
                {text: 'OK'
                }
            ]
        });
        // apresenta o alerta
        alerta.present();
     }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};