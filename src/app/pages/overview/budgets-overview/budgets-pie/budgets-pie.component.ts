import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-budgets-pie',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './budgets-pie.component.html',
  styleUrl: './budgets-pie.component.css',
})
export class BudgetsPieComponent {
  title = 'ng2-charts-demo';
  green = '#277C78';
  cyan = '#82C9D7';
  yellow = '#F2CDAC';
  navy = '#626070';

  lightGreen = '#6c9c9a';
  lightCyan = '#acd6df';
  lightYellow = '#f1dac4';
  lightNavy = '#898893';

  // Doughnut
  // Labels (None currently)
  public doughnutChartLabels: string[] = [];
  // Data for doughnut chart with colors
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      {
        data: [50, 750, 75, 100],
        label: 'Series A',
        backgroundColor: [this.green, this.cyan, this.yellow, this.navy],
        weight: 1, // Thicker dataset
      },
      {
        data: [50, 750, 75, 100],
        label: 'Series A',
        backgroundColor: [
          this.lightGreen,
          this.lightCyan,
          this.lightYellow,
          this.lightNavy,
        ],
        weight: 0.5, // Thinner dataset
      },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to adjust its size based on the container
    cutout: '65%', // Adjust this value for the center size
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 0, // Remove border between segments
      },
    },
    datasets: {
      doughnut: {
        spacing: 0, // Reduce or remove gap between datasets (set to 0 to remove completely)
      },
    },
  };
}
