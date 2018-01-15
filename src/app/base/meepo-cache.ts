import {
    Input, Injector,
    OnInit, OnDestroy
} from '@angular/core';
import { Meepo, BaseInter } from './meepo';
import { Subject } from "rxjs/Subject";
import { StoreService } from 'meepo-store';
import { Title } from '@angular/platform-browser';

export class MeepoCache extends Meepo implements DetailInter, BaseInter {
    key: string;
    data: any = {};

    observers: any[] = [];
    pageTitle: string;

    constructor(
        public injector: Injector
    ) {
        super(injector);
    }

    public updateData(res) {
        this.data = res;
        if (this.data['title']) {
            this.title && this.title.setTitle(this.data['title']);
        }
        if (this.pageTitle) {
            this.title && this.title.setTitle(this.pageTitle);
        }
    }

    public meepoOnInit() {
        let data = this.store.get(`${this.key}`);
        if (data) {
            this.data = data;
            if (this.data['title']) {
                this.title && this.title.setTitle(this.data['title']);
            }
            if (this.pageTitle) {
                this.title && this.title.setTitle(this.pageTitle);
            }
        }
        super.meepoOnInit();
    }

    public updateCache(data: any) {
        let cacheData = this.store.get(`${this.key}`);
        if (data === cacheData) {
        } else {
            this.store.set(`${this.key}`, data);
            this.updateData(data);
        }
    }
}

export interface DetailInter extends OnInit, OnDestroy {
    key: string;
    data: any;
    updateCache(data: any): void;
}
