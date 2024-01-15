import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chartbar',
  templateUrl: './chartbar.component.html',
  styleUrls: ['./chartbar.component.css']
})
export class ChartbarComponent implements OnInit {
  chart!: echarts.ECharts;

  constructor() { }

  ngOnInit(): void {
    this.chart = echarts.init(document.getElementById('myChart') as HTMLDivElement);
    this.createChart();
  }

  createChart() {
    const options: echarts.EChartsOption = {
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Y-axis Values',
          type: 'bar',
          data: [65, 59, 80, 81, 56, 55, 40, 70, 80, 60, 45, 30],
          itemStyle: {
            color: 'rgb(196, 231, 241)',
          },
        },
      ],
    };

    this.chart.setOption(options);
  }
}
