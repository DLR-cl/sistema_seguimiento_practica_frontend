import { inject, Injectable } from "@angular/core";

import { JefeAlumnoInterface } from "../interface/jefe-alumno.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { JefeEmpleadorService } from "./jefe-empleador.service";

@Injectable({
    providedIn: 'root',
})
export class DataJefeAlumnoService {

    private readonly _jefeEmpleadorService = inject(JefeEmpleadorService);
    private jefeAlumnoSubject = new BehaviorSubject<JefeAlumnoInterface | null>(null);

    constructor(){
        this.loadData();
    }

    public getData(): Observable<JefeAlumnoInterface | null>{
        return this.jefeAlumnoSubject.asObservable();
    }

    private loadData(): void {
        this._jefeEmpleadorService.getJefeEmpleador().subscribe(
            (data) => {
                console.log(data)
                this.jefeAlumnoSubject.next(data);
            },
            (error) => {
                console.log('Error al cargar los datos', error);
                this.jefeAlumnoSubject.next(null);
            }
        )
    }

    public getUserId(): number | null {
        let token = localStorage.getItem('session')
        if (token) {
            const decodedToken: any = jwtDecode(token); // Decodifica el token
            return decodedToken.id_usuario; // Devuelve solo el id_usuario
          }
        return null;
    }
}