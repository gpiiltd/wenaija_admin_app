interface Institution {
  name: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  icon: string;
  date: string;
  acceptancyRating: number;
  competencyRating: number;
  privacyRating: number;
  globalRating: number;
  ratings: number[];
  website?: string; 
}

export const stats = [
  {
    title: "Wards",
    value: 1234,
    icon: "ward",
  },
  {
    title: "LGAs",
    value: 1234,
    icon: "lgs",
  },
  {
    title: "States",
    value: 1234,
    icon: "states",
  },
];

export const recentInstitutions: Institution[] = [
  {
    name: "Quotient Specialist Hospital (QSH)",
    address: "No 5, Lekki view, Lagos state, Nigeria",
    hours: "Monday - Sunday (24 hours)",
    phone: "08105201636",
    email: "Quotientspecialist@gmail.com",
    icon: "quotient",
    date: "15 Jan 2022",
    acceptancyRating: 85,
    competencyRating: 90,
    privacyRating: 88,
    globalRating: 87,
    ratings: [92, 67, 40, 82],
    website: "http://www.quotientspecialist.com",
  },
  {
    name: "Green Valley Hospital",
    address: "45 Green Valley Road, Ikeja, Lagos state, Nigeria",
    hours: "Monday - Saturday (7 AM - 9 PM)",
    phone: "08098765432",
    email: "contact@greenvalleyhospital.com",
    icon: "quotient",
    date: "15 Jan 2022",
    acceptancyRating: 85,
    competencyRating: 90,
    privacyRating: 88,
    globalRating: 87,
    ratings: [92, 67, 40, 82],
    website: "http://www.greenvalleyhospital.com",
  },
  {
    name: "Blue Cross Clinic",
    address: "78 Blue Cross Street, Surulere, Lagos state, Nigeria",
    hours: "Monday - Friday (8 AM - 5 PM)",
    phone: "07012345678",
    email: "info@bluecrossclinic.com",
    icon: "quotient",
    date: "15 Jan 2022",
    acceptancyRating: 85,
    competencyRating: 90,
    privacyRating: 88,
    globalRating: 87,
    ratings: [92, 67, 40, 82],
    website: "http://www.bluecrossclinic.com",
  },
  {
    name: "Hope Medical Center",
    address: "12 Hope Avenue, Yaba, Lagos state, Nigeria",
    hours: "Monday - Sunday (24 hours)",
    phone: "08123456789",
    email: "support@hopemedical.com",
    icon: "quotient",
    date: "15 Jan 2022",
    acceptancyRating: 85,
    competencyRating: 90,
    privacyRating: 88,
    globalRating: 87,
    ratings: [92, 67, 40, 82],
    website: "http://www.hopemedical.com",
  },
  {
    name: "Sunrise Health Clinic",
    address: "89 Sunrise Lane, Ikoyi, Lagos state, Nigeria",
    hours: "Monday - Saturday (8 AM - 8 PM)",
    phone: "09087654321",
    email: "info@sunrisehealth.com",
    icon: "quotient",
    date: "15 Jan 2022",
    acceptancyRating: 85,
    competencyRating: 90,
    privacyRating: 88,
    globalRating: 87,
    ratings: [92, 67, 40, 82],
    website: "http://www.sunrisehealth.com",
  },
  {
    name: "Wellness Hospital",
    address: "34 Wellness Drive, Victoria Island, Lagos state, Nigeria",
    hours: "Monday - Sunday (24 hours)",
    phone: "08011223344",
    email: "contact@wellnesshospital.com",
    icon: "quotient",
    date: "15 Jan 2022",
    acceptancyRating: 85,
    competencyRating: 90,
    privacyRating: 88,
    globalRating: 87,
    ratings: [92, 67, 40, 82],
    website: "http://www.wellnesshospital.com",
  },
  {
    name: "Sunshine Medical Center",
    address: "123 Sunshine Blvd, Victoria Island, Lagos state, Nigeria",
    hours: "Monday - Friday (8 AM - 6 PM)",
    phone: "08012345678",
    email: "info@sunshinemedical.com",
    icon: "quotient",
    date: "15 Jan 2022",
    acceptancyRating: 85,
    competencyRating: 90,
    privacyRating: 88,
    globalRating: 87,
    ratings: [92, 67, 40, 82],
    website: "http://www.sunshinemedical.com",
  },
];

