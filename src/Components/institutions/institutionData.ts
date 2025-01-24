export const stats = [
    {
      title: "Total listed Institution",
      value: 1234,
      icon: 'total',
    },
    {
      title: "Wards",
      value: 1234,
      icon: 'ward',
    },
    {
      title: "LGAs",
      value: 1234,
      icon: 'lgs',
    },
    {
      title: "States",
      value: 1234,
      icon: 'states',
    },
  ];

export const recentInstitutions = [
    {
        name: 'Quotient Specialist Hospital (QSH)',
        address: 'No 5, Lekki view, Lagos state, Nigeria',
        hours: 'Monday - Sunday (24 hours)',
        phone: '08105201636',
        email: 'Quotientspecialist@gmail.com',
        icon: 'quotient'
    },
    {
        name: 'Green Valley Hospital',
        address: '45 Green Valley Road, Ikeja, Lagos state, Nigeria',
        hours: 'Monday - Saturday (7 AM - 9 PM)',
        phone: '08098765432',
        email: 'contact@greenvalleyhospital.com',
        icon: 'quotient'
    },
    {
        name: 'Blue Cross Clinic',
        address: '78 Blue Cross Street, Surulere, Lagos state, Nigeria',
        hours: 'Monday - Friday (8 AM - 5 PM)',
        phone: '07012345678',
        email: 'info@bluecrossclinic.com',
        icon: 'quotient'
    },
    {
        name: 'Hope Medical Center',
        address: '12 Hope Avenue, Yaba, Lagos state, Nigeria',
        hours: 'Monday - Sunday (24 hours)',
        phone: '08123456789',
        email: 'support@hopemedical.com',
        icon: 'quotient'
    },
    {
        name: 'Sunrise Health Clinic',
        address: '89 Sunrise Lane, Ikoyi, Lagos state, Nigeria',
        hours: 'Monday - Saturday (8 AM - 8 PM)',
        phone: '09087654321',
        email: 'info@sunrisehealth.com',
        icon: 'quotient'
    },
    {
        name: 'Wellness Hospital',
        address: '34 Wellness Drive, Victoria Island, Lagos state, Nigeria',
        hours: 'Monday - Sunday (24 hours)',
        phone: '08011223344',
        email: 'contact@wellnesshospital.com',
        icon: 'quotient'
    },
    {
        name: 'Sunshine Medical Center',
        address: '123 Sunshine Blvd, Victoria Island, Lagos state, Nigeria',
        hours: 'Monday - Friday (8 AM - 6 PM)',
        phone: '08012345678',
        email: 'info@sunshinemedical.com',
        icon: 'quotient'
    },
]; 

