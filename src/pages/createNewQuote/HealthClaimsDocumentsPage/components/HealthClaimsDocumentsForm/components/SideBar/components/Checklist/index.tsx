import Icon from "src/components/Icon";
import {
  Container,
  ChecklistLabel,
  ChecklistContent,
  Content,
} from "./checklist.styles";

export interface IContent {
  label: string;
  active?: boolean;
}

interface IChecklistProps {
  label: string;
  contents: IContent[];
  md: string;
}

const Checklist = (props: IChecklistProps) => {
  const { label, contents, md } = props;

  return (
    <Container md={md}>
      <ChecklistLabel>{label}</ChecklistLabel>
      <ChecklistContent>
        {Array.isArray(contents) &&
          contents.map((content: IContent, index: number) => (
            <Content key={index} isActive={content?.active}>
              {content?.label}
              {content?.active && <Icon iconName="green_check_mark.png" />}
            </Content>
          ))}
      </ChecklistContent>
    </Container>
  );
};

export default Checklist;
