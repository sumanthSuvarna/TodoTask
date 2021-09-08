import React from "react";
import Card from 'react-bootstrap/Card'
import { Chart } from "react-google-charts";

export default function ChartCard() {
    return(
        <Card style={{height:200}}>
            <Chart
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Status', 'Completed Tasks'],
                    ['Completed', 5.85],
                    ['Not Completed', 1.66]
                ]}
                    options={{
                        legend: 'none',
                        pieSliceText: 'label',
                        title: 'Completer Tasks',
                        pieStartAngle: 100,
                    }}
                rootProps={{ 'data-testid': '4' }}
                />
        </Card>
    )
}