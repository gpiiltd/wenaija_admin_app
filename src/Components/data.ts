import { UserTab } from "./types";

export const institutCardData = [
  {
    title: "Bayero Maternity...",
    location: "KADUNA",
    percentage: "92%",
  },
  {
    title: "Bayero Maternity...",
    location: "KADUNA",
    percentage: "92%",
  },
  {
    title: "Bayero Maternity...",
    location: "KADUNA",
    percentage: "92%",
  },
];

export const distributionByLocationData = [
  { state: "Lagos", percentage: 80 },
  { state: "Kaduna", percentage: 70 },
  { state: "Abuja", percentage: 90 },
  { state: "Rivers", percentage: 50 },
  { state: "Kano", percentage: 60 },
];

export const addedIntitute = [
  { title: "Bayero Maternity", state: "Kaduna", lga: "Birini Gwari" },
  { title: "Zaria General", state: "Kaduna", lga: "Zaria" },
  { title: "Abuja Central", state: "FCT", lga: "Garki" },
  { title: "Garki Specialist", state: "FCT", lga: "Garki" },
  { title: "Wuse Clinic", state: "FCT", lga: "Wuse" },
  { title: "Lagos Island", state: "Lagos", lga: "Eti-Osa" },
];

export const usersData: Record<UserTab, any[]> = {
  Pending: [
    {
      id: 1,
      name: "John Doe",
      identityCard: "ID123456",
      DOB: "22 Jan 1994",
      subDate: "22 Sep 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      identityCard: "ID789012",
      DOB: "22 Jan 1994",
      subDate: "22 Sep 2024",
    },
    {
      id: 3,
      name: "Jane Smith",
      identityCard: "ID789012",
      DOB: "22 Jan 1994",
      subDate: "22 Sep 2024",
    },
    {
      id: 4,
      name: "Jane Smith",
      identityCard: "ID789012",
      DOB: "22 Jan 1994",
      subDate: "22 Sep 2024",
    },
    {
      id: 5,
      name: "Jane Smith",
      identityCard: "ID789012",
      DOB: "22 Jan 1994",
      subDate: "22 Sep 2024",
    },
  ],
  Enabled: [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@email.com",
      noOfTasksCompleted: 30,
      starPoints: 1220,
      registrationDate: "24 Sep 2024",
    },
    {
      id: 2,
      name: "Bob Brown",
      email: "bob@email.com",
      noOfTasksCompleted: 30,
      starPoints: 1500,
      registrationDate: "24 Sep 2024",
    },
  ],
  Disabled: [
    {
      id: 1,
      name: "Charlie Davis",
      email: "charlie@email.com",
      noOfTasksCompleted: 30,
      dateDisabled: "2024-01-15",
      reason: "Violation",
    },
    {
      id: 2,
      name: "Emma Wilson",
      email: "emma@email.com",
      noOfTasksCompleted: 30,
      dateDisabled: "2024-02-10",
      reason: "User Request",
    },
  ],
};
