import { Component, OnInit } from '@angular/core';
import {graphTypes} from "../../models/types/GraphType";
import {FormControl, Validators} from "@angular/forms";
import {algorithmTypes} from "../../models/types/AlgorithmType";
import {VisualizationService} from "../../services/server-side/visualization/visualization.service";
import {SnackbarService} from "../../services/client-side/utils/snackbar.service";

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  graphTypes = graphTypes;
  graphType = new FormControl('', [Validators.required]);

  algorithmTypes = algorithmTypes;
  algorithmType = new FormControl('', [Validators.required]);

  groupBy = new FormControl('nodes', [Validators.required]);

  LOADING = false;

  result: any;

  constructor(private visualizationService: VisualizationService,
              private snackBarService: SnackbarService) { }

  ngOnInit(): void {
  }

  query(): void {
    this.LOADING = true;
    this.visualizationService.groupBy(this.algorithmType.value, this.graphType.value, this.groupBy.value)
      .subscribe(res => {
        this.result = Object(JSON.stringify(res));
        console.log(this.result);
        setTimeout(() => this.LOADING = false, 1000);
      }, err => {
        console.log(err);
        this.snackBarService.openSnackBar('SERVER_ERROR', 'error-snackbar');
      });
  }

}