export const hoursArray = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12; // Convert 0 to 12 for 12 AM/PM
  const period = i < 12 ? 'am' : 'pm'; // Determine AM/PM
  return `${hour}:00 ${period}`; // Format the hour
}).concat(
  Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12; // Convert 0 to 12 for 12 AM/PM
    const period = i < 12 ? 'am' : 'pm'; // Determine AM/PM
    return `${hour}:30 ${period}`; // Format the half hour
  })
).sort((a, b) => {
  const timeA = a.split(' ')[0].split(':').map(Number);
  const timeB = b.split(' ')[0].split(':').map(Number);
  const totalMinutesA = timeA[0] * 60 + (timeA[1] === 30 ? 30 : 0) + (a.includes('pm') ? 720 : 0);
  const totalMinutesB = timeB[0] * 60 + (timeB[1] === 30 ? 30 : 0) + (b.includes('pm') ? 720 : 0);
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
  if (score < 50) return '#7F56D9'; 
  if (score < 70) return '#BF56D9'; 
  if (score < 90) return '#D9569A'; 
  return '#63D956';
};

export const individualResponses = [
  { name: "Deborah N.", comment: "Very unclean", review: "The place was not maintained well.", images: ["image1.jpg", "image1b.jpg"] },
  { name: "Kamsi E.", comment: "Very unclean", review: "I expected better hygiene.", images: ["image2.jpg", "image2b.jpg"] },
  { name: "Taiwo A.", comment: "Very clean", review: "Impressed with the cleanliness.", images: ["image3.jpg", "image3b.jpg"] },
  { name: "George O.", comment: "Very unclean", review: "Needs improvement in cleaning.", images: ["image4.jpg", "image4b.jpg"] },
  { name: "Asher A.", comment: "Very unclean", review: "Disappointed with the state.", images: ["image5.jpg", "image5b.jpg"] },
  { name: "Chidi M.", comment: "Very unclean", review: "Not up to standard.", images: ["image6.jpg", "image6b.jpg"] },
  { name: "Chidi M.", comment: "Very unclean", review: "Not up to standard.", images: ["image7.jpg", "image7b.jpg"] },
  { name: "Chidi M.", comment: "Very unclean", review: "Not up to standard.", images: ["image8.jpg", "image8b.jpg"] },
  { name: "Chidi M.", comment: "Very unclean", review: "Not up to standard.", images: ["image9.jpg", "image9b.jpg"] },
  { name: "Chidi M.", comment: "Very unclean", review: "Not up to standard.", images: ["image10.jpg", "image10b.jpg"] },
  { name: "John D.", comment: "Very clean", review: "Spotless and well-kept.", images: ["image11.jpg", "image11b.jpg"] },
  { name: "Jane S.", comment: "Somewhat clean", review: "Could be better, but acceptable.", images: ["image12.jpg", "image12b.jpg"] },
  { name: "Michael B.", comment: "Neutral", review: "Neither clean nor dirty.", images: ["image13.jpg", "image13b.jpg"] },
  { name: "Sarah W.", comment: "Somewhat unclean", review: "Needs more attention to detail.", images: ["image14.jpg", "image14b.jpg"] },
  { name: "David K.", comment: "Very unclean", review: "Unpleasant experience.", images: ["image15.jpg", "image15b.jpg"] },
  { name: "Emily R.", comment: "Very clean", review: "Very satisfied with the cleanliness.", images: ["image16.jpg", "image16b.jpg"] },
  { name: "Daniel T.", comment: "Somewhat clean", review: "Mostly clean, some areas missed.", images: ["image17.jpg", "image17b.jpg"] },
  { name: "Sophia L.", comment: "Neutral", review: "Average cleanliness.", images: ["image18.jpg", "image18b.jpg"] },
  { name: "James P.", comment: "Somewhat unclean", review: "Could use more frequent cleaning.", images: ["image19.jpg", "image19b.jpg"] },
  { name: "Olivia M.", comment: "Very unclean", review: "Not impressed with the upkeep.", images: ["image20.jpg", "image20b.jpg"] },
  { name: "Liam N.", comment: "Very clean", review: "Excellent maintenance.", images: ["image21.jpg", "image21b.jpg"] },
  { name: "Emma O.", comment: "Somewhat clean", review: "Generally clean, minor issues.", images: ["image22.jpg", "image22b.jpg"] },
  { name: "Noah Q.", comment: "Neutral", review: "Nothing stood out.", images: ["image23.jpg", "image23b.jpg"] },
  { name: "Ava R.", comment: "Somewhat unclean", review: "Needs improvement.", images: ["image24.jpg", "image24b.jpg"] },
  { name: "Isabella S.", comment: "Very unclean", review: "Very poor cleanliness.", images: ["image25.jpg", "image25b.jpg"] },
  { name: "Mason T.", comment: "Very clean", review: "Immaculate condition.", images: ["image26.jpg", "image26b.jpg"] },
  { name: "Mia U.", comment: "Somewhat clean", review: "Mostly clean, but not perfect.", images: ["image27.jpg", "image27b.jpg"] },
  { name: "Ethan V.", comment: "Neutral", review: "Neither here nor there.", images: ["image28.jpg", "image28b.jpg"] },
  { name: "Harper W.", comment: "Somewhat unclean", review: "Could be cleaner.", images: ["image29.jpg", "image29b.jpg"] },
  { name: "Alexander X.", comment: "Very unclean", review: "Very disappointing.", images: ["image30.jpg", "image30b.jpg"] },
  { name: "Charlotte Y.", comment: "Very clean", review: "Very well maintained.", images: ["image31.jpg", "image31b.jpg"] },
  { name: "Benjamin Z.", comment: "Somewhat clean", review: "Acceptable cleanliness.", images: ["image32.jpg", "image32b.jpg"] },
  { name: "Amelia A.", comment: "Neutral", review: "No strong feelings.", images: ["image33.jpg", "image33b.jpg"] },
  { name: "Lucas B.", comment: "Somewhat unclean", review: "Needs more attention.", images: ["image34.jpg", "image34b.jpg"] },
  { name: "Evelyn C.", comment: "Very unclean", review: "Not up to par.", images: ["image35.jpg", "image35b.jpg"] },
  { name: "Henry D.", comment: "Very clean", review: "Very clean and tidy.", images: ["image36.jpg", "image36b.jpg"] },
  { name: "Abigail E.", comment: "Somewhat clean", review: "Mostly clean, some areas lacking.", images: ["image37.jpg", "image37b.jpg"] },
  { name: "Sebastian F.", comment: "Neutral", review: "Average experience.", images: ["image38.jpg", "image38b.jpg"] },
  { name: "Ella G.", comment: "Somewhat unclean", review: "Could use improvement.", images: ["image39.jpg", "image39b.jpg"] },
  { name: "Jack H.", comment: "Very unclean", review: "Not satisfactory.", images: ["image40.jpg", "image40b.jpg"] },
  { name: "Scarlett I.", comment: "Very clean", review: "Very pleased with the cleanliness.", images: ["image41.jpg", "image41b.jpg"] },
  { name: "Aiden J.", comment: "Somewhat clean", review: "Generally clean, but not spotless.", images: ["image42.jpg", "image42b.jpg"] },
  { name: "Grace K.", comment: "Neutral", review: "Neither good nor bad.", images: ["image43.jpg", "image43b.jpg"] },
  { name: "Samuel L.", comment: "Somewhat unclean", review: "Needs more frequent cleaning.", images: ["image44.jpg", "image44b.jpg"] },
  { name: "Chloe M.", comment: "Very unclean", review: "Very poor condition.", images: ["image45.jpg", "image45b.jpg"] },
  { name: "Matthew N.", comment: "Very clean", review: "Very clean and well-kept.", images: ["image46.jpg", "image46b.jpg"] },
  { name: "Victoria O.", comment: "Somewhat clean", review: "Mostly clean, minor issues.", images: ["image47.jpg", "image47b.jpg"] },
  { name: "Joseph P.", comment: "Neutral", review: "No particular issues.", images: ["image48.jpg", "image48b.jpg"] },
  { name: "Hannah Q.", comment: "Somewhat unclean", review: "Could be better.", images: ["image49.jpg", "image49b.jpg"] },
  { name: "Levi R.", comment: "Very unclean", review: "Very unsatisfactory.", images: ["image50.jpg", "image50b.jpg"] },
];