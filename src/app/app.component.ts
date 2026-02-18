import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

import { MaterialModule } from './material/material.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    AsyncPipe,
    MaterialModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appName = 'Price Scout';

  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHandset$ = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay({ bufferSize: 1, refCount: true })
    );
}
