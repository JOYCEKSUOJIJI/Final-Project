import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user!: { name: string; id: number };
  paramsSubscription!: Subscription;
  constructor(private route: ActivatedRoute) {}
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
    /**
     * it will change well for the first time visit this page, but will not change when we are on this page.
     */

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });

    /**
     * this is a observable which will listen to changes even when we are on this page.
     */
  }
}
