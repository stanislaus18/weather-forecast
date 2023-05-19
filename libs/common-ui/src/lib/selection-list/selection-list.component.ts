import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { INgxSelectOption } from 'ngx-select-ex';

@Component({
  selector: 'common-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss'],
})
export class SelectionListComponent implements OnDestroy {
  @Input() items!: string[];

  @Output() selectedItem$ = new EventEmitter<string>();

  public ngxControl = new FormControl();

  private _ngxDefaultTimeout;
  private _ngxDefaultInterval: number | undefined;
  private _ngxDefault: string | undefined;

  constructor() {
      this._ngxDefaultTimeout = setTimeout(() => {
          this._ngxDefaultInterval = setInterval(() => {
              const idx = Math.floor(Math.random() * (this.items.length - 1));
              this._ngxDefault = this.items[idx];
              // console.log('new default value = ', this._ngxDefault);
          }, 2000);
      }, 2000);
  }

  public ngOnDestroy(): void {
      clearTimeout(this._ngxDefaultTimeout);
      clearInterval(this._ngxDefaultInterval);
  }

  public doNgxDefault(): any {
      return this._ngxDefault;
  }

  public doSelect(value: string) {
    this.selectedItem$.emit(value);
  }

  public inputTyped = (source: string, text: string) => console.log('SingleDemoComponent.inputTyped', source, text);

  public doFocus = () => console.log('SingleDemoComponent.doFocus');

  public doBlur = () => console.log('SingleDemoComponent.doBlur');

  public doOpen = () => console.log('SingleDemoComponent.doOpen');

  public doClose = () => console.log('SingleDemoComponent.doClose');

  public doRemove = (value: any) => console.log('SingleDemoComponent.doRemove', value);

  public doSelectOptions = (options: INgxSelectOption[]) => console.log('SingleDemoComponent.doSelectOptions', options);
}