import { inject, Injectable } from "@angular/core";
import { JefeEmpleadorService } from "../data-access/jefe-empleador.service";
import { JefeAlumnoInterface } from "../data-access/interface/jefe-alumno.interface";
import { BehaviorSubject, Observable } from "rxjs";

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
                this.jefeAlumnoSubject.next(data);
            },
            (error) => {
                console.log('Error al cargar los datos', error);
                this.jefeAlumnoSubject.next(null);
            }
        )
    }
}