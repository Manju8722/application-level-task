import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
interface Props {
  children: React.ReactNode;
  title: string;
}
const FilterAccordian = ({ children, title }: Props) => {
  return (
    <Accordion type="single" className="border px-3 rounded-lg" collapsible>
      <AccordionItem value={title}>
        <AccordionTrigger>
          <span className="text-md">{title}</span>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordian;
