import { Heading } from "@chakra-ui/react";

export default function Page({ params }: { params: { slug: string } }) {
  return <Heading>{params.slug}</Heading>;
}
