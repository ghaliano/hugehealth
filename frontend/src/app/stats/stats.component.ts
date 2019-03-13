import { Component, OnInit } from '@angular/core';
import {StatsService} from "../services/stats.service";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  data: Array<any> = [];

  constructor(private stats: StatsService) { }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public specialityChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public doctorChartData: ChartDataSets[] = [
    { data: [], label: 'Count rdvs' },
    { data: [], label: 'Count patients' }
  ];


  public specialityChartData: ChartDataSets[] = [
    { data: [], label: 'Count Specialities' }
  ];


  ngOnInit() {
    this.stats.getDoctorStats().subscribe((result: any) => {
      const clone = JSON.parse(JSON.stringify(this.doctorChartData));

      result.forEach((el) => {
        this.barChartLabels.push(el.firstname);
        clone[0].data.push(el.rdv_count);
        clone[1].data.push(el.patient_count);
      });

      this.doctorChartData = clone;
    });

    this.stats.getSpecialityStats().subscribe((result: any) => {
      const clone = JSON.parse(JSON.stringify(this.specialityChartData));

      result.forEach((el) => {
        this.specialityChartLabels.push(el.name);
        clone[0].data.push(el.patient_count);
      });

      this.specialityChartData = clone;
    });
  }
}
