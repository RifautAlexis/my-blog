import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/components/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, HeaderComponent],
})
export class AppComponent {
}
