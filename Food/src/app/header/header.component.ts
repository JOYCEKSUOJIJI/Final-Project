import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() selectPage: EventEmitter<string> = new EventEmitter<string>();
  constructor(private datastorage: DataStorageService) {}

  ngOnInit(): void {}
  onSelect(text: string) {
    this.selectPage.emit(text);
  }
  onSaveData(){
    this.datastorage.storeRecipes();
  }

  onFetchData(){
    this.datastorage.fetchRecipes().subscribe();
  }
}
