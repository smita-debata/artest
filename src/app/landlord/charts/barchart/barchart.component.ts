import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const chartDom = document.getElementById('investmentsChart') as HTMLDivElement;
    const myChart = echarts.init(chartDom);

    // Define data for the Investments related bar chart
    const xAxisData = ['January', 'February', 'March', 'April', 'May', 'June'];
    const investmentsData = [5000, 6000, 7500, 9000, 11000, 12500]; // Adjust as needed

    // Define the Investments related bar chart options
    const option = {
      title: {
        text: 'Investments',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        name: '        Investments (USD)'
      },
      series: [{
        data: investmentsData,
        type: 'bar', // Use 'bar' type for a bar chart
      }]
    };

    // Set the Investments related bar chart options and render the chart
    myChart.setOption(option);
  }
}



