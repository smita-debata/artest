import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const chartDom = document.getElementById('timeSpentChart') as HTMLDivElement;
    const myChart = echarts.init(chartDom);

    // Define data for time spent management as a list of objects
    const data = [
      { value: 20, name: 'Property 1' },
      { value: 10, name: 'Property 2' },
      { value: 15, name: 'Property 3' },
      { value: 30, name: 'Property 4' }
    ];

    // Define the time spent management pie chart options
    const option = {
      title: {
        text: 'Time Spent Management',
        subtext: 'By Property',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} hours ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Property 1', 'Property 2', 'Property 3', 'Property 4']
      },
      series: [
        {
          name: 'Time Spent',
          type: 'pie',
          radius: '50%',
          center: ['50%', '60%'],
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    // Set the pie chart options and render the chart
    myChart.setOption(option);
  }


}
