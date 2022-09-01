import { useState } from "react";
import { observer } from "mobx-react";
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

import {
  EditClaimsButton,
  CancelButton,
  StyledInput,
  ButtonTemplate,
  Tablerow,
} from "./style";

function RatesTable({ rate, setEditRate }) {
  const [disabled, setdisabled] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [mshow, setMshow] = useState(false);
  const [buttonshow, setbuttonshow] = useState(false);
  // const [tableborder, settableborder] = useState(false)

  function Check() {
    if (disabled === true) {
      setdisabled(!disabled);
      setbuttonshow(true);
    } else {
      setdisabled(true);
      setbuttonshow(false);
    }
  }

  const handleuserinput = (e, item, index) => {
    const arr = [...rate[item]];
    arr[index] = JSON.parse(e.target.value);
    let a = JSON.parse(item);
    setEditRate({
      ...rate,
      item: arr,
    });
  };

  const resetuserinput = () => {
    setInputValue("0");
  };

  const Cancelmodal = (props) => {
    return (
      <Modal
        {...props}
        size="sm"
        isOpen={props.show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={props.onHide}>
        Do Som
      </Button>{" "} */}
          <Button color="secondary" onClick={props.onHide}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
  return (
    <>
      <Table responsive borderless>
        <thead>
          <Tablerow>
            <th>Participants</th>
            <th>Spec Premium</th>
            <th>Agg Premium</th>
            <th>Agg Accom</th>
            <th>Max Claims</th>
            <th>Spec TLO</th>
            <th>Agg TLO</th>
          </Tablerow>
        </thead>
        <tbody>
          <Tablerow>
            <th scope="row">EE</th>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.spec_premium[0]}
                onChange={(e) => handleuserinput(e, "spec_premium", 0)}
                type="number"
              />
            </td>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.agg_premium[0]}
                onChange={(e) => handleuserinput(e, "agg_premium", 0)}
                type="number"
              />
            </td>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.agg_accommodation[0]}
                onChange={(e) => handleuserinput(e, "agg_accommodation", 0)}
                type="number"
              />
            </td>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.max_claims[0]}
                onChange={(e) => handleuserinput(e, "max_claims", 0)}
                type="number"
              />
            </td>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.spec_tlo[0]}
                onChange={(e) => handleuserinput(e, "spec_tlo", 0)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                value={rate?.agg_tlo[0]}
                onChange={(e) => handleuserinput(e, "agg_tlo", 0)}
                type="number"
              />
            </td>
          </Tablerow>
          <Tablerow style={{ fontSize: "10px" }}>
            <th scope="row">ES</th>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.spec_premium[1]}
                onChange={(e) => handleuserinput(e, "spec_premium", 1)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_premium[1]}
                onChange={(e) => handleuserinput(e, "agg_premium", 1)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_accommodation[1]}
                onChange={(e) => handleuserinput(e, "agg_accommodation", 1)}
                type="number"
              />
            </td>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.max_claims[1]}
                onChange={(e) => handleuserinput(e, "max_claims", 1)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.spec_tlo[1]}
                onChange={(e) => handleuserinput(e, "spec_tlo", 1)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_tlo[1]}
                onChange={(e) => handleuserinput(e, "agg_tlo", 1)}
                type="number"
              />
            </td>
          </Tablerow>
          <Tablerow style={{ fontSize: "10px" }}>
            <th scope="row">EC</th>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.spec_premium[2]}
                onChange={(e) => handleuserinput(e, "spec_premium", 2)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_premium[2]}
                onChange={(e) => handleuserinput(e, "agg_premium", 2)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_accommodation[2]}
                onChange={(e) => handleuserinput(e, "agg_accommodation", 2)}
                type="number"
              />
            </td>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.max_claims[2]}
                onChange={(e) => handleuserinput(e, "max_claims", 2)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.spec_tlo[2]}
                onChange={(e) => handleuserinput(e, "spec_tlo", 2)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_tlo[2]}
                onChange={(e) => handleuserinput(e, "agg_tlo", 2)}
                type="number"
              />
            </td>
          </Tablerow>
          <Tablerow style={{ fontSize: "10px" }}>
            <th scope="row">EF</th>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.spec_premium[3]}
                onChange={(e) => handleuserinput(e, "spec_premium", 3)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_premium[3]}
                onChange={(e) => handleuserinput(e, "agg_premium", 3)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_accommodation[3]}
                onChange={(e) => handleuserinput(e, "agg_accommodation", 3)}
                type="number"
              />
            </td>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.max_claims[3]}
                onChange={(e) => handleuserinput(e, "max_claims", 3)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.spec_tlo[3]}
                onChange={(e) => handleuserinput(e, "spec_tlo", 3)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_tlo[3]}
                onChange={(e) => handleuserinput(e, "agg_tlo", 3)}
                type="number"
              />
            </td>
          </Tablerow>
          <Tablerow style={{ fontSize: "10px" }}>
            <th scope="row">Total:</th>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.spec_premium.reduce((a, b) => a + b)}
                // onChange={(e) => handleuserinput(e, rate.spec_premium, 0)}
                type="number"
              />
            </td>

            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_premium.reduce((a, b) => a + b)}
                // onChange={(e) => handleuserinput(e, rate.spec_premium, 0)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_accommodation.reduce((a, b) => a + b)}
                // onChange={(e) => handleuserinput(e, rate.spec_premium, 0)}
                type="number"
              />
            </td>
            <td>
              <StyledInput
                disabled={disabled}
                value={rate?.max_claims.reduce((a, b) => a + b)}
                // onChange={(e) => handleuserinput(e, rate.spec_premium, 0)}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.spec_tlo.reduce((a, b) => a + b)}
                // onChange={handleuserinput}
                type="number"
              />
            </td>
            <td>
              {" "}
              <StyledInput
                disabled={disabled}
                value={rate?.agg_tlo.reduce((a, b) => a + b)}
                // onChange={handleuserinput}
                type="number"
              />
            </td>
          </Tablerow>
        </tbody>
      </Table>
      <ButtonTemplate>
        <EditClaimsButton label="Edit Rates" onClick={() => Check()} />
        {buttonshow ? (
          <>
            <CancelButton label="Cnacel" onClick={() => setMshow(true)} />
            <CancelButton label="Reset" onClick={() => resetuserinput()} />
          </>
        ) : null}
        <Cancelmodal show={mshow} onHide={() => setMshow(false)} />
      </ButtonTemplate>
    </>
  );
}

export default observer(RatesTable);
