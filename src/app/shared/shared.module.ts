import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from './shared.material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedMaterialModule
    ],
    declarations: [
    ],
    exports: [
        CommonModule,
        FormsModule,
        SharedMaterialModule
    ]
})
export class SharedModule { }
