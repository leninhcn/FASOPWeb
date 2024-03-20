const labelOption = {
    show: true,
    position: 'insideBottom',
    distance: 15,
    align: 'left',
    verticalAlign: 'middle',
    rotate: 90,
    formatter: '{c}',
    fontSize: 16,
    rich: {
        name: {}
    }
};

export default function GetOption() {
    return {
        title: {
            text: 'TOTAL WIP BY TIME',
            // subtext: 'Current 1~2 hours',
            textStyle: { color: '#0000ff' },
            y: 20,
            x: 'center'
        },tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Checkin', 'Checkout', 'Wip'],
            bottom:10
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: ['24H', '48H', '72H', '>72H']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Checkin',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0]
            },
            {
              name: 'Checkout',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0]
            },
            {
              name: 'Wip',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0]
            }
          ]
    };
}