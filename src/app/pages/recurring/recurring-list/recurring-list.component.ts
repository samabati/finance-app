import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../components/shared/search-bar/search-bar.component';
import { SortByComponent } from '../../../components/shared/sort-by/sort-by.component';
import { RecurringListItemComponent } from './recurring-list-item/recurring-list-item.component';

@Component({
  selector: 'app-recurring-list',
  standalone: true,
  imports: [SearchBarComponent, SortByComponent, RecurringListItemComponent],
  templateUrl: './recurring-list.component.html',
  styleUrl: './recurring-list.component.css',
})
export class RecurringListComponent {
  data = [
    {
      avatar: '/assets/images/avatars/spark-electric-solutions.jpg',
      name: 'Spark Electric Solutions',
      date: 'Monthly-2nd',
      icon: 'green',
      amount: 100,
    },
    {
      avatar: '/assets/images/avatars/serenity-spa-and-wellness.jpg',
      name: 'Serenity Spa & Wellness',
      date: 'Monthly-3rd',
      icon: 'green',
      amount: 30,
    },
    {
      avatar: '/assets/images/avatars/elevate-education.jpg',
      name: 'Elevate Education',
      date: 'Monthly-4th',
      icon: 'green',
      amount: 50,
    },
    {
      avatar: '/assets/images/avatars/pixel-playground.jpg',
      name: 'Pixel Playground',
      date: 'Monthly-11th',
      icon: 'green',
      amount: 10,
    },
    {
      avatar: '/assets/images/avatars/nimbus-data-storage.jpg',
      name: 'Nimbus Data Storage',
      date: 'Monthly-21st',
      icon: 'red',
      amount: 9.99,
    },
    {
      avatar: '/assets/images/avatars/bytewise.jpg',
      name: 'ByteWise',
      date: 'Monthly-23rd',
      icon: 'red',
      amount: 49.99,
    },
    {
      avatar: '/assets/images/avatars/ecofuel-energy.jpg',
      name: 'EcoFuel Energy',
      date: 'Monthly-29th',
      icon: 'none',
      amount: 35,
    },
    {
      avatar: '/assets/images/avatars/aqua-flow-utilities.jpg',
      name: 'Aqua Flow Utilities',
      date: 'Monthly-30th',
      icon: 'none',
      amount: 100,
    },
  ];
}
