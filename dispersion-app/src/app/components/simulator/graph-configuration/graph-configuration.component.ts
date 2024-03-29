import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GraphType, hasNodeValueConstraint} from "../../../models/utils/GraphType";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Color, getFontColor, getHexByColor } from 'src/app/models/utils/Color';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './graph-configuration.html',
  styleUrls: ['./graph-configuration.component.css']
})
export class GraphConfigurationComponent implements OnInit {

  graphTypes = Object.keys(GraphType);
  colorTypes = Object.keys(Color);
  getFontColor = getFontColor;
  getHexByColor = getHexByColor;

  settingsFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              fb: FormBuilder,
              public dialogRef: MatDialogRef<GraphConfigurationComponent>) {
    this.settingsFormGroup = fb.group({
      graphType: new FormControl('', Validators.required),
      nodes: new FormControl(1, [Validators.min(1), this.data.automatedMode ? Validators.max(1000) : Validators.max(50), Validators.required]),
      colors: new FormControl('', Validators.required)
    });

    this.graphType.valueChanges.subscribe(res => {
      hasNodeValueConstraint(res, this.nodes);
    });

  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close({
      graphType: this.graphType.value,
      nodes: this.nodes.value,
      colors: this.colors.value
    });
  }

  /** Form Controls */

  get graphType(): FormControl {
    return this.settingsFormGroup.controls['graphType'] as FormControl;
  }

  get nodes(): FormControl {
    return this.settingsFormGroup.controls['nodes'] as FormControl;
  }

  get colors(): FormControl {
    return this.settingsFormGroup.controls['colors'] as FormControl;
  }

}
