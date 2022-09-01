import React from "react";
import { observer } from "mobx-react";
import { Row } from "reactstrap";
import BarChart from "src/components/Charts/BarChart";
import {
  getChartColor,
  thousandSeparatorByComma,
} from "src/components/Pages/ClaimsDataPage/utils";
import useStore from "src/utils/useStore";

const LargeChart = () => {
  const { benefitStore } = useStore();
  const { claimsYears, claimsData, totalYearStopLossClaims } = benefitStore;
  const notes = claimsYears.map((item, index) => {
    return {
      label: item.toString(),
      value: "",
      color: getChartColor(index),
    };
  });

  const datasets = [
    {
      label: "",
      data: totalYearStopLossClaims,
      backgroundColor: totalYearStopLossClaims.map((item, index) =>
        getChartColor(index)
      ),
    },
  ];
  const options = {
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "Total Large Claims",
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
          labels={claimsYears}
          datasets={datasets}
          notes={notes}
          options={options}
          canvasStyle={canvasStyle}
        />
      </Row>
    </>
  );
};

export default observer(LargeChart);
