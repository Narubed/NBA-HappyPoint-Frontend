// ===========================|| DASHBOARD - BAJAJ AREA CHART ||=========================== //

const chartData = {
  type: 'area',
  height: 95,
  options: {
    chart: {
      id: 'support-chart',
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: 'Ticket '
      },
      marker: {
        show: false
      }
    }
  },
  series: [
    {
      name: 'รับเข้า',
      data: [0, 15, 180, 50, 30, 40, 125]
    }
  ]
};

export default chartData;
