import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {
  // dataPoints = [
  //   { label: "Saudi", y: 262, cornerRadius: 4 },
  //   { label: "Venezuela", y: 211, cornerRadius: 4 },
  //   { label: "Canada", y: 175, cornerRadius: 4 },
  //   { label: "Iran", y: 137, cornerRadius: 4 },
  //   { label: "Iraq", y: 115, cornerRadius: 4 },
  //   { label: "Kuwait", y: 104, cornerRadius: 4 },
  //   { label: "UAE", y: 97.8, cornerRadius: 4 },
  //   { label: "Russia", y: 60, cornerRadius: 4 },
  //   { label: "US", y: 23.3, cornerRadius: 4 },
  //   { label: "China", y: 20.4, cornerRadius: 4 }

  // ];
  // chartOptions = {
  //   animationEnabled: true,
  //   axisX: {
  //     labelAngle: -180
  //   },
  //   toolTip: {
  //     shared: true
  //   },
  //   legend: {
  //     cursor: "pointer",
  //     itemclick: function (e: any) {
  //       if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
  //         e.dataSeries.visible = false;
  //       }
  //       else {
  //         e.dataSeries.visible = true;
  //       }
  //       e.chart.render();
  //     }
  //   },
  //   data: [{
  //     type: "column",
  //     name: "Proven Oil Reserves (bn)",
  //     legendText: "Proven Oil Reserves",
  //     showInLegend: true,
  //     dataPoints: this.dataPoints.map((point) => ({
  //       label: point.label,
  //       y: point.y,
  //       cornerRadius: point.cornerRadius,
  //     })),
  //   }, {
  //     type: "column",
  //     name: "Oil Production (million/day)",
  //     legendText: "Oil Production",
  //     axisYType: "secondary",
  //     connectNullData: false,
  //     showInLegend: true,
  //     dataPoints: [
  //       { label: "Saudi", y: 11.15, cornerRadius: 10 },
  //       { label: "Venezuela", y: 2.5, cornerRadius: 10 },
  //       { label: "Canada", y: 3.6, cornerRadius: 10 },
  //       { label: "Iran", y: 4.2, cornerRadius: 10 },
  //       { label: "Iraq", y: 2.6, cornerRadius: 10 },
  //       { label: "Kuwait", y: 2.7, cornerRadius: 10 },
  //       { label: "UAE", y: 3.1, cornerRadius: 10 },
  //       { label: "Russia", y: 10.23, cornerRadius: 10 },
  //       { label: "US", y: 10.3, cornerRadius: 10 },
  //       { label: "China", y: 4.3, cornerRadius: 10 }
  //     ]
  //   }]
  // }
  @ViewChild('chartContainer', { static: true }) private chartContainer!: ElementRef;

  ngOnInit() {
    this.createRoundedBarChart();
  }

  createRoundedBarChart() {
    const data = [
      {
        category: '100',
        subgroups: [
          { label: 'Item 1', value: 20 },
          { label: 'Item 2', value: 35 },
        ],
      },
      {
        category: '200',
        subgroups: [
          { label: 'Item 1', value: 45 },
          { label: 'Item 2', value: 60 },
        ],
      },
      {
        category: '300',
        subgroups: [
          { label: 'Item 1', value: 45 },
          { label: 'Item 2', value: 60 },
        ],
      },
      {
        category: '400',
        subgroups: [
          { label: 'Item 1', value: 45 },
          { label: 'Item 2', value: 60 },
        ],
      },
      {
        category: '500',
        subgroups: [
          { label: 'Item 1', value: 45 },
          { label: 'Item 2', value: 60 },
        ],
      },
    ];
    const margin = { top: 20, right: 20, bottom: 30, left: 45 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x0 = d3.scaleBand().domain(data.map((d) => d.category)).range([0, width]).padding(0.3);
    const x1 = d3.scaleBand().domain(data[0].subgroups.map((d) => d.label)).range([0, x0.bandwidth()]).padding(0.2);
    const maxSubgroupValue = d3.max(data, (d) => d3.max(d.subgroups, (s) => s.value as number) || 0);
    const y = d3.scaleLinear<number>()
      .domain([0, maxSubgroupValue as number])
      .nice()
      .range([height, 0]);
    svg
      .selectAll('.bar-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (d) => `translate(${x0(d.category)},0)`)
      .selectAll('rect')
      .data((d) => d.subgroups)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x1(d.label) || 0)
      .attr('y', (d) => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('rx', 25) // Add rounded corners
      .attr('ry', 30)
      .attr('fill', (d: any) => {
        if (d.label === 'Item 1') {
          return ' rgb(196, 231, 241)';
        } else if (d.label === 'Item 2') {
          return '#e6ffff';
        } else {
          return 'red'; // Default color
        }
      })
      .on('mouseover', (event, d) => {
        // Show tooltip on mouseover
        this.showTooltip(event, d);
      })
      .on('mouseout', () => {
        // Hide tooltip on mouseout
        this.hideTooltip();
      })

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0));
    svg
      .select('.x-axis')
      .select('.domain') // Select the axis line element
      .attr('stroke', '#e6ffff') // Change the stroke color
      .attr('stroke-width', 5);
    // svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y));

  }
  private tooltip: any;
  constructor(private elementRef: ElementRef) {
    this.tooltip = d3
      .select(this.elementRef.nativeElement)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  }

  // Function to show the tooltip
  private showTooltip(event: any, d: any) {
    const xValue = d.label;
    const yValue = d.value;
    const tooltipContent = `X: ${xValue}, Y: ${yValue}`;
    const tooltipWidth = 100;
    const tooltipX = event.pageX - tooltipWidth / 2;
    const tooltipY = event.pageY - 40;
    this.tooltip.transition().duration(200).style('opacity', 0.9);
    this.tooltip
      .html(tooltipContent)
      .style('left', tooltipX + 'px')
      .style('top', tooltipY + 'px');
  }

  // Function to hide the tooltip
  private hideTooltip() {
    this.tooltip.transition().duration(500).style('opacity', 0);
  }


}

