
const gaugeData = [
    {
        value: 100,
        name: "Final Rate",
        title: {
            show: false,
            offsetCenter: ["0%", "-3%"],
        },
        detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-20%"],
        },
    },
    {
        value: 99,
        name: "First Pass Rate",
        title: {
            show: false,
            offsetCenter: ["0%", "27%"],
        },
        detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "8%"],
        },
    },
];

function GetSeries(center) {
    return {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        center: center,
        pointer: {
            show: false,
        },
        progress: {
            show: true,
            overlap: false,
            roundCap: false,
            clip: true,
            itemStyle: {
                borderWidth: 1,
                borderColor: "#464646",
            },
        },
        color: ['#04B404', 'rgb(253, 2, 253)', 'purple', '#cccccc'],
        axisLine: {
            lineStyle: {
                width: 20,
            },
        },
        splitLine: {
            show: false,
            distance: 0,
            length: 20,
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            show: false,
            distance: 30,
        },
        radius: '50%',
        data: gaugeData,
        title: {
            fontSize: 8,
        },
        detail: {
            width: 25,
            height: 5,
            fontSize: 10,
            color: "inherit",
            borderColor: "inherit",
            borderRadius: 20,
            borderWidth: 1,
            formatter: "{value}%",
        },
    }
}

export default function GetOption() {
    return {
        // legend: {
        //     x: '0%',
        //     y: '0%',
        //     data: ['Final', 'First'],
        //     icon: 'circle',
        //     textStyle: {
        //         color: '#fff',
        //     }
        // },
        graphic: [
            {
                type: 'text',
                style: {
                    text: '',
                    x: 73,
                    y: 220,
                    fill: '#fff',
                    font: '20px verdana',
                }
            },
        ],
        title: {
            text: 'YIELD RATE BY STATION',
            //  subtext: 'The most recent 1 - 2 hours',            
            x: 'center',
            y: 10,
            textStyle: { color: '#F5FBEF', fontSize: 16, }
        }, tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}%"
        },
        series: [
            GetSeries(['10%', '50%']),
            GetSeries(['30%', '50%']),
            GetSeries(['50%', '50%']),
            GetSeries(['70%', '50%']),
            GetSeries(['90%', '50%']),
        ]
    }

}