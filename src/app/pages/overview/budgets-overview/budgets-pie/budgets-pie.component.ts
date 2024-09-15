import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, Chart, Plugin } from 'chart.js';

// Define your custom plugin
const centerTextPlugin: Plugin<'doughnut'> = {
  id: 'centerTextPlugin',
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.save();

    // Set text properties
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#201F24'; // Text color
    ctx.font = '700 32px Public Sans'; // Text font and size

    // Define the text to be displayed
    const text = '$338';
    const firstTextY = centerY; // Move this slightly up

    // Draw the text in the center
    ctx.fillText(text, centerX, firstTextY);

    // Set properties for the second text
    ctx.fillStyle = '#696868'; // Text color for the second text
    ctx.font = '400 12px Public Sans'; // Normal weight, 16px font size

    // Second text (with an 8px gap between the two lines)
    const secondText = 'of $975 limit';
    const secondTextY = firstTextY + 20 + 8; // 20px for first text size, 8px gap
    ctx.fillText(secondText, centerX, secondTextY);

    ctx.restore();
  },
};

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
  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      {
        data: [50, 750, 75, 100],
        label: 'Series A',
        backgroundColor: [this.green, this.cyan, this.yellow, this.navy],
        weight: 1,
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
        weight: 0.5,
      },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    datasets: {
      doughnut: {
        spacing: 0,
      },
    },
  };

  // Register the plugin
  constructor() {
    Chart.register(centerTextPlugin);
  }
}
