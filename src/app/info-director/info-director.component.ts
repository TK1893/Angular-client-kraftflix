// src\app\info-director\info-director.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-director',
  templateUrl: './info-director.component.html',
  styleUrl: './info-director.component.scss',
})

// COMPONENT  (InfoDirectorComponent)
// ----------------------------------------------------------------------------------------------------------
export class InfoDirectorComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
    },
    public dialogRef: MatDialogRef<InfoDirectorComponent>
  ) {}

  //  NG-ON-INIT /////////////////////////////
  ngOnInit(): void {}

  closeDialogBox(): void {
    this.dialogRef.close();
  }
}
