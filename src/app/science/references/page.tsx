'use client'

import { useState } from 'react'
import { ExternalLink, Search } from 'lucide-react'
import {
  Table, TableHeader, TableBody,
  TableRow, TableHead, TableCell
} from '@/components/ui/table'

const COLORS = {
  heroBg: '#0A0F1E',
  heroText: '#FFFFFF',
  heroMuted: '#98A2B3',
  label: '#1F4C9C',
  sectionBg: '#FFFFFF',
  sectionAlt: '#F5F0E8',
  headline: '#1A1F3C',
  body: '#6B7689',
  cardBg: '#F7F9FC',
  cardBorder: '#E8E0D0',
  cardTitle: '#1A1F3C',
  cardBody: '#6B7689',
  tagValidated: '#1F7A4D',
  tagValidatedBg: '#E8F3EC',
  tagGrounded: '#1F4C9C',
  tagGroundedBg: '#EAF0FA',
  transparencyBg: '#F7F9FC',
  transparencyText: '#1A1F3C',
  transparencyMuted: '#6B7689',
  divider: '#E8E0D0',
}

const references = [
  {
    id: '01',
    title: 'Adaptation and feasibility of the online version of the Fugl-Meyer scale for the assessment of patients following cerebrovascular accidents',
    authors: 'Dos Santos, C.L. et al.',
    journal: 'PLOS ONE',
    year: '2024',
    doi: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11502211/',
    relevance: 'Validates the Fugl-Meyer Assessment as the gold standard for upper extremity motor recovery after stroke: the scale our biomarkers correlate against.',
    tag: 'validated',
  },
  {
    id: '02',
    title: 'Adaptación y validación al español de la escala Fugl-Meyer en el manejo de la rehabilitación de pacientes con ictus',
    authors: 'Blanco, M.',
    journal: 'Universidad Complutense de Madrid',
    year: '2011',
    doi: 'https://produccioncientifica.ucm.es/documentos/5d39995129995206844416ea',
    relevance: 'Spanish validation of the Fugl-Meyer scale, directly relevant for our target market in Spain.',
    tag: 'validated',
  },
  {
    id: '03',
    title: 'Global, regional, and national burden of stroke and its risk factors, 1990–2021: a systematic analysis for the Global Burden of Disease Study 2021',
    authors: 'GBD 2021 Stroke Collaborators',
    journal: 'Stroke',
    year: '2024',
    doi: 'https://www.ahajournals.org/doi/10.1161/STROKEAHA.124.048033',
    relevance: 'Global stroke epidemiology: 12.2M new cases per year worldwide, 7.25M deaths annually.',
    tag: 'grounded',
  },
  {
    id: '04',
    title: 'World Stroke Organization (WSO): Global Stroke Fact Sheet 2025',
    authors: 'Feigin, V.L. et al.',
    journal: 'International Journal of Stroke',
    year: '2025',
    doi: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11786524/',
    relevance: 'Updated global stroke burden data. 1 in 4 people will suffer a stroke in their lifetime.',
    tag: 'grounded',
  },
  {
    id: '05',
    title: 'Heart Disease and Stroke Statistics: 2024 Update',
    authors: 'Virani, S.S. et al.',
    journal: 'Circulation',
    year: '2024',
    doi: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001209',
    relevance: '795,000 new strokes per year in the US. One death every 3 minutes 14 seconds.',
    tag: 'grounded',
  },
  {
    id: '06',
    title: 'Adherence in Digital Mental Health Apps',
    authors: 'Morales, J. et al.',
    journal: 'JMIR Human Factors',
    year: '2025',
    doi: 'https://humanfactors.jmir.org/2025/1/e69464',
    relevance: 'Evidence base for adherence challenges in digital health, directly relevant to FixedGap\'s gamification approach.',
    tag: 'grounded',
  },
  {
    id: '07',
    title: 'Effect of a Mobile Health App on Treatment Adherence in Rehabilitation',
    authors: 'Suso-Ribera, C. et al.',
    journal: 'JMIR Rehabilitation and Assistive Technologies',
    year: '2023',
    doi: 'https://rehab.jmir.org/2023/1/e43507/',
    relevance: 'Digital health apps improve rehabilitation adherence: supports the clinical rationale for FixedGap\'s game-based approach.',
    tag: 'grounded',
  },
  {
    id: '08',
    title: 'Global, regional, and national burden of stroke',
    authors: 'Collaborators of The Lancet Neurology',
    journal: 'The Lancet Neurology',
    year: '2026',
    doi: 'https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(26)00093-1/fulltext',
    relevance: 'Most recent global stroke burden data: 12M+ new cases annually, 70% increase over three decades.',
    tag: 'grounded',
  },
]

