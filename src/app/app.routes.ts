import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { CriarUsuarioComponent } from './components/pages/criar-usuario/criar-usuario.component';

export const routes: Routes = [
    {
        path: "app/login",
        component: LoginComponent
    },
    {
        path: "app/criar-usuario",
        component: CriarUsuarioComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app/login'
    }
];
