import moment from "moment";
import { GENDER } from "src/constants";
import { ICensusHuman } from "src/interfaces/census";

export function formatCensusForChart(census: ICensusHuman[]) {
  const ageData = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  let data = [];
  let legend = [];
  const ages = [];

  if (Array.isArray(census) && census.length > 0) {
    census.forEach((human: ICensusHuman, index: number) => {
      const birthDate = human.birthday;
      const gender = human.gender;
      const age = moment().diff(birthDate, "years");
      ages.push(age);
      if (age < 30) {
        if (gender === GENDER.MALE) {
          ageData[0][0] += 1;
        } else {
          ageData[1][0] += 1;
        }
        human["age_group"] = "< 30";
      } else if (age > 60) {
        if (gender === GENDER.MALE) {
          ageData[0][4] += 1;
        } else {
          ageData[1][4] += 1;
        }
        human["age_group"] = "> 60";
      } else if (age >= 30 && age <= 40) {
        if (gender === GENDER.MALE) {
          ageData[0][1] += 1;
        } else {
          ageData[1][1] += 1;
        }
        human["age_group"] = "30 - 40 ";
      } else if (age >= 40 && age <= 50) {
        if (gender === GENDER.MALE) {
          ageData[0][2] += 1;
        } else {
          ageData[1][2] += 1;
        }
        human["age_group"] = "40 - 50 ";
      } else if (age >= 50 && age <= 60) {
        if (gender === GENDER.MALE) {
          ageData[0][3] += 1;
        } else {
          ageData[1][3] += 1;
        }
        human["age_group"] = "50 - 60 ";
      }
      return ageData;
    });

    const sum = ages.reduce((memo, num) => memo + num, 0);
    const averageAge = Math.ceil(sum / census.length);

    const maleData = ageData.map((data, index, list) => {
      return data[0];
    });
    const femaleData = ageData.map((data, index, list) => {
      return data[1];
    });

    const numMale = maleData.reduce((memo, num) => memo + num, 0);
    const numFemale = femaleData.reduce((memo, num) => memo + num, 0);
    const total = numMale + numFemale;

    const percentageInMaleAgeGroup = (numMale / total) * 100;
    const percentageInFemaleAgeGroup = (numFemale / total) * 100;

    data = [
      {
        label: "Male",
        data: ageData[0],
        backgroundColor: [
          "#1fb2ff",
          "#1fb2ff",
          "#1fb2ff",
          "#1fb2ff",
          "#1fb2ff",
        ],
      },
      {
        label: "Female",
        data: ageData[1],
        backgroundColor: [
          "#fa39e8",
          "#fa39e8",
          "#fa39e8",
          "#fa39e8",
          "#fa39e8",
        ],
      },
    ];
    legend = [
      {
        label: "Male:",
        value: Math.round(percentageInMaleAgeGroup) + "%",
        color: "#1fb2ff",
      },
      {
        label: "Female:",
        value: Math.round(percentageInFemaleAgeGroup) + "%",
        color: "#fa39e8",
      },
      {
        label: "Average age:",
        value: averageAge,
        color: "#ffb42e",
      },
    ];
  }

  return { data, legend };
}
