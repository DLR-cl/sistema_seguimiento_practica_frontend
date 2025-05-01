import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { DataUsuarioFromJSONWebToken } from '../../interfaces/data-usuario.interface';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [],
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.css'
})
export class PerfilUserComponent implements OnInit {

  usuarioData = signal<DataUsuarioFromJSONWebToken | null>(null);
  authStateService = inject(AuthStateService);
  ngOnInit(): void {
    this.getData();
  }
  private getData() {
    this.usuarioData.set(this.authStateService.getData());
  }
}
