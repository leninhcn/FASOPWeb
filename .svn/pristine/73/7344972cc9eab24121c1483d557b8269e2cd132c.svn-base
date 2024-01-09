export default function GetOption() {
    return {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return `${params.data.station}<br/>${params.name}: ${params.value}`
            }
        },
        legend: {
            x: '80%',
            y: '15%',
            data: ['ER0001', 'ER0002', 'ER0003', 'ER0004', 'ER0005', 'ER0006', 'ER0007', 'ER0008', 'ER0009'],
            icon: 'circle',
            textStyle: {
                color: '#fff',
            }
        },
        title: {
            text: 'TOP10 ISSUE',
            x: 'center',
            textStyle: { color: '#F5FBEF' }
        },
        calculable: true,
        series: [{
            name: 'TOP10 ISSUE',
            type: 'pie',
            startAngle: 180,
            clockwise: false,
            radius: [41, 100.75],
            center: ['50%', '55%'],
            roseType: 'area',
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    formatter: '{c}'
                },
                emphasis: {
                    show: true
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    length2: 1,
                },
                emphasis: {
                    show: true
                }
            },
            color:['#ff4343','#f69846','#f6d54a','#45dbf7','#44aff0','#4777f5','#5045f6','#ad46f3','#f845f1','#f845f1',],
            data: [{
                value: 18,
                name: 'ER0001',
                station:'MBLT'
            },
            {
                value: 17,
                name: 'ER0002',
                station:'MBLT'
            },
            {
                value: 16,
                name: 'ER0003',
                station:'MBLT'
            },
            {
                value: 15,
                name: 'ER0004',
                station:'MBLT'
            },
            {
                value: 13,
                name: 'ER0005',
                station:'MBLT'
            },
            {
                value: 12,
                name: 'ER0006',
                station:'MBLT'
            },
            {
                value: 11,
                name: 'ER0007',
                station:'MBLT'
            },
            {
                value: 10,
                name: 'ER0008',
                station:'MBLT'
            },
            {
                value: 9,
                name: 'ER0009',
                station:'MBLT'
            },
            ]
        }]
    };
}