import { Component } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  template: `<div class="alert alert-danger" role="alert">
    Wystąpił błąd w komunikacji z serwerem!
  </div>`,
})
export class WarningAlertComponent {}
