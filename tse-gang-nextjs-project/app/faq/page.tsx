import { QuestionAnswer } from "@/components/faq";
import { Accordion } from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div>
      <h1>Frequently asked questions</h1>
      <div className="w-50">
        <Accordion type="multiple">
          <QuestionAnswer question="me?" answer="yes, you" />
          <QuestionAnswer question="you?" answer="yes, me" />
        </Accordion>
      </div>
    </div>
  );
}
