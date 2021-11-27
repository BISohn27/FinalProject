// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import {useState,useEffect,Fragment} from 'react';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

// export const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//         position: 'top',
//         },
//         title: {
//         display: true,
//         text: '',
//         },
//     },
// };


// export default function Chart1({labelList,dataList}) {
//     const [noData,setNoData] = useState(true);
//     console.log(dataList);
//     const data = {
//         labels:labelList,
//         datasets: [
//             {
//                 label: 'Dataset 1',
//                 data: dataList,
//                 borderColor: 'rgb(255, 99, 132)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             },
//         ],
//     };

//     useEffect(()=>{
//         if(dataList === undefined){
//             setNoData(true);
//         }else{
//             setNoData(false);
//         }
//     },[dataList])
    

//     return(
//         <Fragment>
//             {noData ? null : <Line options={options} data={data} />}
//         </Fragment>
//     );
// }

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { formLabelClasses } from '@mui/material';
import { StylesContext } from '@material-ui/styles';

import style from '../css/Chart.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '',
        },
    },
};



export default function Chart({labelList,dataList}) {
    const data = {
        labels: labelList,
        datasets: [
            {
            label: 'Dataset 1',
            data: dataList,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    // const styles ={
    //     width: '80%',
    //     height: '50vh',
    //     padding: '30px',
    // }
    return (<div id={style.wrap}>
                <Bar options={options} data={data}/>
            </div>);
}