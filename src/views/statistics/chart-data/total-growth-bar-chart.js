// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'ข้อมูลรับเข้าพอยท์',
      data: [350, 1250, 350, 350, 350, 800, 350, 200, 350, 450, 150, 750]
    },
    {
      name: 'ข้อมูลการใช้พอยท์',
      data: [350, 150, 150, 305, 605, 400, 800, 250, 105, 850, 250, 750]
    },
    {
      name: 'รับเข้าจากช่องทาง อื่น ๆ ',
      data: [350, 1450, 305, 305, 200, 1005, 1000, 100, 605, 405, 300, 100]
    },
    {
      name: 'จ่ายออกจากข้อมูลอื่น ๆ',
      data: [0, 0, 750, 0, 0, 1150, 0, 0, 0, 0, 1500, 0]
    }
  ]
};
export default chartData;
