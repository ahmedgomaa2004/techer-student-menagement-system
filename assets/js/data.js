const students = [
  {
    id: 1,
    name: "ليان السالمي",
    class: "أ/1",
    level: "العاشر",
    email: "lian@student.edu",
    phone: "+966555000101",
    attendance: 92,
    average: 88,
    status: "نشط"
  },
  {
    id: 2,
    name: "عبدالله العتيبي",
    class: "أ/2",
    level: "الحادي عشر",
    email: "abdullah@student.edu",
    phone: "+966555000102",
    attendance: 85,
    average: 79,
    status: "نشط"
  },
  {
    id: 3,
    name: "سارة الحربي",
    class: "ب/1",
    level: "التاسع",
    email: "sara@student.edu",
    phone: "+966555000103",
    attendance: 97,
    average: 93,
    status: "متفوق"
  },
  {
    id: 4,
    name: "محمد القحطاني",
    class: "ب/2",
    level: "الثاني عشر",
    email: "mohammed@student.edu",
    phone: "+966555000104",
    attendance: 75,
    average: 70,
    status: "متابعة"
  }
];

const teachers = [
  {
    id: 1,
    name: "د. رنا الزهراني",
    subject: "الرياضيات",
    email: "rana@school.edu",
    phone: "+966555111201",
    rating: 4.8
  },
  {
    id: 2,
    name: "أ. خالد الشهري",
    subject: "الفيزياء",
    email: "khaled@school.edu",
    phone: "+966555111202",
    rating: 4.5
  },
  {
    id: 3,
    name: "أ. مريم العبدلي",
    subject: "اللغة العربية",
    email: "mariam@school.edu",
    phone: "+966555111203",
    rating: 4.9
  }
];

const classes = [
  {
    id: 1,
    name: "الرياضيات المتقدمة",
    teacher: "د. رنا الزهراني",
    schedule: "الأحد - الأربعاء | 9:00 - 10:30",
    room: "مختبر 2",
    students: [1, 2, 3]
  },
  {
    id: 2,
    name: "الفيزياء التطبيقية",
    teacher: "أ. خالد الشهري",
    schedule: "الاثنين - الخميس | 11:00 - 12:30",
    room: "قاعة 5",
    students: [2, 4]
  },
  {
    id: 3,
    name: "مهارات اللغة العربية",
    teacher: "أ. مريم العبدلي",
    schedule: "الثلاثاء | 1:00 - 2:30",
    room: "قاعة 3",
    students: [1, 3, 4]
  }
];

const attendance = [
  { id: 1, studentId: 1, date: "2026-02-10", status: "حاضر" },
  { id: 2, studentId: 2, date: "2026-02-10", status: "غائب" },
  { id: 3, studentId: 3, date: "2026-02-10", status: "حاضر" },
  { id: 4, studentId: 4, date: "2026-02-10", status: "حاضر" }
];

const grades = [
  { id: 1, studentId: 1, subject: "الرياضيات", score: 91, date: "2026-02-05" },
  { id: 2, studentId: 2, subject: "الفيزياء", score: 78, date: "2026-02-04" },
  { id: 3, studentId: 3, subject: "اللغة العربية", score: 96, date: "2026-02-03" },
  { id: 4, studentId: 4, subject: "الرياضيات", score: 70, date: "2026-02-02" }
];

const assignments = [
  {
    id: 1,
    title: "مراجعة الفصل الثالث",
    subject: "الرياضيات",
    dueDate: "2026-02-15",
    status: "قيد التنفيذ",
    submittedBy: 12
  },
  {
    id: 2,
    title: "تجربة الحركة",
    subject: "الفيزياء",
    dueDate: "2026-02-18",
    status: "مفتوح",
    submittedBy: 7
  },
  {
    id: 3,
    title: "تحليل نص أدبي",
    subject: "اللغة العربية",
    dueDate: "2026-02-20",
    status: "مغلق",
    submittedBy: 18
  }
];

const payments = [
  { id: 1, studentId: 1, amount: 420, dueDate: "2026-02-20", status: "مدفوع" },
  { id: 2, studentId: 2, amount: 420, dueDate: "2026-02-20", status: "متأخر" },
  { id: 3, studentId: 3, amount: 420, dueDate: "2026-02-20", status: "مدفوع" },
  { id: 4, studentId: 4, amount: 420, dueDate: "2026-02-20", status: "متأخر" }
];

const notifications = [
  {
    id: 1,
    title: "موعد اختبار الرياضيات",
    type: "مهم",
    time: "منذ 2 ساعة",
    message: "تم جدولة اختبار الرياضيات يوم الأحد القادم."
  },
  {
    id: 2,
    title: "تم رفع واجب جديد",
    type: "واجب",
    time: "منذ 5 ساعات",
    message: "يرجى تسليم واجب الفيزياء قبل 18 فبراير."
  },
  {
    id: 3,
    title: "سداد الرسوم",
    type: "مالي",
    time: "أمس",
    message: "لديك رسوم متأخرة يرجى السداد لتجنب الإيقاف."
  }
];

const activities = [
  { id: 1, text: "تم تحديث نتيجة الرياضيات للطالب ليان السالمي", time: "منذ 30 دقيقة", type: "grade" },
  { id: 2, text: "تم تسجيل حضور الطلاب لحصة الفيزياء", time: "منذ ساعتين", type: "attendance" },
  { id: 3, text: "تم إضافة واجب جديد للغة العربية", time: "اليوم", type: "assignment" }
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
