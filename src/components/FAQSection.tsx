import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-border/50"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-heading text-sm font-medium text-foreground transition-colors hover:text-primary md:text-base"
      >
        {question}
        <ChevronDown
          className={`ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  const faqData = Array.from({ length: 7 }, (_, i) => ({
    question: t(`faq.q${i + 1}`),
    answer: t(`faq.a${i + 1}`),
  }));

  return (
    <section className="relative z-10 px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mb-10 font-heading text-3xl font-normal text-foreground md:text-[3rem]"
        >
          {t("faq.title")}
        </motion.h2>

        {isInView && faqData.map((item, i) => (
          <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
