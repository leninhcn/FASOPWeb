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
            text: 'TOP5 ISSUE BY STATION',
            // subtext: 'Current 1~2 hours',
            textStyle: { color: '#F5FBEF' },
            y: 0,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        calculable: true,
        series: [
            {
                name: '',
                type: 'pie',
                radius: '45%',
                center: ['10%', '45%'],
                color: colors,
                label: {
                    normal: {
                        formatter: '{b}:{c}',
                        show: true,
                        position: 'outside'
                    },

                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 3, name: 'ER0001' },
                    { value: 10, name: 'ER0002' },
                    { value: 2, name: 'ER0003', },
                    { value: 5, name: 'ER0004', },
                    { value: 8, name: 'ER0005', }
                ]
            }, {
                name: '',
                type: 'pie',
                radius: '45%',
                center: ['30%', '45%'],
                label: {
                    normal: {
                        formatter: '{b}:{c}',
                        show: true,
                        position: 'outside'
                    },

                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 3, name: 'ER0001' },
                    { value: 10, name: 'ER0002' },
                    { value: 2, name: 'ER0003', },
                    { value: 5, name: 'ER0004', },
                    { value: 8, name: 'ER0005', }
                ]
            }
            , {
                name: '',
                type: 'pie',
                radius: '45%',
                center: ['50%', '45%'],
                label: {
                    normal: {
                        formatter: '{b}:{c}',
                        show: true,
                        position: 'outside'
                    },

                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 3, name: 'ER0001' },
                    { value: 10, name: 'ER0002' },
                    { value: 2, name: 'ER0003', },
                    { value: 5, name: 'ER0004', },
                    { value: 8, name: 'ER0005', }
                ]
            }
            , {
                name: '',
                type: 'pie',
                radius: '45%',
                center: ['70%', '45%'],
                label: {
                    normal: {
                        formatter: '{b}:{c}',
                        show: true,
                        position: 'outside'
                    },

                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 3, name: 'ER0001' },
                    { value: 10, name: 'ER0002' },
                    { value: 2, name: 'ER0003', },
                    { value: 5, name: 'ER0004', },
                    { value: 8, name: 'ER0005', }
                ]
            }
            , {
                name: '',
                type: 'pie',
                radius: '45%',
                center: ['90%', '45%'],
                label: {
                    normal: {
                        formatter: '{b}:{c}',
                        show: true,
                        position: 'outside'
                    },

                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 3, name: 'ER0001' },
                    { value: 10, name: 'ER0002' },
                    { value: 2, name: 'ER0003', },
                    { value: 5, name: 'ER0004', },
                    { value: 8, name: 'ER0005', }
                ]
            }
        ]
    };
}