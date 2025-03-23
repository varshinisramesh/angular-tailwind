import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, DragDropModule],
  providers: [StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
