import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [UserService]
})
export class CoreModule {}
