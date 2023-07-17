import ReactApexCharts from 'react-apexcharts'
import { NavLink } from 'react-router-dom';
import vacationService from '../../../Services/VacationService';
import notifyService from '../../../Services/NotifyService';
import { useEffect, useState } from 'react';
import "./FollowersChart.css";
import useVerifyAdmin from '../../../Utils/VerifyAdmin';
import VerifyAdmin from '../../../Utils/VerifyAdmin';


interface ChartProps {
    series: ApexAxisChartSeries;
}

const opts: ApexCharts.ApexOptions = {
    chart: {
        stacked: false,
        stackType: "100%",
        toolbar: {
            show: false
        },
        parentHeightOffset: 1,
        sparkline: {
            enabled: false
        }
    },

    plotOptions: {
        bar: {
            horizontal: false,
            barHeight: '100'
        }
    },

    stroke: {
        width: 1,
        colors: ['rebeccapurple']
    },

    tooltip: {
        enabled: true,
        y: {
            formatter: function (val): any {
                return val + ''
            }
        }
    },

    fill: {
        opacity: 1
    },

    legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: false
    },

    grid: {
        show: true
    }
}

function FollowersChart(): JSX.Element {

    VerifyAdmin();

    const [data, setData] = useState<ChartProps>();

    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => {
                let followers = vacations.filter(v => v.followersCount > 0);
                setData({
                    series: [{
                        name: "followers",
                        data: followers.map(v => { return { x: v.destination, y: v.followersCount } }),
                        color: 'rgb(156, 135, 177)'
                    }]
                });
            })
            .catch(err => notifyService.error(err));
    }, [])

    return (
        <div className="FollowersChart">
            {data && <ReactApexCharts type='bar' height={500} options={opts} series={data.series} />}
            <NavLink to="/vacations">-Back-</NavLink>
        </div>
    );
}

export default FollowersChart;
