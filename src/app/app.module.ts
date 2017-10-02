import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PreloadSelectedModules } from './app.preload-strategy';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app.reducers';
import { Effects } from './app.effects';

// Services
import { MongoService } from './services/mongo';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers()),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([Effects.settingsEffects()])
  ],
  providers: [PreloadSelectedModules, MongoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
