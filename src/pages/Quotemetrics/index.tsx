import React from "react";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@material-ui/core";
import { Col, Row, Container } from "reactstrap";
import SingleSelect from "src/components/SingleSelect";
import useStore from "src/utils/useStore";
import Header from "../../components/Header";
// import { TpaFilter } from "TPAListPage/components/ActionBar/style";

import {
  Main,
  ActionSheetContainer,
  InputContainer,
  ApiSheetLayout,
  Monthlycsv,
  AddLabel,
  CsvLabel,
  ASContainer,
  OPContainer,
  OPsheetlayout,
  GetMetsheet,
  Tpaoption,
  BrokerOption,
  ContainerMain,
  SheetLayout,
  InputWrapper,
  Label,
  TopSheetsubtitle,
  Subsheet,
  ActiveBoxes,
  Counter,
  ABSheetContainer,
  TsubSheetLayout,
  ApiSheettitle,
} from "./styles";

const sortOptions = [
  {
    value: "draft",
    label: "Draft",
  },
  {
    value: "closed",
    label: "Closed",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "pending",
    label: "Pending",
  },
];

const apidata = {
  num_brokerages: "76",
  num_groups: "77",
};

const Quotematic = () => {
  const { productMetricsStore } = useStore();

  const { GetProductList } = productMetricsStore;
  var dateControl = document.querySelector('input[type="date"]');

  // {Array.isArray(GetProductList) &&
  //   GetProductList?.map((i) =>i )}

  return (
    <ContainerMain>
      <Header />
      <Main>
        <Container>
          <Col md={6} xs={12}>
            <TopSheetsubtitle>Product Metrics</TopSheetsubtitle>
          </Col>

          <Col>
            <Subsheet>
              <Label>
                Geckoboards:Pipeline|Broker Activation|Broker
                Activity:Monthly(Employees)/Monthly(Employees)/Weekly
              </Label>
            </Subsheet>
          </Col>
          <ASContainer>
            <SheetLayout md={12}>
              {/* <Col md={6} xs={12}> */}
              <Monthlycsv>
                <CsvLabel>Monthly CSV</CsvLabel>
              </Monthlycsv>
              {/* </Col> */}
            </SheetLayout>
          </ASContainer>

          <ASContainer>
            <SheetLayout md={12}>
              <InputWrapper>
                <InputContainer>
                  <AddLabel>From</AddLabel>
                  <GetMetsheet md={3} xs={12}>
                    <input type={"date"} value="2018-07-22"></input>
                  </GetMetsheet>
                </InputContainer>
                <InputContainer>
                  <AddLabel>To</AddLabel>
                  <GetMetsheet md={3} xs={12}>
                    <input type="date" value="2018-07-22"></input>
                  </GetMetsheet>
                </InputContainer>
                <GetMetsheet md={3} xs={12}>
                  <Monthlycsv></Monthlycsv>
                </GetMetsheet>

                <GetMetsheet md={3} xs={12}>
                  <Monthlycsv>
                    <CsvLabel>GET Metrics</CsvLabel>
                  </Monthlycsv>
                </GetMetsheet>
              </InputWrapper>
            </SheetLayout>
          </ASContainer>
          <ActionSheetContainer>
            <ApiSheetLayout>
              <Row>
                <ActiveBoxes>
                  <Counter>{apidata.num_groups}</Counter>
                  <ApiSheettitle> Active Brokerages </ApiSheettitle>
                </ActiveBoxes>

                <ActiveBoxes>
                  <Counter>{apidata.num_brokerages}</Counter>
                  <ApiSheettitle>New Group</ApiSheettitle>
                </ActiveBoxes>

                <ActiveBoxes>
                  <Counter>0</Counter>

                  <ApiSheettitle>Soft-Qoutd Groups </ApiSheettitle>
                </ActiveBoxes>

                <ActiveBoxes>
                  <Counter>0</Counter>
                  <ApiSheettitle>Underwritten Groups </ApiSheettitle>
                </ActiveBoxes>

                <ActiveBoxes>
                  <Counter>0</Counter>
                  <ApiSheettitle> Average Group Size Soft Qouted</ApiSheettitle>
                </ActiveBoxes>

                <ActiveBoxes>
                  <Counter>0</Counter>
                  <ApiSheettitle>
                    {" "}
                    Average Group Size Underwritten
                  </ApiSheettitle>
                </ActiveBoxes>
              </Row>
            </ApiSheetLayout>
            <ApiSheetLayout>
              <Row>
                <ActiveBoxes>
                  <Counter>{}</Counter>
                  <ApiSheettitle>Unique Users Editing Programs </ApiSheettitle>
                </ActiveBoxes>

                <ActiveBoxes>
                  <Counter></Counter>
                  <ApiSheettitle> Brokerages Added Census </ApiSheettitle>
                </ActiveBoxes>

                <ActiveBoxes>
                  <Counter>0</Counter>
                  <ApiSheettitle> Programs </ApiSheettitle>
                </ActiveBoxes>

                <ActiveBoxes>
                  <Counter>0</Counter>
                  <ApiSheettitle> Underwritten Programs </ApiSheettitle>
                </ActiveBoxes>

                <ActiveBoxes>
                  <Counter>0</Counter>
                  <ApiSheettitle> Percent Edits Done By Allay </ApiSheettitle>
                </ActiveBoxes>
                {/* <ActiveBoxes>
              <Counter>0</Counter>
              <ApiSheettitle> Active Brokerage </ApiSheettitle>
            </ActiveBoxes> */}
              </Row>
            </ApiSheetLayout>
          </ActionSheetContainer>

          <OPContainer>
            <OPsheetlayout md={12}>
              <>Brokerages:</>

              <Tpaoption md={1} style={{ marginRight: "15px" }}>
                <SingleSelect options={sortOptions} />
              </Tpaoption>
              <BrokerOption md={11}></BrokerOption>
            </OPsheetlayout>
          </OPContainer>
          <ABSheetContainer>
            <TsubSheetLayout md={10}>
              <TableContainer>
                <Table>
                  <TableHead style={{}}>
                    <TableRow>
                      <TableCell align="left">
                        <AddLabel> Brokerage</AddLabel>
                      </TableCell>
                      <TableCell align="right">
                        <AddLabel>Group</AddLabel>
                      </TableCell>
                      <TableCell align="right">
                        <AddLabel>Employees</AddLabel>
                      </TableCell>
                      <TableCell align="right">
                        <AddLabel>Programs</AddLabel>
                      </TableCell>
                      <TableCell align="right">
                        <AddLabel>Underwritten</AddLabel>
                      </TableCell>
                      <TableCell align="right">
                        <AddLabel>Effective</AddLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Fat</TableCell>
                      <TableCell align="right">Carbs</TableCell>
                      <TableCell align="right">Protein</TableCell>
                      <TableCell align="right">Protein</TableCell>
                      <TableCell align="right">Protein</TableCell>
                      <TableCell align="right">Carbs</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">protein</TableCell>

                      <TableCell align="right">calories</TableCell>
                      <TableCell align="right">carbs</TableCell>

                      <TableCell align="right">fat</TableCell>
                      <TableCell align="right">carbs</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell component="th" scope="row"></TableCell> */}
                      <TableCell align="left">calories</TableCell>
                      <TableCell align="right">carbs</TableCell>
                      <TableCell align="right">protein</TableCell>
                      <TableCell align="right">fat</TableCell>
                      <TableCell align="right">carbs</TableCell>
                      <TableCell align="right">protein</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell component="th" scope="row"></TableCell> */}
                      <TableCell align="left">calories</TableCell>
                      <TableCell align="right">carbs</TableCell>
                      <TableCell align="right">protein</TableCell>
                      <TableCell align="right">fat</TableCell>
                      <TableCell align="right">carbs</TableCell>
                      <TableCell align="right">protein</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell component="th" scope="row"></TableCell> */}
                      <TableCell align="left">calories</TableCell>
                      <TableCell align="right">carbs</TableCell>
                      <TableCell align="right">protein</TableCell>
                      <TableCell align="right">fat</TableCell>
                      <TableCell align="right">carbs</TableCell>
                      <TableCell align="right">protein</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TsubSheetLayout>
          </ABSheetContainer>
        </Container>
      </Main>
    </ContainerMain>
  );
};
export default Quotematic;
