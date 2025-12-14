import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  title = 'Admin Page'; // a simple page to see what we're doing
}
