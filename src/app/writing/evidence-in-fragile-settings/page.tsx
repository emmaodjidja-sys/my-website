import type { Metadata } from 'next'
import { ArticleLayout } from '@/components/ArticleLayout'

export const metadata: Metadata = {
  title: 'Evidence in Fragile Settings: Lessons from a Decade of Field Evaluation',
}

export default function Article() {
  return (
    <ArticleLayout
      title="Evidence in Fragile Settings: Lessons from a Decade of Field Evaluation"
      publication="Reflection"
      year={2025}
    >
      <p>
        Working across South Sudan, Burundi, and the Sahel has taught me that the most valuable evaluations are not necessarily the most methodologically sophisticated ones. They are the ones designed with enough pragmatism to survive first contact with the field.
      </p>
      <p>
        In displacement camps where baseline data is scarce and programme timelines shift with each security incident, the evaluator who insists on textbook designs will produce nothing at all. What follows are the principles I have come to rely on when the conditions on the ground refuse to cooperate with the evaluation plan.
      </p>
      <p>
        The first principle is to design for attrition. In South Sudan, I managed a longitudinal nutrition study where we lost contact with thirty percent of our sample within six months. Families moved to new camps, crossed borders, or simply became unreachable as road networks deteriorated during the rainy season. We had anticipated some loss, but not at that scale. The study survived because we had oversampled at baseline and built tracking protocols into the community health worker network. Without those precautions, the entire evaluation would have produced nothing publishable.
      </p>
      <p>
        The second principle is to invest in local research capacity. In Burundi, I founded the Kigutu M&E Institute specifically because I recognised that flying in external evaluators for two week missions was producing data that nobody on the ground could verify, contextualise, or act upon. Training thirty two clinicians and programme staff in basic epidemiology and evaluation methods did more for evidence quality than any methodological refinement I could have introduced from outside. Those staff members understood the communities they served. They knew which survey questions would be misinterpreted, which sampling frames were outdated, and which health facilities had been abandoned during the most recent crisis.
      </p>
      <p>
        The third principle is to be honest about what your design can and cannot claim. In fragile settings, true experimental designs are rarely feasible. Randomisation raises ethical concerns when services are scarce, and control groups dissolve as populations move. Quasi-experimental approaches such as difference-in-differences or propensity score matching offer workable alternatives, but they require assumptions that must be stated clearly and tested wherever possible. I have seen too many evaluations in humanitarian settings claim causal impact based on simple pre-post comparisons with no counterfactual. That is not evidence. It is storytelling with numbers.
      </p>
      <p>
        The fourth principle, and perhaps the most important, is that timeliness matters more than perfection. A good-enough evaluation delivered while the programme can still be adjusted is worth more than a methodologically flawless study published two years after the funding cycle has ended. This is not an argument against rigour. It is an argument for designing rigour into the programme timeline rather than appending it at the end.
      </p>
      <p>
        These principles are not original. Experienced field evaluators will recognise them immediately. But they are violated constantly, usually by organisations that have the resources to know better. The gap between what we know about evaluation in fragile settings and what we actually practice remains one of the most frustrating features of the international development sector.
      </p>
    </ArticleLayout>
  )
}
