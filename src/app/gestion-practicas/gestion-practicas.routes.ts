import { Routes } from "@angular/router";
import { privateGuard } from "../shared/guards/auth.guard";
import { roleGuard } from "../shared/guards/roleUsers.guard";
import { TipoUsuario } from "../enum/enumerables.enum";

export const routes: Routes = [

    {
        path: 'menu',
        loadComponent: () => import('./pages/menu-home-page/menu-home-page.component').then(c => c.MenuHomePageComponent),
        canActivate: [privateGuard()]
    }, {
        path: 'mas-info',
        loadComponent: () => import('./pages/mas-info-page/mas-info-page.component').then(c => c.MasInfoPageComponent),
        canActivate: [privateGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'menu'
    },
]