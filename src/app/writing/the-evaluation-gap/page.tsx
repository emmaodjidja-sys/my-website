import type { Metadata } from 'next'
import { ArticleLayout } from '@/components/ArticleLayout'

export const metadata: Metadata = {
  title: 'The Evaluation Gap: Why Development Programmes Fail to Prove Their Worth',
}

export default function Article() {
  return (
    <ArticleLayout
      title="The Evaluation Gap: Why Development Programmes Fail to Prove Their Worth"
      publication="Commentary"
      year={2025}
    >
      <p>
        Billions flow into development programming each year, yet fewer than one in five programmes undergoes a rigorous impact evaluation. The consequence is not merely academic. Without credible evidence of what works, funders recycle failed approaches, practitioners lose institutional memory, and the communities these programmes claim to serve bear the cost of well-intentioned guesswork.
      </p>
      <p>
        I have spent twelve years designing evaluations in settings where evidence is hardest to produce and most desperately needed. The pattern repeats itself with remarkable consistency. A programme launches with ambitious objectives, implements activities for three to five years, and concludes with a final report that describes outputs without demonstrating outcomes. The logical framework is treated as a planning document rather than an accountability tool. The theory of change, if one exists, is never tested.
      </p>
      <p>
        The reasons for this gap are structural, not technical. Evaluation is typically budgeted as an afterthought, receiving two to four percent of total programme costs when the minimum for credible impact measurement is closer to eight. Baseline data collection begins months after implementation has started, rendering before-and-after comparisons unreliable. Monitoring systems are designed to satisfy donor reporting requirements rather than to generate learning.
      </p>
      <p>
        There is also a cultural dimension. In many organisations, evaluation is perceived as an external accountability exercise rather than an internal learning function. Programme managers view evaluators with suspicion, and evaluators respond by producing reports that prioritise methodological sophistication over practical utility. The result is a body of evidence that neither informs programming nor satisfies the basic question that matters most: did this intervention make a measurable difference in people&apos;s lives?
      </p>
      <p>
        Closing this gap requires more than technical fixes. It demands a fundamental shift in how organisations value and invest in evaluation from the outset. Evaluation design should begin before implementation, not after. Budgets should reflect the true cost of rigorous evidence generation. And evaluators should be embedded within programme teams, not parachuted in during the final year.
      </p>
      <p>
        The programmes that have impressed me most over the past decade share a common trait: they treated evaluation not as an obligation but as an opportunity to understand whether their work actually mattered. That orientation is rarer than it should be. It is also the single most important determinant of whether a programme will produce evidence worth citing.
      </p>
    </ArticleLayout>
  )
}
