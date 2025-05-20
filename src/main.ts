import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
// valido
bootstrapApplication(AppComponent,{
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(NgxSpinnerModule)
  ],
}).catch((err) => console.error(err));
