import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';

const target = process.env.ROLLUP_TARGET || 'esm';

let globals = {
    '@angular/animations': 'ng.animations',
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/common/http': 'ng.common.http',
    '@angular/router': 'ng.router',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-server': 'ng.platformServer',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
    '@angular/core/testing': 'ng.core.testing',
    '@angular/common/testing': 'ng.common.testing',
    '@angular/common/http/testing': 'ng.common.http.testing',

    '@angular/cdk': 'ng.cdk',
    '@angular/cdk/keycodes': 'ng.cdk.keycodes',
    '@angular/cdk/a11y': 'ng.cdk.a11y',
    '@angular/cdk/accordion': 'ng.cdk.accordion',
    '@angular/cdk/bidi': 'ng.cdk.bidi',
    '@angular/cdk/coercion': 'ng.cdk.coercion',
    '@angular/cdk/collections': 'ng.cdk.collections',
    '@angular/cdk/layout': 'ng.cdk.layout',
    '@angular/cdk/observers': 'ng.cdk.observers',
    '@angular/cdk/overlay': 'ng.cdk.overlay',
    '@angular/cdk/platform': 'ng.cdk.platform',
    '@angular/cdk/portal': 'ng.cdk.portal',
    '@angular/cdk/scrolling': 'ng.cdk.scrolling',
    '@angular/cdk/stepper': 'ng.cdk.stepper',
    '@angular/cdk/table': 'ng.cdk.table',

    'moment': 'moment',
    'moment/locale/zh-cn': null,

    'rxjs/Observer': 'Rx',
    'rxjs/Subscriber': 'Rx',
    'rxjs/Scheduler': 'Rx',

    'rxjs/observable/combineLatest': 'Rx.Observable',
    'rxjs/observable/throw': 'Rx.Observable',
    'rxjs/observable/defer': 'Rx.Observable',
    'rxjs/observable/fromEventPattern': 'Rx.Observable',
    'rxjs/observable/empty': 'Rx.Observable',

    'rxjs/operators/finalize': 'Rx.Observable',
    'rxjs/operators/catchError': 'Rx.Observable',
    'rxjs/operators/combineLatest': 'Rx.Observable',

    'rxjs/add/observable/merge': 'Rx.Observable',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable',
    'rxjs/add/observable/interval': 'Rx.Observable',
    'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/observable/bindCallback': 'Rx.Observable.prototype',
    'rxjs/add/observable/bindNodeCallback': 'Rx.Observable.prototype',
    'rxjs/add/observable/combineLatest': 'Rx.Observable.prototype',
    'rxjs/add/observable/concat': 'Rx.Observable.prototype',
    'rxjs/add/observable/defer': 'Rx.Observable.prototype',
    'rxjs/add/observable/empty': 'Rx.Observable.prototype',
    'rxjs/add/observable/forkJoin': 'Rx.Observable.prototype',
    'rxjs/add/observable/from': 'Rx.Observable.prototype',
    'rxjs/add/observable/fromEventPattern': 'Rx.Observable.prototype',
    'rxjs/add/observable/fromPromise': 'Rx.Observable.prototype',
    'rxjs/add/observable/generate': 'Rx.Observable.prototype',
    'rxjs/add/observable/if': 'Rx.Observable.prototype',
    'rxjs/add/observable/race': 'Rx.Observable.prototype',
    'rxjs/add/observable/never': 'Rx.Observable.prototype',
    'rxjs/add/observable/onErrorResumeNext': 'Rx.Observable.prototype',
    'rxjs/add/observable/pairs': 'Rx.Observable.prototype',
    'rxjs/add/observable/range': 'Rx.Observable.prototype',
    'rxjs/add/observable/using': 'Rx.Observable.prototype',
    'rxjs/add/observable/throw': 'Rx.Observable.prototype',
    'rxjs/add/observable/timer': 'Rx.Observable.prototype',
    'rxjs/add/observable/zip': 'Rx.Observable.prototype',
    'rxjs/add/observable/dom/ajax': 'Rx.Observable.prototype',
    'rxjs/add/observable/dom/webSocket': 'Rx.Observable.prototype',
    'rxjs/add/operator/buffer': 'Rx.Observable.prototype',
    'rxjs/add/operator/bufferCount': 'Rx.Observable.prototype',
    'rxjs/add/operator/bufferTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/bufferToggle': 'Rx.Observable.prototype',
    'rxjs/add/operator/bufferWhen': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
    'rxjs/add/operator/combineAll': 'Rx.Observable.prototype',
    'rxjs/add/operator/combineLatest': 'Rx.Observable.prototype',
    'rxjs/add/operator/concat': 'Rx.Observable.prototype',
    'rxjs/add/operator/concatAll': 'Rx.Observable.prototype',
    'rxjs/add/operator/concatMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/concatMapTo': 'Rx.Observable.prototype',
    'rxjs/add/operator/count': 'Rx.Observable.prototype',
    'rxjs/add/operator/dematerialize': 'Rx.Observable.prototype',
    'rxjs/add/operator/debounce': 'Rx.Observable.prototype',
    'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/defaultIfEmpty': 'Rx.Observable.prototype',
    'rxjs/add/operator/delay': 'Rx.Observable.prototype',
    'rxjs/add/operator/delayWhen': 'Rx.Observable.prototype',
    'rxjs/add/operator/distinct': 'Rx.Observable.prototype',
    'rxjs/add/operator/distinctUntilChanged': 'Rx.Observable.prototype',
    'rxjs/add/operator/distinctUntilKeyChanged': 'Rx.Observable.prototype',
    'rxjs/add/operator/do': 'Rx.Observable.prototype',
    'rxjs/add/operator/exhaust': 'Rx.Observable.prototype',
    'rxjs/add/operator/exhaustMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/expand': 'Rx.Observable.prototype',
    'rxjs/add/operator/elementAt': 'Rx.Observable.prototype',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
    'rxjs/add/operator/finally': 'Rx.Observable.prototype',
    'rxjs/add/operator/find': 'Rx.Observable.prototype',
    'rxjs/add/operator/findIndex': 'Rx.Observable.prototype',
    'rxjs/add/operator/first': 'Rx.Observable.prototype',
    'rxjs/add/operator/groupBy': 'Rx.Observable.prototype',
    'rxjs/add/operator/ignoreElements': 'Rx.Observable.prototype',
    'rxjs/add/operator/isEmpty': 'Rx.Observable.prototype',
    'rxjs/add/operator/audit': 'Rx.Observable.prototype',
    'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/last': 'Rx.Observable.prototype',
    'rxjs/add/operator/let': 'Rx.Observable.prototype',
    'rxjs/add/operator/every': 'Rx.Observable.prototype',
    'rxjs/add/operator/mapTo': 'Rx.Observable.prototype',
    'rxjs/add/operator/materialize': 'Rx.Observable.prototype',
    'rxjs/add/operator/max': 'Rx.Observable.prototype',
    'rxjs/add/operator/merge': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeAll': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMapTo': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeScan': 'Rx.Observable.prototype',
    'rxjs/add/operator/min': 'Rx.Observable.prototype',
    'rxjs/add/operator/multicast': 'Rx.Observable.prototype',
    'rxjs/add/operator/observeOn': 'Rx.Observable.prototype',
    'rxjs/add/operator/onErrorResumeNext': 'Rx.Observable.prototype',
    'rxjs/add/operator/pairwise': 'Rx.Observable.prototype',
    'rxjs/add/operator/partition': 'Rx.Observable.prototype',
    'rxjs/add/operator/pluck': 'Rx.Observable.prototype',
    'rxjs/add/operator/publish': 'Rx.Observable.prototype',
    'rxjs/add/operator/publishBehavior': 'Rx.Observable.prototype',
    'rxjs/add/operator/publishReplay': 'Rx.Observable.prototype',
    'rxjs/add/operator/publishLast': 'Rx.Observable.prototype',
    'rxjs/add/operator/race': 'Rx.Observable.prototype',
    'rxjs/add/operator/reduce': 'Rx.Observable.prototype',
    'rxjs/add/operator/repeat': 'Rx.Observable.prototype',
    'rxjs/add/operator/repeatWhen': 'Rx.Observable.prototype',
    'rxjs/add/operator/retry': 'Rx.Observable.prototype',
    'rxjs/add/operator/retryWhen': 'Rx.Observable.prototype',
    'rxjs/add/operator/sample': 'Rx.Observable.prototype',
    'rxjs/add/operator/sampleTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/scan': 'Rx.Observable.prototype',
    'rxjs/add/operator/sequenceEqual': 'Rx.Observable.prototype',
    'rxjs/add/operator/share': 'Rx.Observable.prototype',
    'rxjs/add/operator/shareReplay': 'Rx.Observable.prototype',
    'rxjs/add/operator/single': 'Rx.Observable.prototype',
    'rxjs/add/operator/skip': 'Rx.Observable.prototype',
    'rxjs/add/operator/skipLast': 'Rx.Observable.prototype',
    'rxjs/add/operator/skipUntil': 'Rx.Observable.prototype',
    'rxjs/add/operator/skipWhile': 'Rx.Observable.prototype',
    'rxjs/add/operator/subscribeOn': 'Rx.Observable.prototype',
    'rxjs/add/operator/switch': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMapTo': 'Rx.Observable.prototype',
    'rxjs/add/operator/take': 'Rx.Observable.prototype',
    'rxjs/add/operator/takeLast': 'Rx.Observable.prototype',
    'rxjs/add/operator/takeUntil': 'Rx.Observable.prototype',
    'rxjs/add/operator/takeWhile': 'Rx.Observable.prototype',
    'rxjs/add/operator/throttle': 'Rx.Observable.prototype',
    'rxjs/add/operator/throttleTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/timeInterval': 'Rx.Observable.prototype',
    'rxjs/add/operator/timeout': 'Rx.Observable.prototype',
    'rxjs/add/operator/timeoutWith': 'Rx.Observable.prototype',
    'rxjs/add/operator/timestamp': 'Rx.Observable.prototype',
    'rxjs/add/operator/toArray': 'Rx.Observable.prototype',
    'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/add/operator/window': 'Rx.Observable.prototype',
    'rxjs/add/operator/windowCount': 'Rx.Observable.prototype',
    'rxjs/add/operator/windowTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/windowToggle': 'Rx.Observable.prototype',
    'rxjs/add/operator/windowWhen': 'Rx.Observable.prototype',
    'rxjs/add/operator/withLatestFrom': 'Rx.Observable.prototype',
    'rxjs/add/operator/zip': 'Rx.Observable.prototype',
    'rxjs/add/operator/zipAll': 'Rx.Observable.prototype',


    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/Subscription': 'Rx',
    'rxjs/observable/fromPromise': 'Rx.Observable',
    'rxjs/observable/forkJoin': 'Rx.Observable',
    'rxjs/observable/fromEvent': 'Rx.Observable',
    'rxjs/observable/merge': 'Rx.Observable',
    'rxjs/observable/of': 'Rx.Observable',

    // Legacy operators used by 3rd packages like @angular/core
    'rxjs/operator/auditTime': 'Rx.Observable.prototype',
    'rxjs/operator/catch': 'Rx.Observable.prototype',
    'rxjs/operator/debounceTime': 'Rx.Observable.prototype',
    'rxjs/operator/delay': 'Rx.Observable.prototype',
    'rxjs/operator/distinctUntilChanged': 'Rx.Observable.prototype',
    'rxjs/operator/do': 'Rx.Observable.prototype',
    'rxjs/operator/filter': 'Rx.Observable.prototype',
    'rxjs/operator/finally': 'Rx.Observable.prototype',
    'rxjs/operator/first': 'Rx.Observable.prototype',
    'rxjs/operator/map': 'Rx.Observable.prototype',
    'rxjs/operator/pluck': 'Rx.Observable.prototype',
    'rxjs/operator/share': 'Rx.Observable.prototype',
    'rxjs/operator/startWith': 'Rx.Observable.prototype',
    'rxjs/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/operator/takeUntil': 'Rx.Observable.prototype',
    'rxjs/operator/throttleTime': 'Rx.Observable.prototype',

    // Operators with chain-functionality itself (from rxjs 5.x) used by us
    'rxjs/operators/auditTime': 'Rx.Observable.prototype',
    'rxjs/operators/catch': 'Rx.Observable.prototype',
    'rxjs/operators/debounceTime': 'Rx.Observable.prototype',
    'rxjs/operators/delay': 'Rx.Observable.prototype',
    'rxjs/operators/distinctUntilChanged': 'Rx.Observable.prototype',
    'rxjs/operators/do': 'Rx.Observable.prototype',
    'rxjs/operators/filter': 'Rx.Observable.prototype',
    'rxjs/operators/finally': 'Rx.Observable.prototype',
    'rxjs/operators/first': 'Rx.Observable.prototype',
    'rxjs/operators/map': 'Rx.Observable.prototype',
    'rxjs/operators/pluck': 'Rx.Observable.prototype',
    'rxjs/operators/share': 'Rx.Observable.prototype',
    'rxjs/operators/startWith': 'Rx.Observable.prototype',
    'rxjs/operators/switchMap': 'Rx.Observable.prototype',
    'rxjs/operators/takeUntil': 'Rx.Observable.prototype',
    'rxjs/operators/throttleTime': 'Rx.Observable.prototype',
    'rxjs/operators/tap': 'Rx.Observable.prototype',

    "meepo-axios": "meepo-axios",
    "meepo-base": "meepo-base",
    "meepo-base64": "meepo-base64",
    "meepo-core": "meepo-core",
    "meepo-event": "meepo-event",
    "meepo-icons": "meepo-icons",
    "meepo-loader": "meepo-loader",
    "meepo-permissions": "meepo-permissions",
    "meepo-popover": "meepo-popover",
    "meepo-store": "meepo-store",
    "meepo-uuid": "meepo-uuid",
    "meepo-xscroll": "meepo-xscroll",
    "meepo-empty": "meepo-empty",
    'angular-web-storage': 'angular-web-storage'
};

let plugins = [
    sourcemaps(),
    replace({ "import * as moment": "import moment" }),
    resolve(),
];

switch (target) {
    case 'esm':
        Object.assign(globals, {
            'tslib': 'tslib',
        });
        break;
    case 'mumd':
        plugins.push(uglify());
        break;
}

export default {
    exports: 'named',
    name: 'meepo-base',
    plugins,
    external: Object.keys(globals),
    globals,
    sourceMap: true,
}