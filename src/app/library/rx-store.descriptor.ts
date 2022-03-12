import {uuidGenerate} from './uuid-generator.function';

export class RxStoreDescriptor<T> {
  public readonly description: string;
  public readonly id: string;
  public readonly type!: T;

  constructor(description: string) {
    this.description = description;
    this.id = uuidGenerate();
  }
}