const groundedRefs = [
  {
    id: '03',
    title: 'Global, regional, and national burden of stroke and its risk factors, 1990–2021',
    relevance: 'Stroke epidemiology',
    year: '2024',
    type: 'Clinical burden',
    authors: 'GBD 2021 Stroke Collaborators',
    journal: 'Stroke',
    doi: 'https://www.ahajournals.org/doi/10.1161/STROKEAHA.124.048033',
  },
  {
    id: '04',
    title: 'World Stroke Organization (WSO): Global Stroke Fact Sheet 2025',
    relevance: 'Lifetime stroke risk',
    year: '2025',
    type: 'Clinical burden',
    authors: 'Feigin, V.L. et al.',
    journal: 'International Journal of Stroke',
    doi: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11786524/',
  },
  {
    id: '05',
    title: 'Heart Disease and Stroke Statistics: 2024 Update',
    relevance: 'US stroke incidence',
    year: '2024',
    type: 'Epidemiology',
    authors: 'Virani, S.S. et al.',
    journal: 'Circulation',
    doi: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001209',
  },
  {
    id: '06',
    title: 'Adherence in Digital Mental Health Apps',
    relevance: 'Digital adherence',
    year: '2025',
    type: 'Digital health',
    authors: 'Morales, J. et al.',
    journal: 'JMIR Human Factors',
    doi: 'https://humanfactors.jmir.org/2025/1/e69464',
  },
  {
    id: '07',
    title: 'Effect of a Mobile Health App on Treatment Adherence in Rehabilitation',
    relevance: 'Rehab engagement',
    year: '2023',
    type: 'Rehabilitation',
    authors: 'Suso-Ribera, C. et al.',
    journal: 'JMIR Rehabilitation',
    doi: 'https://rehab.jmir.org/2023/1/e43507/',
  },
  {
    id: '08',
    title: 'Global, regional, and national burden of stroke',
    relevance: 'Global stroke data',
    year: '2026',
    type: 'Clinical burden',
    authors: 'Collaborators of The Lancet Neurology',
    journal: 'The Lancet Neurology',
    doi: 'https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(26)00093-1/fulltext',
  },
]

const filterTypes = ['All', 'Clinical burden', 'Epidemiology', 'Digital health', 'Rehabilitation']

