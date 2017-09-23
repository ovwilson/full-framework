import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSettingsActions from './settings/settings.actions';
import * as fromRoot from './app.reducers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private store: Store<fromRoot.State>) { }
  ngOnInit() {
   // this.store.dispatch(new fromSettingsActions.SettingsCreate());
   // this.store.dispatch(new fromSettingsActions.SettingsUpdate());
  }
}
