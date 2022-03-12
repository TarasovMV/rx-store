import {Component, OnInit} from '@angular/core';
import {RxStoreService} from './library/rx-store.service';
import {RxStoreDescriptor} from './library/rx-store.descriptor';

interface ITest {
  a: string;
  b: number;
}
const TEST_DESCRIPTOR: RxStoreDescriptor<ITest> = new RxStoreDescriptor<ITest>('test descriptor')


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rx-store';

  constructor(private rxStore: RxStoreService) {}

  ngOnInit(): void {
    this.rxStore.setState(TEST_DESCRIPTOR, {a: 'test', b: 1});

    let subState;
    this.rxStore.getState$(TEST_DESCRIPTOR).subscribe(x => subState = x);
    const streamCurrent = this.rxStore.getStoreState$(TEST_DESCRIPTOR).getValue?.();
    const current = this.rxStore.getCurrent(TEST_DESCRIPTOR)

    console.log('current', current);
    console.log('streamCurrent', streamCurrent);
    console.log('subState', subState);
  }
}
