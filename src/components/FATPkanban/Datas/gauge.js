const gaugeData = [
  {
    value: 20,
    name: "Perfect",
    title: {
      show: false,
      offsetCenter: ["0%", "-35%"],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "-20%"],
    },
  },
  {
    value: 40,
    name: "Good",
    title: {
      show: false,
      offsetCenter: ["0%", "-3%"],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "10%"],
    },
  },
  {
    value: 60,
    name: "Commonly",
    title: {
      show: false,
      offsetCenter: ["0%", "27%"],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "40%"],
    },
  },
];

export default function GetOption() {
  return {
    graphic: [
      // {
      //   type: 'group',
      //   left: 'center',
      //   top: 0,
      //   children: [
      //     {
      //       type: 'text',
      //       z: 100,
      //       left: 'center',
      //       top: 'middle',
      //       style: {
      //         fill: '#1478eb',
      //         text: [
      //           '011002457801 [3489 / 23099]'
      //         ].join('\n'),
      //         font: 'bold 10px verdana'
      //       }
      //     }
      //   ]
      // },
    ],
    tooltip: {},
    title: {
      text: 'Work Order Output Rate',
      subtext: '     Displays the latest 3 Work Order',
      x: 'center',
      y: 20,
      textStyle: { color: '#F5FBEF' },
      show: true
    },
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        center: ['50%', '62%'],
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646",
          },
        },
        color: ['#04B404', 'orange', 'yellow', 'red', 'indigo', 'purple', '#cccccc'],
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: gaugeData,
        title: {
          fontSize: 14,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 20,
          borderWidth: 1,
          formatter: "{value}%",
        },
      },
    ],
  }
}