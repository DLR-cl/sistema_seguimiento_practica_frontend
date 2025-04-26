import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AlumnoService } from '../../pages/roles/alumno_practica/data-access/alumno.service';

export const practicasGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const alumnoService = inject(AlumnoService);

  const idAlumno = +route.params['idAlumno'];

  return alumnoService.getAlumnoPracticante().pipe(
    map((usuario) => {
      // Verificar si el usuario tiene prácticas
      if (!usuario.practica || usuario.practica.length === 0) {
        router.navigate(['/error']); // Redirigir si no hay prácticas
        console.log('no practicas, no entra xd')
        return false;
      }

      // Verificar si alguna práctica coincide con el idAlumno
      const practicaValida = usuario.practica.some((p: any) => p.id_alumno === idAlumno);

      if (!practicaValida) {
        router.navigate(['/error']); // Redirigir si no hay coincidencias
      }
      console.log('si hubo')
      return practicaValida; // Permitir acceso si es válida
    })
  );
};
