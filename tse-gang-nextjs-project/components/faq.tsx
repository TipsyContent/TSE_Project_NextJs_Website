import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function QuestionAnswer({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <AccordionItem value={question}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </AccordionItem>
  );
}
