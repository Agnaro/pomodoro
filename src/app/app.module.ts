import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TimerPageComponent } from './timer-page/timer-page.component';
import { SettingsService } from './services/settings/settings.service';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TimerDisplayPipe } from './pipes/timer-display.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, HelloComponent, TimerPageComponent, SettingsPageComponent, TimerDisplayPipe ],
  bootstrap:    [ AppComponent ],
  providers: [
    SettingsService
  ]
})
export class AppModule { }