export const hoursArray = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12; // Convert 0 to 12 for 12 AM/PM
  const period = i < 12 ? "am" : "pm"; // Determine AM/PM
  return `${hour}:00 ${period}`; // Format the hour
})
  .concat(
    Array.from({ length: 24 }, (_, i) => {
      const hour = i % 12 === 0 ? 12 : i % 12; // Convert 0 to 12 for 12 AM/PM
      const period = i < 12 ? "am" : "pm"; // Determine AM/PM
      return `${hour}:30 ${period}`; // Format the half hour
    })
  )
  .sort((a, b) => {
    const timeA = a.split(" ")[0].split(":").map(Number);
    const timeB = b.split(" ")[0].split(":").map(Number);
    const totalMinutesA =
      timeA[0] * 60 + (timeA[1] === 30 ? 30 : 0) + (a.includes("pm") ? 720 : 0);
    const totalMinutesB =
      timeB[0] * 60 + (timeB[1] === 30 ? 30 : 0) + (b.includes("pm") ? 720 : 0);
    return totalMinutesA - totalMinutesB;
  });

export const institution = {
  name: "Quotient Specialist Hospital (QSH)",
  address: "No 5, Lekki view, Lagos Island, Lagos state, Nigeria",
  phone: "08105201636",
  email: "quotientspecialist@gmail.com",
  hours: "Monday - Sunday (24 hours)",
  indicators: [
    {
      no: 1,
      category: "Acceptability of services",
      score: 40,
      rank: 2,
      responses: 1240,
    },
    {
      no: 2,
      category: "Competency of health workers",
      score: 67,
      rank: 5,
      responses: 189,
    },
    {
      no: 3,
      category: "Privacy and confidentiality",
      score: 82,
      rank: 3,
      responses: 256,
    },
    {
      no: 4,
      category: "Global assessment",
      score: 92,
      rank: 1,
      responses: 2264,
    },
  ],
};

export const getColor = (score: number) => {
  if (score < 50) return "#7F56D9";
  if (score < 70) return "#BF56D9";
  if (score < 90) return "#D9569A";
  return "#63D956";
};

export const individualResponses = [
  {
    name: "Deborah N.",
    comment: "Very clean",
    review: "The place was not maintained well.",
    images: [
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MHwxfHNlYXJjaHw2fHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
    ],
  },
  {
    name: "Kamsi E.",
    comment: "Very unclean",
    review: "I expected better hygiene.",
    images: [
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
    ],
  },
  {
    name: "Chidi M.",
    comment: "Very unclean",
    review: "Not up to standard.",
    images: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MHwxfHNlYXJjaHw0fHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
    ],
  },
  {
    name: "Chidi M.",
    comment: "Somewhat clean",
    review: "Not up to standard.",
    images: [
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MHwxfHNlYXJjaHw1fHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
    ],
  },
  {
    name: "Chidi M.",
    comment: "Very unclean",
    review: "Not up to standard.",
    images: [
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MHwxfHNlYXJjaHw2fHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
    ],
  },
  {
    name: "Chidi M.",
    comment: "Somewhat unclean",
    review: "Not up to standard.",
    images: [
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MHwxfHNlYXJjaHwxMHx8dHJhdmVsfGVufDB8fHx8MTczNzY5NDM3Nnww&ixlib=rb-4.0.3&q=80&w=400",
    ],
  },
  {
    name: "Chidi M.",
    comment: "Neutral",
    review: "Not up to standard.",
    images: [
      "https://source.unsplash.com/random/150x150?sig=19",
      "https://source.unsplash.com/random/150x150?sig=20",
    ],
  },
];

