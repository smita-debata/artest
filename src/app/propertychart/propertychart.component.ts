import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-propertychart',
  templateUrl: './propertychart.component.html',
  styleUrls: ['./propertychart.component.css']
})
export class PropertychartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    let option: any;

    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        top: 'center',
      },
      series: [
        {
          name: 'Property overview',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {
              value: 1048, name: 'Units', itemStyle: {
                color: ' #00b359'
              }
            },
            {
              value: 735, name: 'Standalone', itemStyle: {
                color: ' #ff751a'
              }
            },
            {
              value: 580, name: 'Apartments', itemStyle: {
                color: ' #0059b3'
              }
            },
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  }

}
