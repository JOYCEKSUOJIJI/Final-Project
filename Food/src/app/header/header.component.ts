import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() selectPage: EventEmitter<string> = new EventEmitter<string>();
  isAuthenticated = false;
  private userSub!: Subscription;
  constructor(
    private datastorage: DataStorageService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  onSelect(text: string) {
    this.selectPage.emit(text);
  }
  onSaveData() {
    this.datastorage.storeRecipes();
  }

  onFetchData() {
    this.datastorage.fetchRecipes().subscribe();
  }
  onLogOut(){
    this.authservice.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
