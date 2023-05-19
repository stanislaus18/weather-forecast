import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';

import { SelectionListComponent } from './selection-list.component';

const CustomSelectOptions: INgxSelectOptions = {
  optionValueField: 'id',
  optionTextField: 'name'
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule.forRoot(CustomSelectOptions)],
  declarations: [SelectionListComponent],
  exports: [SelectionListComponent]
})
export class SelectionUiModule { }
