import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsignacionDto } from '../dto/secretaria-data.dto';
import { AcademicoInformes, PracticaInfo } from '../dto/asignacion-informes.dto';
import { ExtensionDto } from '../dto/practicas.dto';
import { enviroment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionInformesService {

  private readonly _http = inject(HttpClient);

  constructor() { }

  public getProfesores(){
    return this._http.get<AcademicoInformes[]>(`${enviroment.API_URL}/academicos/cantidad-informes`)
  }

  public getPracticas(){
    return this._http.get<PracticaInfo[]>(`${enviroment.API_URL}/practicas`)
  }

  public asociarInformeAcademico(academicoAsociado: AsignacionDto){
    return this._http.patch<any>(`${enviroment.API_URL}/informe-alumno/asociar-informe`, academicoAsociado)
  }

  public extenderPractica(extension: ExtensionDto){
    return this._http.patch<any>(`${enviroment.API_URL}/practicas/extender`, extension)
  }

  public eliminarPractica(idPractica: number){
    return this._http.delete<any>(`${enviroment.API_URL}/practicas/eliminar-practica/${idPractica}`)
  }

}
