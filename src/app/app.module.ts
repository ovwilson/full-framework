import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PreloadSelectedModules } from './app.preload-strategy';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers()),
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  providers: [PreloadSelectedModules],
  bootstrap: [AppComponent]
})
export class AppModule { }
