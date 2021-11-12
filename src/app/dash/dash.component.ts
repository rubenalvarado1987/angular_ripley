import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Registrate ahora', cols: 2, rows: 3 }
        ];
      }

      return [
        { title: 'Registrate ahora', cols: 2, rows: 3 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
