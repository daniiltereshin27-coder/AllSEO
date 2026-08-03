import { QuickLeadTrigger } from "@/components/QuickLeadModal";
import { Reveal } from "@/components/Reveal";
import type { CSSProperties } from "react";

const referralSteps = [
  {
    number: "01",
    title: "Вы рекомендуете",
    text: "Передаёте контакт компании или знакомите нас напрямую.",
  },
  {
    number: "02",
    title: "Клиент начинает работу",
    text: "Мы проверяем задачу, показываем условия и запускаем сотрудничество.",
  },
  {
    number: "03",
    title: "Вы получаете 15%",
    text: "После оплаты клиента фиксируем выплату. Если работа продолжается — выплаты продолжаются.",
  },
];

export function ReferralProgram() {
  return (
    <section className="section section--referral" id="referral">
      <div className="container referral-grid">
        <Reveal className="referral-copy">
          <p className="eyebrow">Реферальная программа</p>
          <h2>
            Получите 15%
            <br />
            за рекомендацию
            <br />
            клиента
          </h2>
          <p>
            Знаете бизнес, которому нужно SEO-продвижение в Яндексе? Рекомендуйте
            нас. Мы зафиксируем клиента за вами и будем платить 15% на всём
            сроке его сотрудничества с Allerhand SEO.
          </p>
          <div className="referral-benefits" aria-label="Варианты выгоды">
            <span>Скидка 15% на свои услуги</span>
            <span>Выплата 15% напрямую</span>
          </div>
          <QuickLeadTrigger
            source="referral_program"
            variant="referral"
            className="button button--primary referral-cta"
          >
            <span>Порекомендовать клиента</span>
            <span className="icon-arrow button__arrow" aria-hidden="true" />
          </QuickLeadTrigger>
        </Reveal>

        <Reveal className="referral-visual" delay={100}>
          <div className="referral-visual__percent" aria-label="15 процентов">
            <span>15</span>
            <small>%</small>
          </div>
          <div className="referral-visual__route" aria-hidden="true" />
          <div className="referral-steps">
            {referralSteps.map((step, index) => (
              <div
                className="referral-step"
                key={step.number}
                style={{ "--step-index": index } as CSSProperties}
              >
                <div className="referral-step__top">
                  <span>{step.number}</span>
                  <i className="icon-arrow icon-arrow--inline" aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
