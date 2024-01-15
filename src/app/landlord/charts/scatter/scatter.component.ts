import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Initialize the ECharts instance
    const chartDom = document.getElementById('opportunitiesChart') as HTMLDivElement;
    const myChart = echarts.init(chartDom);

    // Define data for the Opportunities related large-scale bar chart
    const categories = ['Property Upgrades', 'New Investments', 'Rent Increase', 'Tenant Relations'];
    const opportunitiesData = [1500, 1000, 800, 1200]; // Adjust as needed

    // Define the Opportunities related large-scale bar chart options
    const option = {
      title: {
        text: 'Opportunities',
        left: 'center'
      },
      xAxis: {
        type: 'value',
        name: 'Number of Opportunities'
      },
      yAxis: {
        type: 'category',
        data: categories
      },
      series: [{
        data: opportunitiesData,
        type: 'bar', // Use 'bar' type for a bar chart
        barWidth: '60%', // Adjust the width of the bars
        label: {
          show: true,
          position: 'inside' // Display labels inside the bars
        }
      }]
    };

    // Set the Opportunities related large-scale bar chart options and render the chart
    myChart.setOption(option);
  }
}


