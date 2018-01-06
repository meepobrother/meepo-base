import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { MeepoHistory } from '../../src/app/app';
import { StoreService } from 'meepo-store';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends MeepoHistory {
  constructor(
    store: StoreService,
    cd: ChangeDetectorRef,
    title: Title
  ) {
    super(store, cd, title);
  }
}
