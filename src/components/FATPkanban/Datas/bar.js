export default function GetOption() {
    return {
        title: {
            text: 'Line 1',
            subtext: '',
            x: 'center',
            y: 10,
            textStyle:
            {
                color: '#F5FBEF',
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
              }
        },
        textStyle:
        {
            color: '#F5FBEF',
        },
        calculable: true,
        grid: { y: 70, y2: 40, x2: 20 },
        xAxis: [
            {
                type: 'category',
                splitLine: {
                    show: false
                },
                data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                axisLabel: {
                    interval: 0,
                   // rotate: -30,
                }
            },

        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLabel: { formatter: '{value} pcs' }
            }
        ],
        series: [
            {
                name: 'Line 1',
                type: 'bar',
                itemStyle: { normal: { color: '#31B404', label: { show: true, textStyle: { color: '#FAF3BC' } } } },
                data: [40, 70, 76, 60, 35, 73, 60, 80, 67, 48, 75, 67, 40, 70, 76, 60, 35, 73, 60, 80, 67, 48, 75, 67]
            },

        ]
    }
}