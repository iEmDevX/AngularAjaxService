import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjaxService } from './services/ajax.service';
import { ShareModuleModule } from './share-module/share-module.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModuleModule
  ],
  providers: [AjaxService],
  bootstrap: [AppComponent],
})
export class AppModule { }
