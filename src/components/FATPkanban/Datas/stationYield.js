var labelTop = {
    normal: {
        label: {
            show: true,
            position: 'center',
            formatter: '{b}',
            textStyle: {
                baseline: 'bottom'
            }
        },

        labelLine: {
            show: false,
        }
    }
};
var labelFromatter = {
    normal: {
        color: function (params) {
            if (params.value >= 99) { return '#04B404'; }
            else if (params.value >= 97.5) { return '#0080FF'; }
            else if (params.value >= 96) { return '#FE9A2E'; }
            else { return '#FE2E2E'; }
        },
        label: {
            formatter: function (params) {
                return params.value + '%'
            },
            textStyle: {
                baseline: 'top'
            },
            color: 'auto',
            fontSize: 20,
            position: 'center'
        }
    },
}
var labelBottom = {
    normal: {
        color: '#ccc',
        label: {

            show: true,
            textStyle: {
                baseline: 'top'
            },
            position: 'center'
        },
        labelLine: {
            show: false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
var radius = [45, 60];
export default function GetOption() {
    return {
        legend: {
            x: 'center',
            y: 'center',
            data: [
            ]
        },
        graphic: [
            {
                type: 'text',
                style: {
                    text: 'MBLT',
                    x: 80,
                    y: 260,
                    fill: '#fff',
                    font: '20px verdana',
                }
            },
        ],
        title: {
            text: 'Yield Rate By Station',
            subtext: 'The most recent 1 - 2 hours',
            x: 'center',
            y: 30,
            textStyle: { color: '#F5FBEF' }
        },
        series: [
            {
                type: 'pie',
                center: ['10%', '50%'],
                radius: radius,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'T1-Post-AOI', value: 90.85, itemStyle: labelTop, },
                    { name: 'other', value: 9.15, itemStyle: labelBottom, label: { show: false, position: 'inside', } },

                ]
            },
            {
                type: 'pie',
                center: ['30%', '50%'],
                radius: radius,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'other', value: 98, itemStyle: labelTop, label: { show: true, fontSize: 18 } },
                    { name: '', value: 2, itemStyle: labelBottom, label: { show: false, position: 'inside' } }
                ]
            },
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: radius,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'other', value: 95, itemStyle: labelTop, label: { show: true, fontSize: 18 } },
                    { name: 'Youtube', value: 5, itemStyle: labelBottom, label: { show: false, position: 'inside' } }
                ]
            },
            {
                type: 'pie',
                center: ['70%', '50%'],
                radius: radius,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'other', value: 85, itemStyle: labelTop, label: { show: true, fontSize: 18 } },
                    { name: 'Google+', value: 15, itemStyle: labelBottom, label: { show: false, position: 'inside' } }
                ]
            },
            {
                type: 'pie',
                center: ['90%', '50%'],
                radius: radius,
                x: '0%', // for funnel
                itemStyle: labelFromatter,
                data: [
                    { name: 'other', value: 99, itemStyle: labelTop, label: { show: true, fontSize: 18 } },
                    { name: 'Google+', value: 1, itemStyle: labelBottom, label: { show: false, position: 'inside' } }
                ]
            },

        ]
    }

}