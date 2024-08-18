"use client";
import { Card } from "@chakra-ui/react";
type Props = {
  onClick: () => void;
};
export default function CreateCard({ onClick }: Props) {
  return <Card onClick={onClick}>Text</Card>;
}
