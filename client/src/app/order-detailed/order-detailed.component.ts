import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders/orders.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Order } from '../shared/models/order';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order?: Order;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private bsService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id &&
      this.orderService.getOrderDetailed(+id).subscribe({
        next: (order) => {
          this.order = order;
          this.bsService.set(
            '@OrderDetailed', `Order# ${order.id} - ${order.status}`
          );
        },
      });
  }
}
