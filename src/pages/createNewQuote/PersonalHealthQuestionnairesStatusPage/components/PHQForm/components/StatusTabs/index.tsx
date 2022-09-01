import { ReactNode } from "react";
import CommonTabs from "src/components/CommonTabs";
import EmployeesCard from "../EmployeesCard";
import PHQsCard from "../PHQsCard";
import { Container, TabsLayout } from "./statusTabs.styles";

const StatusTabs = () => {
  const tabsHeaders: string[] = ["Employees", "PHQs"];
  const tabsContents: ReactNode[] = [<EmployeesCard />, <PHQsCard />];

  return (
    <Container>
      <TabsLayout md={12}>
        <CommonTabs headers={tabsHeaders} contents={tabsContents} />
      </TabsLayout>
    </Container>
  );
};

export default StatusTabs;
