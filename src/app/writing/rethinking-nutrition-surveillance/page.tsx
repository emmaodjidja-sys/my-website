import type { Metadata } from 'next'
import { ArticleLayout } from '@/components/ArticleLayout'

export const metadata: Metadata = {
  title: 'Rethinking Nutrition Surveillance in Conflict Zones',
}

export default function Article() {
  return (
    <ArticleLayout
      title="Rethinking Nutrition Surveillance in Conflict Zones"
      publication="Field Note"
      year={2023}
    >
      <p>
        Standard nutrition surveillance relies on assumptions that collapse in active conflict: stable populations, accessible sampling frames, and the luxury of repeat measurement. In South Sudan, I watched SMART surveys become meaningless within weeks of completion as populations shifted and food access changed overnight. The field needs surveillance systems that are designed for instability from the start, not peacetime tools awkwardly adapted for war.
      </p>
      <p>
        The Standardised Monitoring and Assessment of Relief and Transitions survey, known universally as the SMART survey, has been the backbone of nutrition assessment in humanitarian settings for two decades. It produces reliable prevalence estimates of acute malnutrition at a given point in time. But that is precisely its limitation in conflict zones: it captures a snapshot of a situation that may have changed fundamentally by the time the results are analysed and disseminated.
      </p>
      <p>
        During my time with AVSI Foundation in South Sudan, I conducted SMART surveys in pastoralist communities where population movement was constant. We would complete data collection in one payam only to learn that a significant proportion of the households we had surveyed had relocated to another county within the following month. The prevalence estimate we produced was technically valid for the population present at the time of measurement. It was practically useless for planning a nutrition response that would take weeks to mobilise and months to implement.
      </p>
      <p>
        The alternative is not to abandon standardised measurement but to complement it with systems that trade precision for frequency and responsiveness. Community-based surveillance using simplified screening protocols, conducted by trained community health workers on a rolling basis, can detect emerging nutrition crises weeks before a formal SMART survey would be initiated. The data will never match the statistical precision of a probability-proportional-to-size sample, but it will be current, local, and actionable.
      </p>
      <p>
        In Burundi, I tested this approach alongside the traditional SMART methodology. We trained community health workers to conduct monthly mid-upper arm circumference screenings at community level and report results through a simple mobile-based system. The community-based data consistently identified deteriorating nutrition situations four to six weeks before the formal surveillance system flagged them. The coverage was imperfect and the measurement less standardised, but the early warning function proved invaluable for positioning supplies and activating response teams.
      </p>
      <p>
        The resistance to adopting these complementary approaches is partly technical and partly institutional. Nutrition cluster coordination mechanisms are built around SMART survey results. Funding decisions reference SMART-derived thresholds. Changing the surveillance paradigm requires changing the decision-making architecture that depends on it. That is a harder problem than the technical one, but it is the problem that matters.
      </p>
      <p>
        Conflict zones do not pause for data collection. Our surveillance systems should reflect that reality rather than pretending it does not exist.
      </p>
    </ArticleLayout>
  )
}
