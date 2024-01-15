import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-linchart',
  templateUrl: './linchart.component.html',
  styleUrls: ['./linchart.component.css']
})
export class LinchartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const chartDom = document.getElementById('netWorthChart') as HTMLDivElement;
    const myChart = echarts.init(chartDom);

    // Define data for the Total Net Worth graph
    const xAxisData = ['January', 'February', 'March', 'April', 'May', 'June'];
    const netWorthData = [10000, 12000, 15000, 18000, 22000, 25000]; // Adjust as needed

    // Define the Total Net Worth graph options
    const option = {
      title: {
        text: 'Total Net Worth',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        name: 'Net Worth (USD)'
      },
      series: [{
        data: netWorthData,
        type: 'line',
        smooth: true
      }]
    };

    // Set the Total Net Worth graph options and render the chart
    myChart.setOption(option);
  }
}


