import type { Metadata } from 'next'
import { ArticleLayout } from '@/components/ArticleLayout'

export const metadata: Metadata = {
  title: 'When Data Meets Context: The Case for Mixed Methods in Global Health',
}

export default function Article() {
  return (
    <ArticleLayout
      title="When Data Meets Context: The Case for Mixed Methods in Global Health"
      publication="Analysis"
      year={2024}
    >
      <p>
        Quantitative data tells us that a nutrition programme reduced stunting by 12 percentage points. It cannot tell us why mothers in one district trusted the community health workers while those in the neighbouring district did not. That second question often matters more for scale-up.
      </p>
      <p>
        Mixed methods research bridges this gap, not by compromising on rigour, but by recognising that different questions require different forms of evidence. My experience designing evaluations across six countries has consistently reinforced this principle.
      </p>
      <p>
        The resistance to mixed methods in global health typically comes from two directions. Quantitative researchers dismiss qualitative components as anecdotal, unscientific, or too subjective to inform policy. Qualitative researchers, for their part, sometimes view statistical analysis as reductive, stripping away the very context that makes health interventions succeed or fail. Both positions miss the point.
      </p>
      <p>
        In Ghana, I conducted a matching difference-in-differences evaluation of health financing reforms and their effect on childhood infection management. The quantitative findings were clear: the reforms had a statistically significant positive effect on treatment seeking behaviour. But the numbers alone could not explain why the effect was concentrated in certain districts and absent in others. It was only through facility-level interviews and community focus groups that we identified the mediating factors: the quality of communication about the reforms at the district level, the prior trust relationship between communities and health facilities, and the administrative capacity of local health teams to implement the new protocols.
      </p>
      <p>
        In Burundi, the pattern repeated itself in a different domain. Our prospective cohort study on neonatal survival produced survival curves and hazard ratios that identified the clinical risk factors for neonatal mortality. But the qualitative component revealed something the regression models never could: many mothers delayed seeking care not because of distance or cost, but because of deeply held beliefs about the spiritual causes of newborn illness that made hospital care seem irrelevant. No amount of supply-side health systems strengthening would have addressed that barrier without understanding it first.
      </p>
      <p>
        The practical challenge of mixed methods is integration. Too many studies that claim to be mixed methods are actually parallel studies: a quantitative analysis and a qualitative analysis conducted side by side but never brought into genuine conversation. True integration requires designing both components so that the findings of one directly inform the interpretation of the other. This means planning the integration strategy at the design stage, not improvising it during analysis.
      </p>
      <p>
        For evaluators working in global health, the question is not whether to use mixed methods. It is how to do so with the same level of rigour that we demand from each method individually. The evidence base for health interventions will remain incomplete until we commit to answering not only whether something works, but why, for whom, and under what conditions.
      </p>
    </ArticleLayout>
  )
}
