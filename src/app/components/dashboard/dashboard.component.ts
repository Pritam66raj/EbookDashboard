import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatFormField,
    MatInputModule,FormsModule,MatListModule,MatTableModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {
  newEntry = {
    category: '',
    page: '',
    line: '' 
  };

  constructor(private router:Router)
  {}

  history: any[] = [];

  categoryProgress: any[] = [];

  ngOnInit(): void {
    const historyData = localStorage.getItem('readingHistory');
    this.history = historyData ? JSON.parse(historyData) : [];

    this.prepareChartData();
  }

  addHistory() {
    if (this.newEntry.category && this.newEntry.page && this.newEntry.line) {
      this.history.push({ ...this.newEntry });
      localStorage.setItem('readingHistory', JSON.stringify(this.history));
      this.newEntry = { category: '', page: '', line: '' };
      this.prepareChartData();
    }
  }

  prepareChartData() {
    const categoryMap: { [key: string]: { pages: number; lines: number } } = {};

    this.history.forEach(entry => {
      const category = entry.category;
      const page = Number(entry.page);
      const line = Number(entry.line);

      if (categoryMap[category]) {
        categoryMap[category].pages += page;
        categoryMap[category].lines += line;
      } else {
        categoryMap[category] = { pages: page, lines: line };
      }
    });

    this.categoryProgress = Object.keys(categoryMap).map(key => ({
      category: key,
      pagesRead: categoryMap[key].pages,
      linesRead: categoryMap[key].lines
    }));
  }

  logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}