import { Component } from '@angular/core';
import { DialogTestComponent } from 'src/app/dialog-test/dialog-test.component';
import { 
  MatDialog
} from  '@angular/material';    
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentUser: User; 
  title = 'my-app';
 
  constructor(
    public dialog: MatDialog, 
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogTestComponent, {data: {name: 'Mihaela'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
  
