//Common Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdCardModule } from '@angular/material';
import {EntityModule} from '../common/entity/entity.module';
//Component Modules
import { GuideComponent } from './guide.component';
import { routing } from './guide.routing';

@NgModule({
  imports: [routing, MaterialModule, MdCardModule],
  declarations: [
    GuideComponent
  ],
  providers: []
})
export class GuideModule {}
