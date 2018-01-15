import {
    Component, OnInit,
    ChangeDetectorRef, Input,
    Optional, Injector
} from '@angular/core';
import { Meepo } from './meepo';
import { StoreService } from 'meepo-store';
import { Title } from '@angular/platform-browser';

export class MeepoHistory extends Meepo {
    key: string = '';

    // 历史数据
    @Input() page: number = 1;
    @Input() psize: number = 10;
    @Input() max: number = 50;
    data: any[] = [];

    pageTitle: string;
    constructor(
        public injector: Injector
    ) {
        super(injector);
    }

    meepoOnInit() {
        if (this.store) {
            this.data = this.store.getList(this.key, this.page, this.psize);
            if (this.pageTitle) {
                this.title && this.title.setTitle(this.pageTitle);
            }
        }
        super.meepoOnInit();
    }


    addItem(e: any) {
        this.data.unshift(e);
        this.data = this.data.splice(0, this.max);
        this.store.set(this.key, this.data);
        this.onAddItem(e);
    }

    onAddItem(e: any) {

    }

    removeItem(e: any) {
        let index = this.data.indexOf(e);
        this.data.splice(index, 1);
        this.store.set(this.key, this.data);
        this.onRemoveItem(e);
    }

    onRemoveItem(e: any) {

    }
}
