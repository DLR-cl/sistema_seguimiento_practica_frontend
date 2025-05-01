import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { TipoSecretaria } from '../../../../core/constants/tipo-usuarios.constants';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-secretaria-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-secretaria-page.component.html',
})
export class HomeSecretariaPageComponent implements OnInit {
  /*
    Componente que contiene a la secretaria de carrera y del departamento
  */
  rolUsuario = signal<string>('');
  imageFondo = '/departamento_ici/transicion_6.webp';

  authService = inject(AuthStateService);
  cargando = signal<boolean>(true);

  tipoSecretaria = TipoSecretaria;

  ngOnInit(): void {
    this.getRol();
  }

  private getRol() {
    this.rolUsuario.set(this.authService.getRole()!);
  }
}
