import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {ProjectsStatsService} from "../_services/projects-stats.service";
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-projects-stats',
  templateUrl: './projects-stats.component.html',
  styleUrls: ['./projects-stats.component.css']
})
export class ProjectsStatsComponent implements OnInit {
  data: number[] = [];
  isError: boolean = false;
  projectsTypesData: ChartData<'pie'> = {
    labels: ['Bachelor', 'Mastery', 'Doctoral', 'Research'],
    datasets: []
  };

  archivedProjectsData: ChartData<'bar'> = {
    labels: [ 'Bachelor', 'Mastery', 'Doctoral', 'Research', 'ALL'],
    datasets: []
  };

  projectsTypesChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Projects Type Stats',
        color: 'white',
        font:{
          size: 20
        }
      },
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 15
          }
        }
      },
    },
  };

  archivedProjectsChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 15
          }
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Archived Projects',
        color: 'white',
        font:{
          size: 20
        }
      },
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 15
          }
        }
      },

    },
  };

  @ViewChildren(BaseChartDirective) chart?: QueryList<BaseChartDirective>;

  constructor(private projectsStatsService: ProjectsStatsService)
  {
  }

  ngOnInit(): void {

    this.projectsStatsService.fetchProjectsTypesStats().subscribe({
      next: value => {

        console.log(value);
        this.data.push(value.bachelorCount);
        this.data.push(value.masteryCount);
        this.data.push(value.doctoralCount);
        this.data.push(value.researchCount);

        this.projectsTypesData.datasets.push(
          { label: 'Projects', data: this.data });

        this.chart?.get(0)?.update();

      },
      error: err => {
        this.isError = true;
      }
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void
  {
    if(tabChangeEvent.index == 1)
      this.getArchivedProjectsData();


  }

  getArchivedProjectsData(): void
  {
    let archivedData: number[] = [];
    let savedData: number[] = [];
    //console.log("Fetching archived stats");
    this.projectsStatsService.fetchProjectsArchivedStats().subscribe({
      next: value => {
        console.log(value);
        savedData.push(value.bachelorCount);
        savedData.push(value.masteryCount);
        savedData.push(value.doctoralCount);
        savedData.push(value.researchCount);
        savedData.push(value.total);

        archivedData.push(value.bachelorArchivedCount);
        archivedData.push(value.masteryArchivedCount);
        archivedData.push(value.doctoralArchivedCount);
        archivedData.push(value.researchArchivedCount);
        archivedData.push(value.totalArchived);

        this.archivedProjectsData.datasets = [];
        this.archivedProjectsData.datasets.push({data: savedData, label: 'Saved'});
        this.archivedProjectsData.datasets.push({data: archivedData, label: 'Archived'});

        this.chart?.get(1)?.update();
      },
      error: err => {
        this.isError = true;
      }
    })
  }
}