function ClinicalEvidenceTable() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = groundedRefs.filter(ref => {
    const matchesSearch = search === '' ||
      ref.title.toLowerCase().includes(search.toLowerCase()) ||
      ref.relevance.toLowerCase().includes(search.toLowerCase()) ||
      ref.authors.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === 'All' || ref.type === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex flex-col gap-4">

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3">

        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search papers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              backgroundColor: '#F7F9FC',
              border: '1px solid #E8E0D0',
              borderRadius: '8px',
              padding: '8px 12px 8px 32px',
              fontSize: '13px',
              color: '#1A1F3C',
              width: '100%',
              outline: 'none',
            }}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {filterTypes.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                backgroundColor: activeFilter === filter ? '#1A1F3C' : '#F7F9FC',
                color: activeFilter === filter ? '#FFFFFF' : '#6B7689',
                border: '1px solid #E8E0D0',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div style={{
        border: '1px solid #E8E0D0',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <Table>
          <TableHeader style={{ backgroundColor: '#F7F9FC' }}>
            <TableRow>
              <TableHead className="h-12 px-3 text-left align-middle font-medium text-muted-foreground" style={{ color: '#6B7689', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', width: '40px' }}>No.</TableHead>
              <TableHead className="h-12 px-3 text-left align-middle font-medium text-muted-foreground" style={{ color: '#6B7689', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Reference</TableHead>
              <TableHead className="h-12 px-3 text-left align-middle font-medium text-muted-foreground" style={{ color: '#6B7689', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Relevance</TableHead>
              <TableHead className="h-12 px-3 text-left align-middle font-medium text-muted-foreground" style={{ color: '#6B7689', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', width: '60px' }}>Year</TableHead>
              <TableHead className="h-12 px-3 text-left align-middle font-medium text-muted-foreground" style={{ color: '#6B7689', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Type</TableHead>
              <TableHead className="h-12 px-3 text-left align-middle font-medium text-muted-foreground" style={{ width: '40px' }}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell className="py-4 px-3 align-middle" colSpan={6} style={{ textAlign: 'center', color: '#6B7689', padding: '24px', fontSize: '14px' }}>
                  No references found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(ref => (
                <TableRow key={ref.id} style={{ backgroundColor: '#FFFFFF', minHeight: '72px' }}>
                  <TableCell className="py-4 px-3 align-middle" style={{ color: '#1F4C9C', fontWeight: 800, fontSize: '15px' }}>
                    {ref.id}
                  </TableCell>
                  <TableCell className="py-4 px-3 align-middle">
                    <p style={{ color: '#1A1F3C', fontSize: '14px', fontWeight: 600, lineHeight: 1.5, marginBottom: '4px' }}>
                      {ref.title}
                    </p>
                    <p style={{ color: '#6B7689', fontSize: '13px' }}>
                      {ref.authors} · {ref.journal}
                    </p>
                  </TableCell>
                  <TableCell className="py-4 px-3 align-middle" style={{ color: '#6B7689', fontSize: '13px' }}>
                    {ref.relevance}
                  </TableCell>
                  <TableCell className="py-4 px-3 align-middle" style={{ color: '#6B7689', fontSize: '13px' }}>
                    {ref.year}
                  </TableCell>
                  <TableCell className="py-4 px-3 align-middle">
                    <span style={{
                      backgroundColor: '#EAF0FA',
                      color: '#1F4C9C',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '5px 12px',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                    }}>
                      {ref.type}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-3 align-middle">
                    <a
                      href={ref.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1F4C9C' }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Count */}
      <p style={{ color: '#6B7689', fontSize: '12px' }}>
        Showing {filtered.length} of {groundedRefs.length} references
      </p>

    </div>
  )
}

export default function ReferencesPage() {
  const validated = references.filter(r => r.tag === 'validated')
  const grounded = references.filter(r => r.tag === 'grounded')

  return (
    <main>

      {/* HERO */}
      <section style={{ backgroundColor: COLORS.heroBg }}
        className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Research References
          </span>
          <h1 style={{ color: COLORS.heroText }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl">
            The evidence behind every biomarker.
          </h1>
          <p style={{ color: COLORS.heroMuted }}
            className="text-lg mt-6 max-w-2xl leading-relaxed">
            Every metric FixedGap captures is grounded in peer-reviewed clinical
            literature. Here is the scientific foundation behind our biomarker panel.
          </p>
        </div>
      </section>

      {/* DIRECTLY VALIDATED */}
      <section style={{ backgroundColor: COLORS.sectionBg }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Directly validated
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl font-bold mt-4 mb-2">
            Evidence with direct validation.
          </h2>
          <p style={{ color: COLORS.body }}
            className="text-base mb-12 max-w-2xl leading-relaxed">
            These references directly validate the specific metrics and methods
            FixedGap uses to capture and score hand kinematics.
          </p>

          <div className="flex flex-col gap-4">
            {validated.map(ref => (
              <ReferenceCard key={ref.id} reference={ref} COLORS={COLORS} />
            ))}
          </div>

        </div>
      </section>

      {/* CLINICALLY GROUNDED */}
      <section style={{ backgroundColor: COLORS.sectionAlt }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            Clinically grounded
          </span>
          <h2 style={{ color: COLORS.headline }}
            className="text-3xl font-bold mt-4 mb-2">
            Strong theoretical foundation.
          </h2>
          <p style={{ color: COLORS.body }}
            className="text-base mb-10 max-w-2xl leading-relaxed">
            These references provide the clinical rationale for our biomarkers.
            Direct validation in our specific implementation is ongoing.
          </p>

          <ClinicalEvidenceTable />

        </div>
      </section>

      {/* NOTA DE TRANSPARENCIA */}
      <section style={{ backgroundColor: COLORS.transparencyBg }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <span style={{ color: COLORS.label }}
            className="text-xs font-semibold tracking-widest uppercase">
            A note on transparency
          </span>

          <p style={{ color: COLORS.transparencyText }}
            className="text-lg mt-6 leading-relaxed">
            FixedGap is currently in clinical validation phase. The references
            above represent the scientific foundation on which we built our
            biomarker panel, not direct validation of our specific product implementation.
          </p>
          <p style={{ color: COLORS.transparencyMuted }}
            className="text-base mt-4 leading-relaxed">
            We are actively conducting pilot studies with neurologists and
            rehabilitation clinics to generate direct clinical evidence.
            Results will be published as they become available.
          </p>

        </div>
      </section>

    </main>
  )
}

// Componente de referencia individual
function ReferenceCard({ reference, COLORS }: { reference: typeof references[0], COLORS: any }) {
  return (
    <div style={{
      backgroundColor: COLORS.cardBg,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: '12px',
      padding: '24px 28px',
      display: 'flex',
      gap: '20px',
      alignItems: 'flex-start',
    }}>

      {/* Número */}
      <span style={{
        color: COLORS.label,
        fontSize: '13px',
        fontWeight: 700,
        minWidth: '28px',
        paddingTop: '2px',
      }}>
        {reference.id}
      </span>

      {/* Contenido */}
      <div style={{ flex: 1 }}>
        <div className="flex items-start justify-between gap-4">
          <h3 style={{ color: COLORS.cardTitle, fontSize: '15px', fontWeight: 700, lineHeight: 1.4 }}>
            {reference.title}
          </h3>
          {reference.doi !== '#' && (
            <a href={reference.doi} target="_blank" rel="noopener noreferrer"
              style={{ color: COLORS.label, flexShrink: 0 }}
              className="hover:opacity-70 transition-opacity mt-0.5">
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <p style={{ color: COLORS.body, fontSize: '13px', marginTop: '4px' }}>
          {reference.authors} · <em>{reference.journal}</em> · {reference.year}
        </p>

        <p style={{ color: COLORS.cardBody, fontSize: '13px', marginTop: '10px', lineHeight: 1.6 }}>
          {reference.relevance}
        </p>

        {/* Tag */}
        <div style={{
          display: 'inline-flex',
          marginTop: '12px',
          backgroundColor: reference.tag === 'validated' ? COLORS.tagValidatedBg : COLORS.tagGroundedBg,
          color: reference.tag === 'validated' ? COLORS.tagValidated : COLORS.tagGrounded,
          fontSize: '11px',
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: '999px',
        }}>
          {reference.tag === 'validated' ? 'Directly validated' : 'Clinically grounded'}
        </div>
      </div>

    </div>
  )
}
