'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { MapCountry } from '@/lib/types'

// Simplified country paths (Natural Earth 110m inspired, hand-simplified for SVG)
// Coordinate system: Mercator-like, x = longitude offset, y = latitude offset
// viewBox is calibrated to show Africa + Middle East + South Asia
const COUNTRY_PATHS: Record<string, string> = {
  // West Africa
  GHA: 'M 161,228 l 6,-2 3,4 -1,8 -3,6 -7,2 -2,-4 0,-8 4,-6 z',
  BFA: 'M 155,215 l 12,-1 4,3 2,6 -3,5 -8,2 -6,-1 -4,-4 0,-6 3,-4 z',
  MLI: 'M 145,195 l 18,0 5,8 -2,12 -8,5 -12,0 -6,-6 -2,-10 7,-9 z',
  NER: 'M 170,195 l 20,0 4,6 0,14 -6,5 -14,0 -6,-5 -2,-12 4,-8 z',
  // East Africa
  SSD: 'M 230,230 l 14,0 6,8 -2,12 -8,5 -10,0 -6,-5 -2,-12 8,-8 z',
  BDI: 'M 238,260 l 4,0 2,4 -1,5 -4,1 -3,-2 -1,-4 3,-4 z',
  // North Africa
  TUN: 'M 175,170 l 4,-3 3,2 1,8 -2,5 -4,1 -3,-4 1,-9 z',
  // South Asia
  LKA: 'M 380,240 l 3,-2 2,3 0,6 -2,4 -3,1 -2,-3 0,-5 2,-4 z',
}

// Simplified background countries for context (Africa + Middle East outline)
const BG_COUNTRIES = [
  // Morocco
  'M 155,170 l 10,-5 5,3 -2,10 -8,3 -7,-4 2,-7 z',
  // Algeria
  'M 170,165 l 15,-5 8,8 0,20 -10,5 -12,-3 -5,-15 4,-10 z',
  // Libya
  'M 195,168 l 15,-2 8,10 0,18 -8,5 -12,0 -6,-12 3,-19 z',
  // Egypt
  'M 218,175 l 8,-3 6,8 -2,18 -6,5 -8,-2 -2,-16 4,-10 z',
  // Mauritania
  'M 140,200 l 10,-5 5,5 0,15 -8,3 -8,-5 1,-13 z',
  // Senegal
  'M 138,218 l 8,-2 3,4 -2,5 -6,1 -4,-3 1,-5 z',
  // Guinea
  'M 142,225 l 7,-1 3,4 -1,6 -5,2 -5,-3 1,-8 z',
  // Sierra Leone
  'M 143,233 l 4,0 2,4 -2,4 -4,0 -2,-4 2,-4 z',
  // Liberia
  'M 147,237 l 5,0 2,4 -2,5 -5,0 -2,-4 2,-5 z',
  // Ivory Coast
  'M 152,228 l 7,-1 3,6 -1,7 -6,2 -5,-3 0,-7 2,-4 z',
  // Togo
  'M 168,226 l 2,-1 1,8 -1,5 -2,0 -1,-7 1,-5 z',
  // Benin
  'M 171,223 l 3,-1 1,9 -1,6 -3,0 -1,-8 1,-6 z',
  // Nigeria
  'M 175,218 l 12,0 4,8 -2,12 -10,3 -6,-5 -1,-12 3,-6 z',
  // Cameroon
  'M 178,235 l 6,-1 4,8 -2,10 -6,2 -4,-6 0,-8 2,-5 z',
  // DRC
  'M 215,250 l 18,0 4,15 -6,12 -14,2 -6,-10 0,-12 4,-7 z',
  // Uganda
  'M 235,245 l 6,0 3,5 -2,7 -5,1 -4,-4 0,-5 2,-4 z',
  // Rwanda
  'M 237,256 l 4,0 2,3 -2,3 -4,0 -2,-3 2,-3 z',
  // Kenya
  'M 245,240 l 8,0 3,8 -2,10 -6,3 -5,-5 -2,-10 4,-6 z',
  // Tanzania
  'M 240,260 l 10,0 4,10 -3,10 -8,2 -5,-6 -2,-10 4,-6 z',
  // Ethiopia
  'M 240,220 l 14,0 5,8 -2,12 -10,4 -8,-4 -3,-12 4,-8 z',
  // Somalia
  'M 258,218 l 6,-5 3,5 -2,15 -5,8 -4,-5 0,-12 2,-6 z',
  // Sudan
  'M 215,195 l 15,0 5,12 -2,18 -10,5 -10,-5 -2,-18 4,-12 z',
  // Chad
  'M 195,200 l 12,0 4,10 -2,15 -8,3 -8,-5 -2,-13 4,-10 z',
  // Saudi Arabia
  'M 250,190 l 15,-5 8,10 -2,20 -10,8 -12,-5 -3,-18 4,-10 z',
  // Yemen
  'M 262,215 l 8,-2 3,5 -4,6 -6,1 -3,-4 2,-6 z',
  // Oman
  'M 275,200 l 5,-3 3,6 -2,8 -5,2 -3,-5 2,-8 z',
  // Iran
  'M 285,180 l 15,-5 5,10 -3,15 -10,5 -8,-5 -3,-12 4,-8 z',
  // Iraq
  'M 265,180 l 10,-3 5,8 -3,10 -8,3 -6,-5 0,-8 2,-5 z',
  // Syria
  'M 255,172 l 8,-2 4,5 -2,8 -6,2 -5,-5 1,-8 z',
  // Turkey
  'M 235,162 l 20,-3 5,6 -3,8 -15,3 -8,-5 1,-9 z',
  // Pakistan
  'M 310,185 l 12,-5 5,10 -3,15 -8,5 -8,-5 -2,-12 4,-8 z',
  // India
  'M 325,195 l 18,-3 5,15 -2,25 -8,15 -10,5 -8,-10 -2,-20 3,-18 4,-9 z',
  // Afghanistan
  'M 305,175 l 8,-3 5,6 -2,8 -6,3 -6,-4 1,-10 z',
  // Mozambique
  'M 245,280 l 5,-2 3,10 -1,12 -4,3 -4,-8 0,-10 1,-5 z',
  // Madagascar
  'M 260,280 l 4,-2 2,10 -1,8 -4,2 -2,-8 1,-10 z',
  // Angola
  'M 200,260 l 10,0 3,10 -2,10 -8,2 -5,-6 0,-10 2,-6 z',
  // Zambia
  'M 225,268 l 10,0 3,7 -3,7 -8,2 -4,-4 0,-7 2,-5 z',
  // South Africa
  'M 215,295 l 15,0 5,8 -3,8 -12,3 -8,-5 0,-8 3,-6 z',
]

