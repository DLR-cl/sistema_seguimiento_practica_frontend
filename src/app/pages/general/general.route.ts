import { Routes } from "@angular/router";
import { PublicLayoutComponent } from "../../layout/public-layout/public-layout.component";
import { publicGuard } from "../../shared/guards/auth.guard";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        canActivate: [publicGuard()]
    },
    {
        path: 'login',
        loadComponent: () => import('../../auth/page/login-page/login-page.component').then(c => c.LoginPageComponent),
    },
    {
        path: 'cambiar-clave',
        loadComponent: () => import('../../pages/general/change-password/change-password.component').then(c => c.ChangePasswordComponent),
    },
    {
        path: 'solicitar-practicante',
        loadComponent: () => import('./../solicitar-practicante/solicitar-practicante.component').then(c => c.SolicitarPracticanteComponent),
    }
]