import { useState } from "react";
import { Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { addEmployeeDetail } from "src/api/worker";
import { usStates } from "src/constants";
import { IEmployeeDetail } from "src/interfaces/employee";
import BottomCard from "src/pages/Bottomcard";
import TopBar from "src/pages/Bottomcard/Topsection";
import routes from "src/routes";
import useEmployeeDetailForm from "./hooks";
import {
  Container,
  InputCard,
  StyledInput,
  LButton,
  MainHeading,
  FormDropdown,
  FormNumberInput,
  InputLabel,
  DateInput,
} from "./style";

export default function Employeecontactdeatil() {
  const { formControl, cityOptions } = useEmployeeDetailForm();
  const history = useHistory();
  const [isFormSuccessful, setFormSuccessful] = useState(false);
  const {
    control,
    formState: { isValid },
    register,
    handleSubmit,
  } = formControl;

  const workerId = localStorage.getItem("worker");
  const onSubmit = async (data: IEmployeeDetail) => {
    const response = {
      ...data,
      gender: data.gender["value"],
      marital_status: data.marital_status["value"],
    };
    const responseData = await addEmployeeDetail(workerId, response);
    if (responseData) {
      setFormSuccessful(true);
    } else {
      toast.error("Something went wrong. Please try again!");
    }
    history.push(routes.waiving.value);
  };

  const sortOptions = [
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Married",
      label: "Married",
    },
    {
      value: "Common Law",
      label: "Common Law",
    },
  ];

  const sortOptions2 = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Decline to Say",
      label: "Decline to Say",
    },
  ];
  return (
    <Container>
      <TopBar />
      <InputCard>
        <Row>
          <Col sm={12} md={6}>
            <MainHeading>Employee Contact Detail</MainHeading>
          </Col>
        </Row>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
              <InputLabel>Address</InputLabel>
              <StyledInput
                placeholder="2332 Avenue C, APt 403"
                type="text"
                required="true"
                {...register("address")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6} lg={6} xs={12}>
              <InputLabel>State</InputLabel>

              <Controller
                control={control}
                name="state_abbreviation"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Type and select the state..."
                    options={usStates}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Col>
            <Col sm={12} md={6} lg={6} xs={12}>
              <InputLabel>City</InputLabel>

              <Controller
                control={control}
                name="city"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Type and select the city..."
                    options={cityOptions}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={6} lg={6} xs={12}>
              <InputLabel>PhoneNumber</InputLabel>

              <FormNumberInput
                customInput={StyledInput}
                format="(###)###-####"
                mask="_"
                allowEmptyFormatting
                {...register("phone", {
                  required: true,
                })}
              />
            </Col>

            <Col sm={12} md={6} lg={6} xs={12}>
              <InputLabel>Zip/Postal code</InputLabel>

              <FormNumberInput
                customInput={StyledInput}
                format="#####"
                mask="_"
                allowEmptyFormatting
                {...register("postal", {
                  required: true,
                })}
              />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col sm={12} md={6} lg={6} xs={12}>
              <MainHeading>Employee Details</MainHeading>
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={6} lg={6} xs={12}>
              <InputLabel>Select Your Gender.</InputLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Select Gender"
                    options={sortOptions2}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Col>

            <Col sm={12} md={6} lg={6} xs={12}>
              <InputLabel>What's Your Marital Status?</InputLabel>
              <Controller
                control={control}
                name="marital_status"
                render={({ field: { onChange, value } }) => (
                  <FormDropdown
                    isSearchable
                    placeholder="Select Maritial Status"
                    options={sortOptions}
                    onChange={onChange}
                    value={value}
                  />
                )}
              ></Controller>
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={6} lg={6}>
              <InputLabel>When Is Your Birthday?</InputLabel>
              <DateInput
                id="exampleDate"
                name="date"
                placeholder="date placeholder"
                type="date"
                {...register("birthday")}
              />
            </Col>
          </Row>

          <br></br>

          <Row>
            <Col sm={12} md={6}>
              <MainHeading>Employee Position</MainHeading>
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={6} lg={6}>
              <InputLabel>What's Your Job Title?</InputLabel>
              <DateInput
                id="jobTitle"
                name="position"
                type="string"
                placeholder="Job Title"
                {...register("positions.0.name")}
              />
            </Col>

            <Col sm={12} md={6} lg={6}>
              <InputLabel>When Did You Start With The Company?</InputLabel>

              <DateInput
                id="exampleDate"
                name="date"
                placeholder="date placeholder"
                type="date"
                {...register("positions.0.start_date")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={12} xs={12}>
              <LButton>NEXT &nbsp;&nbsp;</LButton>
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
