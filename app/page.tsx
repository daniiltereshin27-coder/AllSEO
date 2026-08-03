import { HeroRankings } from "@/components/HeroRankings";
import { HeaderActions } from "@/components/HeaderActions";
import { Icon } from "@/components/Icon";
import { LeadForm } from "@/components/LeadForm";
import {
  QuickLeadModal,
  QuickLeadTrigger,
} from "@/components/QuickLeadModal";
import { Reveal } from "@/components/Reveal";
import { LazyCasesExplorer } from "@/components/LazyCasesExplorer";
import { ReferralProgram } from "@/components/ReferralProgram";
import { StickyCta } from "@/components/StickyCta";
import { TrackedLink } from "@/components/TrackedLink";
import { siteContent } from "@/lib/site-content";
import type { ReactNode } from "react";

function SectionHeading({
  eyebrow,
  title,
  description,
  visual,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  visual?: ReactNode;
  invert?: boolean;
}) {
  return (
    <Reveal className={`section-heading ${invert ? "is-inverted" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
      {visual}
    </Reveal>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Allerhand SEO — наверх">
          <span className="brand__mark">A</span>
          <span className="brand__name">
            Allerhand <strong>SEO</strong>
          </span>
        </a>
        <nav className="site-nav" aria-label="Основная навигация">
          <a href="#cases">Кейсы</a>
          <a href="#process">Как работает</a>
          <a href="#faq">Вопросы</a>
          <a href="#referral">Вознаграждение</a>
        </nav>
        <HeaderActions />
      </header>

      <section className="hero" id="top">
        <div className="hero__seo" aria-hidden="true">
          <span>S</span>
          <span>E</span>
          <span>O</span>
        </div>
        <div className="hero__orb hero__orb--red" aria-hidden="true">
          <span>Я</span>
        </div>

        <div className="container hero__layout">
          <div className="hero__content">
            <Reveal className="hero__eyebrow-wrap">
              <p className="eyebrow eyebrow--dark">
                <span className="pulse-dot" />
                {siteContent.eyebrow}
              </p>
            </Reveal>
            <h1 className="hero__title" aria-label={`${siteContent.hero.title} ${siteContent.hero.accent}`}>
              <span className="hero__title-line">10 запросов</span>
              <span className="hero__title-line">
                в <mark>ТОП‑10</mark>{" "}
                <span className="hero__yandex">Яндекса</span>
              </span>
              <span className="hero__title-line hero__title-line--small">
                за 2 дня. <em>Бесплатно.</em>
              </span>
            </h1>
            <Reveal delay={120}>
              <p className="hero__description">{siteContent.hero.description}</p>
            </Reveal>
            <Reveal className="hero__microproof" delay={180}>
              <span>✓ Без оплаты</span>
              <span>✓ Менеджер свяжется за 5 минут</span>
              <span>✓ Результат уже через 2 дня</span>
            </Reveal>
            <Reveal className="hero__motion" delay={220}>
              <HeroRankings />
            </Reveal>
          </div>

          <aside className="hero__form-wrap">
            <div className="hero__form-note">
              <span>01</span>
              <p>
                Оставьте заявку — менеджер свяжется с вами в течение 5 минут и
                уточнит данные для проверки сайта.
              </p>
            </div>
            <LeadForm id="hero-form" />
          </aside>
        </div>
      </section>

      <section className="facts" aria-label="Условия теста">
        <div className="container facts__grid">
          {siteContent.facts.map((fact, index) => (
            <Reveal className="fact" key={fact.value} delay={index * 80}>
              <span className="fact__number">0{index + 1}</span>
              <strong>{fact.value}</strong>
              <p>{fact.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--process" id="process">
        <div className="container">
          <SectionHeading
            eyebrow="Как это работает?"
            title="От заявки до фиксации фактических позиций"
            visual={
              <div className="process-route" aria-label="Четыре шага процесса">
                <span>01</span>
                <i />
                <span>02</span>
                <i />
                <span>03</span>
                <i />
                <span>04</span>
                <b aria-hidden="true" />
              </div>
            }
          />
          <div className="process-grid">
            {siteContent.steps.map((step, index) => (
              <Reveal
                className="process-card"
                key={step.number}
                delay={index * 80}
              >
                <div className="process-card__top">
                  <span>{step.number}</span>
                  <i className="icon-arrow icon-arrow--inline" aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" id="proof">
        <div className="container">
          <SectionHeading
            eyebrow="Что вы получите"
            title="Не обещание на словах, а материалы по каждому запросу"
            description="Исходный и итоговый съём позиций проводим в Topvisor. Результат можно проверить, сохранить и использовать для внутренней отчётности."
            invert
          />
          <div className="deliverables-grid">
            {siteContent.deliverables.map((item, index) => (
              <Reveal
                className="deliverable-card"
                key={item.title}
                delay={index * 70}
              >
                <span className="deliverable-card__icon">
                  <Icon name={item.icon} size={28} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LazyCasesExplorer />

      <ReferralProgram />

      <section className="section section--audience">
        <div className="container">
          <SectionHeading
            eyebrow="Для бизнеса и маркетинга"
            title="Один тест — две понятные ценности"
          />
          <div className="audience-grid">
            <Reveal className="audience-card audience-card--owner">
              <div className="audience-card__label">
                <Icon name="shield" />
                Владельцу бизнеса
              </div>
              <h3>Проверить результат без финансового риска</h3>
              <ul>
                <li>Не вкладывать бюджет до демонстрации</li>
                <li>Увидеть фактические позиции по согласованной группе</li>
                <li>Принять решение на основе отчёта, а не презентации</li>
              </ul>
            </Reveal>
            <Reveal className="audience-card audience-card--marketing" delay={90}>
              <div className="audience-card__label">
                <Icon name="report" />
                Маркетологу
              </div>
              <h3>Получить измеримый тест для отчёта руководителю</h3>
              <ul>
                <li>Позиции до и после, зафиксированные в Topvisor</li>
                <li>Единая коммерческая группа без усреднения</li>
                <li>Материалы для обоснования следующего шага</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--why">
        <div className="container why-grid">
          <Reveal className="why-visual">
            <span className="why-visual__zero">0₽</span>
            <span className="why-visual__orbit why-visual__orbit--one">
              без предоплаты
            </span>
            <span className="why-visual__orbit why-visual__orbit--two">
              без договора на продолжение
            </span>
            <span className="why-visual__orbit why-visual__orbit--three">
              2 дня
            </span>
          </Reveal>
          <Reveal className="why-copy" delay={80}>
            <p className="eyebrow">Почему бесплатно</p>
            <h2>Сначала показываем работу на малом объёме</h2>
            <p>
              Вы не должны покупать продвижение, не увидев, что подход даёт
              измеримый результат именно на вашем сайте. Поэтому сначала
              проверяем применимость, а затем проводим тест одной группы из 10
              запросов за свой счёт.
            </p>
            <p>
              Если результат интересен — можно обсудить больше запросов и регионов.
              Если нет — на этом взаимодействие заканчивается. Автоматического
              продолжения нет.
            </p>
            <TrackedLink
              goal="cta_click"
              href="#final-form"
              className="text-link"
            >
              Продвинуть запросы за 0₽ <span className="icon-arrow icon-arrow--inline" aria-hidden="true" />
            </TrackedLink>
          </Reveal>
        </div>
      </section>

      <section className="section section--next">
        <div className="container next-grid">
          <Reveal className="next-copy">
            <p className="eyebrow eyebrow--dark">После теста</p>
            <h2>Вы получаете результат. Решение о продолжении — только ваше.</h2>
          </Reveal>
          <Reveal className="next-path" delay={100}>
            <div>
              <span>01</span>
              <p>Получаете отчёт и подтверждение позиций из Topvisor.</p>
            </div>
            <div>
              <span>02</span>
              <p>Оцениваете результат внутри компании.</p>
            </div>
            <div>
              <span>03</span>
              <p>
                При интересе обсуждаете расширение запросов и регионов. Без
                обязательств.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--faq" id="faq">
        <div className="container faq-grid">
          <SectionHeading
            eyebrow="FAQ"
            title="Вопросы, которые лучше задать до заявки"
            description="Коротко и без обещаний мелким шрифтом."
          />
          <div className="faq-list">
            {siteContent.faq.map((item, index) => (
              <Reveal key={item.question} delay={index * 35}>
                <details className="faq-item">
                  <summary>
                    <span>{item.question}</span>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__glow" aria-hidden="true" />
        <div className="container final-cta__grid">
          <Reveal className="final-cta__copy">
            <p className="eyebrow eyebrow--dark">Готовы проверить?</p>
            <h2>
              Ваш сайт.
              <br />
              10 запросов.
              <br />
              <mark>2 дня.</mark>
            </h2>
            <p>
              Оставьте адрес сайта и контакт. Специалист проверит страницу и
              свяжется для согласования коммерческой группы. Два дня считаются
              после подтверждённого старта теста.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <LeadForm id="final-form" variant="final" />
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <a className="brand brand--footer" href="#top">
            <span className="brand__mark">A</span>
            <span className="brand__name">
              Allerhand <strong>SEO</strong>
            </span>
          </a>
          <p>
            Отдельное направление digital-агентства. Сайт не является официальным
            ресурсом, сервисом или партнёром Яндекса.
          </p>
          <div className="site-footer__links">
            <a href="https://allerhand.ru/" target="_blank" rel="noreferrer">
              Студия разработки
            </a>
            <a href="#process">Как работает</a>
            <a href="#faq">FAQ</a>
            <QuickLeadTrigger source="footer">
              Выбрать запросы
            </QuickLeadTrigger>
          </div>
        </div>
      </footer>

      <StickyCta />
      <QuickLeadModal />
    </main>
  );
}
