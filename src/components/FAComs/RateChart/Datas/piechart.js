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
            y: 20,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            data: ['Checkout', 'Wip'],
            top: 40,
            left:780
          },
        calculable: true,        
        series: [
            {
                name: '',
                type: 'pie',
                radius: '50%',
                center: ['15%', '60%'],
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
                    { value: 0, name: 'Checkout' },
                    { value: 0, name: 'Wip' }
                ]
            },
            {
                name: '',
                type: 'pie',
                radius: '50%',
                center: ['38%', '60%'],
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
                    { value: 0, name: 'Checkout' },
                    { value: 0, name: 'Wip' }
                ]
            }
            , {
                name: '',
                type: 'pie',
                radius: '50%',
                center: ['62%', '60%'],
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
                    { value: 0, name: 'Checkout' },
                    { value: 0, name: 'Wip' }
                ]
            }
            , {
                name: '',
                type: 'pie',
                radius: '50%',
                center: ['85%', '60%'],
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
                    { value: 0, name: 'Checkout' },
                    { value: 0, name: 'Wip' }
                ]
            }
        ]
    };
}