interface WorldMapProps {
  countries: MapCountry[]
}

export function WorldMap({ countries }: WorldMapProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <svg
      ref={ref}
      viewBox="120 150 280 170"
      className="w-full max-w-[600px] mx-auto lg:mx-0"
      aria-label="Map showing countries where Emmanuel has worked"
      role="img"
    >
      {/* Background countries */}
      {BG_COUNTRIES.map((d, i) => (
        <path
          key={i}
          d={d}
          className="fill-ink-800 stroke-ink-700/30 light:fill-cream-200 light:stroke-cream-300/40"
          strokeWidth={0.3}
        />
      ))}

      {/* Highlighted countries */}
      {countries.map((country) =>
        country.ids.map((id) => {
          const path = COUNTRY_PATHS[id]
          if (!path) return null
          return (
            <motion.path
              key={id}
              d={path}
              fill="#c4653a"
              initial={reduced ? { fillOpacity: country.opacity } : { fillOpacity: 0 }}
              animate={inView ? { fillOpacity: country.opacity } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="stroke-terra-700/40"
              strokeWidth={0.4}
            />
          )
        })
      )}

      {/* Country labels */}
      {countries.map((country) => (
        <motion.text
          key={country.name}
          x={country.labelPosition.x + 160}
          y={country.labelPosition.y + 200}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="fill-cream-300 light:fill-ink-500"
          fontSize={3.5}
          fontWeight={600}
          letterSpacing={0.5}
          textAnchor="middle"
          style={{ fontFamily: 'var(--font-source)', textTransform: 'uppercase' as const }}
        >
          {country.name}
        </motion.text>
      ))}
    </svg>
  )
}
