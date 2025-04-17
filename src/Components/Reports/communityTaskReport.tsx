interface Submissions {
  id: number
  name: string
  email: string
  category: string
  indicator: string
  dateSubmitted: string
  status: string
}

interface Category {
  id: number
  title: string
  description: string
  dateCreated: string
  indicator: number
}

export const submissions: Submissions[] = [
  {
    id: 1,
    name: 'Ekene Duelle',
    email: 'getcirooles@gmail.com',
    category: 'NCD Prevention',
    indicator: 'Mental health promotion',
    dateSubmitted: '22 Sep 2024',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Derrick Maxwell',
    email: 'Dmax@gmail.com',
    category: 'Sexual Health',
    indicator: 'Abortion prevention',
    dateSubmitted: '22 Sep 2024',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Femi Pitter',
    email: 'hourglass@gmail.com',
    category: 'Climate, Environment',
    indicator: 'Rest room provision',
    dateSubmitted: '22 Sep 2024',
    status: 'pending',
  },
  {
    id: 4,
    name: 'Peniel Sam',
    email: 'Fegrace@gmail.com',
    category: 'Health services',
    indicator: 'Health insurance Promotion',
    dateSubmitted: '22 Sep 2024',
    status: 'reviewed',
  },
  {
    id: 5,
    name: 'Peniel Sam',
    email: 'Fegrace@gmail.com',
    category: 'Immunization and Health',
    indicator: 'Vaccine hesitancy reduction',
    dateSubmitted: '22 Sep 2024',
    status: 'reviewed',
  },
]

const categories: Category[] = [
  {
    id: 1,
    title: 'NCD Prevention',
    description:
      'NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.',
    indicator: 6,
    dateCreated: '22 Sep 2024',
  },
  {
    id: 2,
    title: 'Sexual Health',
    description:
      'NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.',
    indicator: 6,
    dateCreated: '22 Sep 2024',
  },
  {
    id: 3,
    title: 'Climate, Environment, and health',
    description:
      'NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.',
    indicator: 8,
    dateCreated: '22 Sep 2024',
  },
  {
    id: 4,
    title: 'Health Service Delivery',
    description:
      'NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.',
    indicator: 5,
    dateCreated: '22 Sep 2024',
  },
  {
    id: 5,
    title: 'Immunization and vaccines',
    description:
      'NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.',
    indicator: 3,
    dateCreated: '22 Sep 2024',
  },
  {
    id: 6,
    title: 'MNCH',
    description:
      'NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.',
    indicator: 10,
    dateCreated: '22 Sep 2024',
  },
]
