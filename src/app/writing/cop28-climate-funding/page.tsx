import type { Metadata } from 'next'
import { ArticleLayout } from '@/components/ArticleLayout'

export const metadata: Metadata = {
  title: 'COP28 Sparks Urgency Amid Climate Funding Shortfall',
}

export default function Article() {
  return (
    <ArticleLayout
      title="COP28 Sparks Urgency Amid Climate Funding Shortfall"
      publication="Think Global Health (CFR)"
      year={2024}
    >
      <p>
        The conclusion of COP28 left the international community with a familiar feeling: urgency acknowledged, commitments made, and a persistent gap between what was promised and what will be delivered. For multilateral organisations working at the intersection of climate change and human security, the funding shortfall is not abstract. It determines whether adaptation programmes reach the communities that need them most.
      </p>
      <p>
        The Sahel offers a stark illustration. Across Burkina Faso, Mali, and Niger, the convergence of rising temperatures, erratic rainfall, and protracted conflict has created conditions where food insecurity and violent extremism reinforce each other. Pastoral communities that once migrated seasonally in response to rainfall patterns now face both ecological collapse and armed groups competing for the same diminishing resources. The evidence linking climate stress to recruitment into violent extremist organisations is growing, yet funding for integrated climate-security programming remains fragmented across siloed institutional mandates.
      </p>
      <p>
        The challenge is not a lack of understanding. Researchers and practitioners have documented the climate-conflict-food insecurity nexus in detail. The challenge is translating that understanding into financing mechanisms that match the scale and complexity of the problem. Current climate finance architecture channels adaptation funding through national governments, but in fragile states where government capacity is limited and territorial control is contested, those funds rarely reach the most vulnerable populations.
      </p>
      <p>
        What would a more effective approach look like? First, multilateral climate funds need dedicated windows for fragile and conflict-affected settings, with streamlined access procedures that reflect the operational realities of working in insecure environments. Second, climate adaptation and peacebuilding programmes should be designed and funded jointly rather than in parallel. The communities experiencing the worst effects of climate change are often the same ones targeted by armed groups. Treating these as separate problems produces separate programmes that compete for the same limited resources and fail to address the underlying dynamics.
      </p>
      <p>
        Third, and most critically, climate finance must invest in local evidence systems. The data infrastructure needed to track climate impacts on food security and conflict dynamics in the Sahel is minimal. Without it, programming decisions rely on satellite imagery and capital-city analysis rather than the ground-level realities that determine whether an intervention will succeed or fail.
      </p>
      <p>
        COP28 produced language that acknowledged these connections. Whether that language translates into funding flows will determine whether the next generation of climate adaptation programming repeats the mistakes of the last or begins to address the crisis at the scale it demands.
      </p>
    </ArticleLayout>
  )
}
