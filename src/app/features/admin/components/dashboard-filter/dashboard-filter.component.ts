import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dashboard-filter',
  standalone: true,
  templateUrl: 'dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss'],
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
})
export class DashboardFilterComponent implements OnInit {
  @Output() searchedTerm = new EventEmitter<string | null>();

  searchForm = new FormGroup({
    searchTerm: new FormControl('', []),
   });

  ngOnInit(): void {
    this.searchForm.controls['searchTerm'].valueChanges.subscribe((data) => {
      this.searchedTerm.emit(data);
    });
  }
}
