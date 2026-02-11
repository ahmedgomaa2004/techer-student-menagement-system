const students = [
  {
    id: 1,
    name: "Lian Al-Salmi",
    class: "A/1",
    level: "Grade 10",
    email: "lian@student.edu",
    phone: "+966555000101",
    attendance: 92,
    average: 88,
    status: "Active"
  },
  {
    id: 2,
    name: "Abdullah Al-Otaibi",
    class: "A/2",
    level: "Grade 11",
    email: "abdullah@student.edu",
    phone: "+966555000102",
    attendance: 85,
    average: 79,
    status: "Active"
  },
  {
    id: 3,
    name: "Sara Al-Harbi",
    class: "B/1",
    level: "Grade 9",
    email: "sara@student.edu",
    phone: "+966555000103",
    attendance: 97,
    average: 93,
    status: "Top Performer"
  },
  {
    id: 4,
    name: "Mohammed Al-Qahtani",
    class: "B/2",
    level: "Grade 12",
    email: "mohammed@student.edu",
    phone: "+966555000104",
    attendance: 75,
    average: 70,
    status: "Needs Follow-up"
  }
];

const teachers = [
  {
    id: 1,
    name: "Dr. Rana Al-Zahrani",
    subject: "Mathematics",
    email: "rana@school.edu",
    phone: "+966555111201",
    rating: 4.8
  },
  {
    id: 2,
    name: "Mr. Khaled Al-Shahri",
    subject: "Physics",
    email: "khaled@school.edu",
    phone: "+966555111202",
    rating: 4.5
  },
  {
    id: 3,
    name: "Ms. Mariam Al-Abdali",
    subject: "Arabic Language",
    email: "mariam@school.edu",
    phone: "+966555111203",
    rating: 4.9
  }
];

const classes = [
  {
    id: 1,
    name: "Advanced Mathematics",
    teacher: "Dr. Rana Al-Zahrani",
    schedule: "Sun - Wed | 9:00 - 10:30",
    room: "Lab 2",
    students: [1, 2, 3]
  },
  {
    id: 2,
    name: "Applied Physics",
    teacher: "Mr. Khaled Al-Shahri",
    schedule: "Mon - Thu | 11:00 - 12:30",
    room: "Room 5",
    students: [2, 4]
  },
  {
    id: 3,
    name: "Arabic Skills",
    teacher: "Ms. Mariam Al-Abdali",
    schedule: "Tue | 1:00 - 2:30",
    room: "Room 3",
    students: [1, 3, 4]
  }
];

const attendance = [
  { id: 1, studentId: 1, date: "2026-02-10", status: "Present" },
  { id: 2, studentId: 2, date: "2026-02-10", status: "Absent" },
  { id: 3, studentId: 3, date: "2026-02-10", status: "Present" },
  { id: 4, studentId: 4, date: "2026-02-10", status: "Present" }
];

const grades = [
  { id: 1, studentId: 1, subject: "Mathematics", score: 91, date: "2026-02-05" },
  { id: 2, studentId: 2, subject: "Physics", score: 78, date: "2026-02-04" },
  { id: 3, studentId: 3, subject: "Arabic Language", score: 96, date: "2026-02-03" },
  { id: 4, studentId: 4, subject: "Mathematics", score: 70, date: "2026-02-02" }
];

const assignments = [
  {
    id: 1,
    title: "Chapter 3 Revision",
    subject: "Mathematics",
    dueDate: "2026-02-15",
    status: "In Progress",
    submittedBy: 12
  },
  {
    id: 2,
    title: "Motion Experiment",
    subject: "Physics",
    dueDate: "2026-02-18",
    status: "Open",
    submittedBy: 7
  },
  {
    id: 3,
    title: "Literary Text Analysis",
    subject: "Arabic Language",
    dueDate: "2026-02-20",
    status: "Closed",
    submittedBy: 18
  }
];

const payments = [
  { id: 1, studentId: 1, amount: 420, dueDate: "2026-02-20", status: "Paid" },
  { id: 2, studentId: 2, amount: 420, dueDate: "2026-02-20", status: "Late" },
  { id: 3, studentId: 3, amount: 420, dueDate: "2026-02-20", status: "Paid" },
  { id: 4, studentId: 4, amount: 420, dueDate: "2026-02-20", status: "Late" }
];

const notifications = [
  {
    id: 1,
    title: "Math Exam Schedule",
    type: "Important",
    time: "2 hours ago",
    message: "The Math exam has been scheduled for next Sunday."
  },
  {
    id: 2,
    title: "New Assignment Posted",
    type: "Assignment",
    time: "5 hours ago",
    message: "Please submit the Physics assignment before Feb 18."
  },
  {
    id: 3,
    title: "Fee Payment Reminder",
    type: "Finance",
    time: "Yesterday",
    message: "You have overdue fees. Please pay to avoid restrictions."
  }
];

const activities = [
  { id: 1, text: "Math grade updated for Lian Al-Salmi", time: "30 minutes ago", type: "grade" },
  { id: 2, text: "Attendance recorded for Physics class", time: "2 hours ago", type: "attendance" },
  { id: 3, text: "New Arabic assignment added", time: "Today", type: "assignment" }
];

window.appData = {
  students,
  teachers,
  classes,
  attendance,
  grades,
  assignments,
  payments,
  notifications,
  activities
};
