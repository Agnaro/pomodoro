import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPageComponent } from '../settings-page/settings-page.component';
import { TimerPageComponent } from '../timer-page/timer-page.component';

const routes: Routes = [
  { path: "", component: TimerPageComponent },
  { path: "settings", component: SettingsPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }