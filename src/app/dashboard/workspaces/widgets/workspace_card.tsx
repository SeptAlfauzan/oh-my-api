import { WorkspaceItem } from "@/interfaces";
import {
  Card,
  CardProps,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

type Props = {
  item: WorkspaceItem;
  props?: CardProps;
};
export default function WorkSpaceCard({ item, props }: Props) {
  return (
    <Card padding={4} {...props}>
      <Stat>
        <StatLabel mb={2} fontWeight={"bold"}>
          {item.name}
        </StatLabel>
        <StatLabel color={"gray.400"}>Number of endpoints</StatLabel>
        <StatNumber fontSize={"2xl"}>{item.numberEndpoints}</StatNumber>
        <StatHelpText fontSize={12} mt={4} textAlign={"right"}>
          Last edited
        </StatHelpText>
        <StatHelpText fontSize={10} textAlign={"right"}>
          {item.lasEdited}
        </StatHelpText>
      </Stat>
    </Card>
  );
}
