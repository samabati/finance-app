import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, Chart, Plugin } from 'chart.js';
import { BudgetsService } from '../../../../services/budgets/budgets.service';
import { Subscription } from 'rxjs';
import { Budget } from '../../../../types/budget';
import tinycolor from 'tinycolor2';

@Component({
  selector: 'app-budgets-pie',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './budgets-pie.component.html',
  styleUrl: './budgets-pie.component.css',
})
export class BudgetsPieComponent implements OnInit, OnDestroy {
  budgetService = inject(BudgetsService);
  totalMax!: number;
  totalSpent!: number;
  subscription!: Subscription;
  budgets!: Budget[];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
    this.subscription = this.budgetService.budgets$.subscribe((budgets) => {
      this.budgets = budgets;
      this.updateChartData();
      this.chart?.chart?.update(); // Update the chart after setting new data
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateChartData(): void {
    let localMax = 0;
    let localSpent = 0;

    this.budgets.forEach((budget) => {
      localMax += budget.max;
      localSpent += budget.spent;
    });
    this.totalMax = localMax;
    this.totalSpent = localSpent;

    // Update datasets
    this.doughnutChartDatasets = [
      {
        data: this.budgets.map((budget) => budget.max),
        backgroundColor: this.budgets.map((budget) => budget.theme.color),
        weight: 1,
      },
      {
        data: this.budgets.map((budget) => budget.max),
        backgroundColor: this.budgets
          .map((budget) => budget.theme.color)
          .map((color) => this.lightenColor(color)),
        weight: 0.5,
      },
    ];
  }

  // Define your custom plugin
  centerTextPlugin: Plugin<'doughnut'> = {
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
      const text = `$${this.totalSpent.toFixed(0)}`;
      const firstTextY = centerY; // Move this slightly up

      // Draw the text in the center
      ctx.fillText(text, centerX, firstTextY);

      // Set properties for the second text
      ctx.fillStyle = '#696868'; // Text color for the second text
      ctx.font = '400 12px Public Sans'; // Normal weight, 16px font size

      // Second text (with an 8px gap between the two lines)
      const secondText = `of $${this.totalMax.toFixed(0)} limit`;
      const secondTextY = firstTextY + 20 + 8; // 20px for first text size, 8px gap
      ctx.fillText(secondText, centerX, secondTextY);

      ctx.restore();
    },
  };

  lightenColor = (color: string): string => {
    let tc = tinycolor(color);
    return tc
      .lighten(9) // Increase lightness
      .saturate(0) // Decrease saturation
      .toHexString(); // Convert to hex string
  };

  // Doughnut chart options
  public doughnutChartLabels: string[] = [];

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
    Chart.register(this.centerTextPlugin);
  }
}
