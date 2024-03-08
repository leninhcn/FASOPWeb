var colors = ["#04B404",
    "orange",
    "yellow",
    "red",
    "indigo",
    "purple",
    "#cccccc",];

export default function GetOption() {
    return {
        title: {
            text: 'REPAIR RATE OVER TIME',
            // subtext: 'Current 1~2 hours',
            textStyle: { color: '#0000ff' },
            y: 10,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            data: ['Checkout', 'Wip'],
            bottom: 10
          },
        calculable: true,
        // graphic: [{
        //     type: "text",
        //     style: {
        //       text: '24H',
        //       x: 105,
        //       y: 170,
        //       fill: "#00f",
        //       font: "bold 14px verdana",
        //     },
        //   },{
        //     type: "text",
        //     style: {
        //       text: '48H',
        //       x: 305,
        //       y: 170,
        //       fill: "#00f",
        //       font: "bold 14px verdana",
        //     },
        //   },{
        //     type: "text",
        //     style: {
        //       text: '72H',
        //       x: 505,
        //       y: 170,
        //       fill: "#00f",
        //       font: "bold 14px verdana",
        //     },
        //   },{
        //     type: "text",
        //     style: {
        //       text: '>72H',
        //       x: 660,
        //       y: 170,
        //       fill: "#00f",
        //       font: "bold 14px verdana",
        //     },
        //   }],
        series: [
            {
                name: '',
                type: 'pie',
                radius: '45%',
                center: ['15%', '45%'],
                color: colors,
                label: {
                    normal: {
                        formatter: '{c}',
                        show: true,
                        position: 'inside'
                    },

                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 40, name: 'Checkout' },
                    { value: 60, name: 'Wip' }
                ]
            },
            {
                name: '',
                type: 'pie',
                radius: '45%',
                center: ['40%', '45%'],
                label: {
                    normal: {
                        formatter: '{c}',
                        show: true,
                        position: 'inside'
                    },

                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 120, name: 'Checkout' },
                    { value: 180, name: 'Wip' }
                ]
            }
            , {
                name: '',
                type: 'pie',
                radius: '45%',
                center: ['65%', '45%'],
                label: {
                    normal: {
                        formatter: '{c}',
                        show: true,
                        position: 'inside'
                    },

                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 340, name: 'Checkout' },
                    { value: 230, name: 'Wip' }
                ]
            }
            , {
                name: '',
                type: 'pie',
                radius: '45%',
                center: ['88%', '45%'],
                label: {
                    normal: {
                        formatter: '{c}',
                        show: true,
                        position: 'inside'
                    },

                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 1340, name: 'Checkout' },
                    { value: 160, name: 'Wip' }
                ]
            }
        ]
    };
}