export const genericData = [
  {
    id: 1,
    name: "Deborah N.",
    date: "Nov. 12, 2024",
    images: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
    ],
    reportReview: "This is a sample report review. It contains exactly fifty words to meet the requirement. The review provides a brief overview of the report, highlighting key points and observations. It is concise and to the point, ensuring that all necessary information is conveyed effectively."
  },
  {
    id: 2,
    name: "Kamsi E.",
    date: "Nov. 12, 2024",
    images: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MHwxfHNlYXJjaHw2fHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "path/to/image5.jpg",
    ],
    reportReview: "This is a sample report review. It contains exactly fifty words to meet the requirement. The review provides a brief overview of the report, highlighting key points and observations. It is concise and to the point, ensuring that all necessary information is conveyed effectively."
  },
  {
    id: 3,
    name: "George O.",
    date: "Nov. 12, 2024",
    images: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
    ],
    reportReview: "This is a sample report review. It contains exactly fifty words to meet the requirement. The review provides a brief overview of the report, highlighting key points and observations. It is concise and to the point, ensuring that all necessary information is conveyed effectively."
  },
  {
    id: 4,
    name: "Deborah N.",
    date: "Nov. 12, 2024",
    images: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "path/to/image10.jpg",
    ],
    reportReview: "This is a sample report review. It contains exactly fifty words to meet the requirement. The review provides a brief overview of the report, highlighting key points and observations. It is concise and to the point, ensuring that all necessary information is conveyed effectively."
  },
  {
    id: 5,
    name: "Kamsi E.",
    date: "Nov. 12, 2024",
    images: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MHwxfHNlYXJjaHw2fHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MHwxfHNlYXJjaHw2fHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "path/to/image13.jpg",
      "path/to/image14.jpg",
      "path/to/image15.jpg",
    ],
    reportReview: "This is a sample report review. It contains exactly fifty words to meet the requirement. The review provides a brief overview of the report, highlighting key points and observations. It is concise and to the point, ensuring that all necessary information is conveyed effectively."
  },
  {
    id: 8,
    name: "Deborah N.",
    date: "Nov. 12, 2024",
    images: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "path/to/image10.jpg",
    ],
    reportReview: "This is a sample report review. It contains exactly fifty words to meet the requirement. The review provides a brief overview of the report, highlighting key points and observations. It is concise and to the point, ensuring that all necessary information is conveyed effectively."
  },
  {
    id: 8,
    name: "Deborah N.",
    date: "Nov. 12, 2024",
    images: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "path/to/image10.jpg",
    ],
    reportReview: "This is a sample report review. It contains exactly fifty words to meet the requirement. The review provides a brief overview of the report, highlighting key points and observations. It is concise and to the point, ensuring that all necessary information is conveyed effectively."
  },
  {
    id: 8,
    name: "Deborah N.",
    date: "Nov. 12, 2024",
    images: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "path/to/image10.jpg",
    ],
    reportReview: "This is a sample report review. It contains exactly fifty words to meet the requirement. The review provides a brief overview of the report, highlighting key points and observations. It is concise and to the point, ensuring that all necessary information is conveyed effectively."
  },
  {
    id: 8,
    name: "Deborah N.",
    date: "Nov. 12, 2024",
    images: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzODkyNjZ8MXwxfHNlYXJjaHwxfHx0cmF2ZWx8ZW58MHx8fHwxNzM3Njk0Mzc2fDA&ixlib=rb-4.0.3&q=80&w=400",
      "path/to/image10.jpg",
    ],
    reportReview: "This is a sample report review. It contains exactly fifty words to meet the requirement. The review provides a brief overview of the report, highlighting key points and observations. It is concise and to the point, ensuring that all necessary information is conveyed effectively."
  },
];

export const fields = [
  {
    label: "State",
    name: "state",
    placeholder: "Select institution state",
    options: ["Lagos", "Abuja", "Kano", "Kaduna"],
  },
  {
    label: "Local govt.",
    name: "localGovt",
    placeholder: "Select institution local govt",
    options: ["Lagos", "Abuja", "Kano", "Kaduna"], // Replace with actual LGAs
  },
  {
    label: "Ward",
    name: "ward",
    placeholder: "Select institution ward",
    options: ["Lagos", "Abuja", "Kano", "Kaduna"], // Replace with actual wards
  },
];
