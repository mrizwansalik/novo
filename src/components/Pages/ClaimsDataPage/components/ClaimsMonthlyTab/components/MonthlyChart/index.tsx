import React from "react";
import { observer } from "mobx-react";
import { Row } from "reactstrap";
import BarChart from "src/components/Charts/BarChart";
import {
  getChartColor,
  thousandSeparatorByComma,
} from "src/components/Pages/ClaimsDataPage/utils";
import useStore from "src/utils/useStore";

const monthLabels: string[] = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
];

const MonthlyChart = () => {
  const { benefitStore } = useStore();
  const { claimsYears, claimsData } = benefitStore;
  const notes = claimsYears.map((item, index) => {
    return {
      label: item.toString(),
      value: "",
      color: getChartColor(index),
    };
  });
  const datasets = claimsData.map((item, index) => {
    return {
      label: item.year.toString(),
      data: item.monthly_claims.map((item) => item || 0),
      backgroundColor: getChartColor(index),
    };
  });
  const options = {
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "Monthly Claims",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `$${thousandSeparatorByComma(context.parsed.y)}`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            return "$" + thousandSeparatorByComma(value);
          },
        },
      },
    },
  };
  const canvasStyle = {
    height: "600px",
  };
  return (
    <>
      <Row>
        <BarChart
          labels={monthLabels}
          datasets={datasets}
          notes={notes}
          options={options}
          canvasStyle={canvasStyle}
        />
      </Row>
    </>
  );
};

export default observer(MonthlyChart);
