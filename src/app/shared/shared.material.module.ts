import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MdInputModule, MdCheckboxModule, MdSelectModule, MdSidenavModule, MdToolbarModule,
  MdRadioModule, MdCardModule, MdButtonModule, MdIconModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MdInputModule, MdCheckboxModule, MdSelectModule, MdSidenavModule, MdToolbarModule,
    MdRadioModule, MdCardModule, MdButtonModule, MdIconModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MdInputModule, MdCheckboxModule, MdSelectModule, MdSidenavModule, MdToolbarModule,
    MdRadioModule, MdCardModule, MdButtonModule, MdIconModule
  ]
})
export class SharedMaterialModule { }
