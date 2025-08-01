import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { updateDependents } from "src/api/dependents";
import { getDependent } from "src/api/dependents";
import { IDependentDetail } from "src/interfaces/dependent";
import BottomCard from "src/pages/Bottomcard";
import TopBar from "src/pages/Bottomcard/Topsection";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import { boolean } from "yup/lib/locale";
import addDependentDetailForm from "./hook";
import {
  Container,
  InputCard,
  StyledInput,
  LButton,
  MainHeading,
  FormDropdown,
  InputLabel,
} from "./style";

const EmptyDependent = {
  id: "",
  first_name: "",
  last_name: "",
  middle_name: "",
  personal_email: "",
  birthday: "",
  gender: "",
  city: "",
  country: "",
  address: "",
  language: "",
  marital_status: "",
  government_number: "",
  relationship: "",
  state_abbreviation: "",
  suite_number: "",
  region: "",
  health_data: {
    weight: "",
    height: "",
    is_smoker: boolean,
  },
  census_data: {
    is_employed: boolean,
    is_full_time_student: boolean,
    is_disabled: boolean,
    is_incapacitated: boolean,
    primary_care_physician: "",
  },
  postal: "",
  filestack_picture: "",
};

export default function UpdateDependent() {
  const formControls = addDependentDetailForm();

  const { control, formControl } = formControls;
  const { register, handleSubmit } = formControl;

  const [gdata, setGdata] = useState<any>(EmptyDependent);
  const [isFormSuccessful, setFormSuccessful] = useState(false);
  const { dependentId } = useParams<IParamTypes>();
  const workerId = localStorage.getItem("worker");

  useEffect(() => {
    if (dependentId) {
      getDependent(workerId, dependentId).then((res) => {
        const response = res;
        setGdata(response);
      });
    }
  }, []);

  const onSubmit = async (data: IDependentDetail) => {
    console.log("checl karo");

    const workerId = localStorage.getItem("worker");
    console.log(workerId, "worker");

    const payload = {
      ...gdata,
      id: dependentId,
      gender: gdata.gender["value"],
      relationship: gdata.relationship["value"],
      postal: gdata.postal["value"],
      birthaday: gdata.birthaday["value"],
      primary_care_physician: gdata.primary_care_physician["value"],
      health_data: {
        is_smoker: gdata.health_data.is_smoker["value"],
        weight: gdata.health_data.weight,
        height: gdata.health_data.height,
      },
      census_data: {
        is_disabled: gdata.census_data.is_disabled["value"],
        is_employed: gdata.census_data.is_employed["value"],
        is_full_time_student: gdata.census_data.is_full_time_student["value"],
        is_incapacitated: gdata.census_data.is_incapacitated["value"],
      },
    };
    console.log(payload, "payloaf");

    const resData = await updateDependents(workerId, payload);

    if (resData) {
      setFormSuccessful(true);
    } else {
      toast.error("Something went wrong. Please try again!");
    }

    history.push(routes.dependents.value);
  };

  const history = useHistory();
  const [data, setData] = useState(EmptyDependent);
  const sortOptions = [
    {
      value: "Male",
      label: "MALE",
    },
    {
      value: "Female",
      label: "FEMALE",
    },
    {
      value: "Other",
      label: "OTHER",
    },
  ];

  const RelationshipOptions = [
    {
      value: "Spouse",
      label: "Spouse",
    },
    {
      value: "Commonlaw",
      label: "Common Law",
    },
    {
      value: "Child",
      label: "Child",
    },
    {
      value: "eLgal_guardianship",
      label: "Legal Guardianship",
    },
  ];

  const generaloption = [
    {
      value: "YES",
      label: "YES",
    },
    {
      value: "NO",
      label: "NO",
    },
  ];

  return (
    <Container>
      <TopBar />
      <InputCard>
        <Row>
          <Col sm={12} md={6}>
            <MainHeading>
              <b>Update Dependent</b>
            </MainHeading>
          </Col>
        </Row>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={12} md={5}>
              <InputLabel>FIRST NAME</InputLabel>
              <StyledInput
                placeholder="e.g Booby"
                value={gdata.first_name}
                type="text"
                required="true"
                onChange={(e) => {
                  setGdata({
                    ...gdata,
                    first_name: e.target.value,
                  });
                }}
              />
            </Col>
            <Col sm={12} md={5}>
              <InputLabel>LAST NAME</InputLabel>
              <StyledInput
                placeholder="e.g. Draper"
                requirted="true"
                type="text"
                value={gdata.last_name}
                onChange={(e) => {
                  setGdata({
                    ...gdata,
                    last_name: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={5}>
              <InputLabel>DATE OF BIRTH</InputLabel>
              <StyledInput
                id="exampleDate"
                value={gdata.birthday}
                name="date"
                placeholder="date placeholder"
                type="date"
                onChange={(e) => {
                  setGdata({
                    ...gdata,
                    birthaday: e.target.value,
                  });
                }}
              />
            </Col>

            <Col sm={12} md={5}>
              <InputLabel>GENDER</InputLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Select Gender"
                    options={sortOptions}
                    onChange={onChange}
                    value={gdata.gender}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={5}>
              <InputLabel>RELATIONSHIP</InputLabel>
              <Controller
                control={control}
                name="relationship"
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Select Relationship"
                    options={RelationshipOptions}
                    onChange={onChange}
                    value={gdata.relationship}
                  />
                )}
              />
            </Col>

            <Col sm={12} md={5}>
              <InputLabel>ARE THEY EMPLOYEEED?</InputLabel>
              <Controller
                control={control}
                name="census_data.is_employed"
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Select Employement Status"
                    options={generaloption}
                    onChange={onChange}
                    value={gdata.is_employed}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={5}>
              <InputLabel>ARE THEY FULL-TIME STUDENT</InputLabel>
              <Controller
                control={control}
                name="census_data.is_full_time_student"
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Select Student Status"
                    options={generaloption}
                    onChange={onChange}
                    value={gdata.is_full_time_student}
                  />
                )}
              />
            </Col>

            <Col sm={12} md={5}>
              <InputLabel>WEIGHT</InputLabel>
              <StyledInput
                id="weight"
                name="weight"
                placeholder="in LBS"
                type="text"
                value={gdata.health_data.weight}
                onChange={(e) => {
                  setGdata({
                    ...gdata,
                    weight: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={5}>
              <InputLabel>HEIGHT</InputLabel>
              <StyledInput
                id="height"
                name="height"
                placeholder="in Feet & Inches"
                type="text"
                value={gdata.health_data.height}
                onChange={(e) => {
                  setGdata({
                    ...gdata,
                    height: e.target.value,
                  });
                }}
              />
            </Col>

            <Col sm={12} md={5}>
              <InputLabel>ARE THEY SMOKER?</InputLabel>
              <Controller
                control={control}
                name="health_data.is_smoker"
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Select Status"
                    options={generaloption}
                    onChange={onChange}
                    value={gdata.is_smoker}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={5}>
              <InputLabel>DISABLED?</InputLabel>
              <Controller
                control={control}
                name="census_data.is_disabled"
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Select Status"
                    options={generaloption}
                    onChange={onChange}
                    value={gdata.is_disabled}
                  />
                )}
              />
            </Col>

            <Col sm={12} md={5}>
              <InputLabel>LEGALLY INCAPACIATED?</InputLabel>
              <Controller
                control={control}
                name="census_data.is_incapacitated"
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Select Status"
                    options={generaloption}
                    onChange={onChange}
                    value={value}
                    // value={gdata?.census_data.is_incapacitated}
                  />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={5}>
              <InputLabel>ZIPCODE(OPTIONAL)</InputLabel>
              <StyledInput
                id="postal"
                name="postal"
                pattern="[0-9]{5}"
                maxlength={5}
                size="5"
                type="number"
                value={gdata.postal}
                onChange={(e) => {
                  setGdata({
                    ...gdata,
                    postal: e.target.value,
                  });
                }}
              />
            </Col>

            <Col sm={12} md={5}>
              <InputLabel>PRIMARY CARE PHYSICIAN NAME(OPTIONAL)</InputLabel>

              <StyledInput
                id="primacry_Care_physician_name"
                name="census_data.primary_care_physician"
                type="text"
                value={gdata?.census_data.primary_care_physician}
                onChange={(e) => {
                  setGdata({
                    ...gdata,
                    primary_care_physician: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={12}>
              <LButton>Save &nbsp;&nbsp;</LButton>
            </Col>
          </Row>
        </form>
      </InputCard>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <BottomCard />
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}
