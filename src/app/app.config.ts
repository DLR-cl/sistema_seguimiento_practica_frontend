import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { combinedInterceptor } from './core/interceptors/error-handler.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SlowHttpInterceptor } from './core/interceptors/slow-http.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Detecta cambios en la zona
    provideRouter(routes), // Proporciona las rutas de la aplicación
    provideHttpClient(
      withInterceptors(
        [
          combinedInterceptor, 
          SlowHttpInterceptor, 
          loadingInterceptor
        ])  // Agrega tus interceptores ()
    ),
    importProvidersFrom([BrowserAnimationsModule]),
    provideAnimations(), // Animaciones de Angular
    MessageService, // Servicio de PrimeNG para mensajes,
    ConfirmationService
  ]
};
