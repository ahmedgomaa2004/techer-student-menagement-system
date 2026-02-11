const roleKey = "userRole";

const themeKey = "theme";

const getTheme = () => {
  const stored = localStorage.getItem(themeKey);
  if (stored) return stored;
  localStorage.setItem(themeKey, "dark");
  return "dark";
};

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
  updateThemeToggle();
};

const updateThemeToggle = () => {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  const isLight = document.documentElement.dataset.theme === "light";
  const icon = btn.querySelector("i");
  if (icon) {
    icon.className = isLight ? "bi bi-moon-stars" : "bi bi-sun";
  }
  const lang = document.documentElement.lang || "ar";
  const label = lang.startsWith("ar")
    ? (isLight ? "الوضع الداكن" : "الوضع الفاتح")
    : (isLight ? "Dark mode" : "Light mode");
  btn.setAttribute("aria-label", label);
  btn.setAttribute("title", label);
};

const initTheme = () => {
  const theme = getTheme();
  document.documentElement.dataset.theme = theme;
  updateThemeToggle();
  const btn = document.getElementById("themeToggleBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      setTheme(next);
    });
  }
};
const state = {
  role: "student",
  editingStudentId: null
};

const getRole = () => {
  const stored = localStorage.getItem(roleKey);
  if (stored) return stored;
  localStorage.setItem(roleKey, "student");
  return "student";
};

const setRole = (role) => {
  state.role = role;
  localStorage.setItem(roleKey, role);
  applyRoleVisibility();
  updateRoleToggle();
  renderAll();
};

const applyRoleVisibility = () => {
  const role = state.role;
  document.querySelectorAll("[data-role]").forEach((el) => {
    const allowed = el.dataset.role.split(",").map((r) => r.trim());
    if (allowed.includes(role)) {
      el.classList.remove("d-none");
    } else {
      el.classList.add("d-none");
    }
  });
};

const updateRoleToggle = () => {
  const btn = document.getElementById("roleToggleBtn");
  const badge = document.getElementById("roleBadge");
  if (btn) {
    btn.textContent = state.role === "teacher" ? "Teacher" : "Student";
  }
  if (badge) {
    badge.textContent = state.role === "teacher" ? "Teacher Mode" : "Student Mode";
  }
};

const initRoleToggle = () => {
  state.role = getRole();
  updateRoleToggle();
  applyRoleVisibility();
  const toggle = document.getElementById("roleToggleBtn");
  if (toggle) {
    toggle.addEventListener("click", () => {
      setRole(state.role === "teacher" ? "student" : "teacher");
    });
  }
};

const initRolePlacement = () => {
  const badge = document.getElementById("roleBadge");
  const toggle = document.getElementById("roleToggleBtn");
  const offcanvasBody = document.querySelector("#mobileSidebar .offcanvas-body");
  if (!badge || !toggle || !offcanvasBody) return;

  const badgeHome = { parent: badge.parentNode, next: badge.nextSibling };
  const toggleHome = { parent: toggle.parentNode, next: toggle.nextSibling };

  let mobileContainer = offcanvasBody.querySelector(".role-mobile");
  if (!mobileContainer) {
    mobileContainer = document.createElement("div");
    mobileContainer.className = "role-mobile d-flex align-items-center justify-content-between gap-2 mb-3";
    offcanvasBody.insertBefore(mobileContainer, offcanvasBody.firstChild);
  }

  const restore = (el, home) => {
    if (!home.parent) return;
    if (home.next && home.next.parentNode === home.parent) {
      home.parent.insertBefore(el, home.next);
    } else {
      home.parent.appendChild(el);
    }
  };

  const applyPlacement = () => {
    const isMobile = window.matchMedia("(max-width: 575.98px)").matches;
    if (isMobile) {
      if (!mobileContainer.contains(badge)) mobileContainer.appendChild(badge);
      if (!mobileContainer.contains(toggle)) mobileContainer.appendChild(toggle);
    } else {
      if (mobileContainer.contains(badge)) restore(badge, badgeHome);
      if (mobileContainer.contains(toggle)) restore(toggle, toggleHome);
    }
  };

  applyPlacement();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyPlacement, 120);
  });
};

const highlightActiveNav = () => {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });
};

const getStudentById = (id) => window.appData.students.find((s) => s.id === id);

const renderDashboard = () => {
  const gradesEl = document.getElementById("statGrades");
  if (!gradesEl) return;
  const { students, assignments, payments, activities } = window.appData;

  const avgGrade = Math.round(
    students.reduce((sum, s) => sum + s.average, 0) / students.length
  );
  const attendanceRate = Math.round(
    students.reduce((sum, s) => sum + s.attendance, 0) / students.length
  );
  const openAssignments = assignments.filter((a) => a.status !== "Closed").length;
  const paidCount = payments.filter((p) => p.status === "Paid").length;
  const payRate = Math.round((paidCount / payments.length) * 100);

  document.getElementById("statGrades").textContent = `${avgGrade}%`;
  document.getElementById("statAttendance").textContent = `${attendanceRate}%`;
  document.getElementById("statAssignments").textContent = `${openAssignments}`;
  document.getElementById("statPayments").textContent = `${payRate}%`;

  const attendanceBar = document.getElementById("progressAttendance");
  const gradesBar = document.getElementById("progressGrades");
  const paymentsBar = document.getElementById("progressPayments");
  if (attendanceBar) attendanceBar.style.width = `${attendanceRate}%`;
  if (gradesBar) gradesBar.style.width = `${avgGrade}%`;
  if (paymentsBar) paymentsBar.style.width = `${payRate}%`;
  const attendanceValue = document.getElementById("progressAttendanceValue");
  const gradesValue = document.getElementById("progressGradesValue");
  const paymentsValue = document.getElementById("progressPaymentsValue");
  if (attendanceValue) attendanceValue.textContent = `${attendanceRate}%`;
  if (gradesValue) gradesValue.textContent = `${avgGrade}%`;
  if (paymentsValue) paymentsValue.textContent = `${payRate}%`;

  const activityList = document.getElementById("recentActivity");
  if (activityList) {
    activityList.innerHTML = activities
      .map(
        (item) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>${item.text}</div>
          <span class="text-muted small">${item.time}</span>
        </li>
      `
      )
      .join("");
  }
};

const renderTeachers = () => {
  const grid = document.getElementById("teachersGrid");
  if (!grid) return;
  const { teachers } = window.appData;
  grid.innerHTML = teachers
    .map(
      (t) => `
      <div class="col-md-4">
        <div class="glass-card h-100">
          <div class="d-flex align-items-center gap-3">
            <img src="assets/img/avatar-2.svg" alt="${t.name}" class="avatar" />
            <div>
              <h5 class="mb-1">${t.name}</h5>
              <div class="text-muted">${t.subject}</div>
            </div>
          </div>
          <div class="mt-3 d-flex justify-content-between align-items-center">
            <span class="badge badge-neon">Rating ${t.rating}</span>
            <button class="btn btn-outline-primary btn-sm" data-teacher-id="${t.id}" data-bs-toggle="modal" data-bs-target="#teacherModal">Details</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  grid.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-teacher-id]");
    if (!btn) return;
    const teacher = teachers.find((t) => t.id === Number(btn.dataset.teacherId));
    if (!teacher) return;
    document.getElementById("teacherModalLabel").textContent = teacher.name;
    document.getElementById("teacherModalBody").innerHTML = `
      <div class="d-flex flex-column gap-2">
        <div><strong>Subject:</strong> ${teacher.subject}</div>
        <div><strong>Email:</strong> ${teacher.email}</div>
        <div><strong>Phone:</strong> ${teacher.phone}</div>
        <div><strong>Rating:</strong> ${teacher.rating}</div>
      </div>
    `;
  });
};

const renderStudentsTable = () => {
  const tbody = document.getElementById("studentsTableBody");
  if (!tbody) return;

  const searchValue = (document.getElementById("studentSearch")?.value || "").toLowerCase();
  const classFilter = document.getElementById("classFilter")?.value || "all";

  let filtered = window.appData.students.filter((student) =>
    student.name.toLowerCase().includes(searchValue)
  );

  if (classFilter !== "all") {
    filtered = filtered.filter((student) => student.class === classFilter);
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="empty-state">No matching records found.</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered
    .map(
      (student) => `
      <tr>
        <td>${student.name}</td>
        <td>${student.class}</td>
        <td>${student.level}</td>
        <td>${student.attendance}%</td>
        <td>${student.average}%</td>
        <td data-role="teacher">
          <button class="btn btn-outline-primary btn-sm" data-edit-student="${student.id}" data-bs-toggle="modal" data-bs-target="#studentModal" data-role="teacher">Edit</button>
        </td>
      </tr>
    `
    )
    .join("");
};

const populateClassOptions = () => {
  const classFilter = document.getElementById("classFilter");
  const studentClass = document.getElementById("studentClass");
  const classes = [...new Set(window.appData.students.map((s) => s.class))];

  if (classFilter) {
    classFilter.innerHTML = `<option value="all">All classes</option>`;
    classes.forEach((cls) => {
      const option = document.createElement("option");
      option.value = cls;
      option.textContent = cls;
      classFilter.appendChild(option);
    });
  }

  if (studentClass) {
    studentClass.innerHTML = "";
    classes.forEach((cls) => {
      const option = document.createElement("option");
      option.value = cls;
      option.textContent = cls;
      studentClass.appendChild(option);
    });
  }
};

const initStudentsInteractions = () => {
  const search = document.getElementById("studentSearch");
  const filter = document.getElementById("classFilter");
  if (search) search.addEventListener("input", renderStudentsTable);
  if (filter) filter.addEventListener("change", renderStudentsTable);

  const table = document.getElementById("studentsTableBody");
  if (table) {
    table.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-edit-student]");
      if (!btn) return;
      const student = window.appData.students.find(
        (s) => s.id === Number(btn.dataset.editStudent)
      );
      if (!student) return;
      state.editingStudentId = student.id;
      document.getElementById("studentId").value = student.id;
      document.getElementById("studentName").value = student.name;
      document.getElementById("studentEmail").value = student.email;
      document.getElementById("studentPhone").value = student.phone;
      document.getElementById("studentClass").value = student.class;
      document.getElementById("studentLevel").value = student.level;
      document.getElementById("studentStatus").value = student.status;
    });
  }

  const addBtn = document.getElementById("addStudentBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      state.editingStudentId = null;
      document.getElementById("studentId").value = "";
      document.getElementById("studentName").value = "";
      document.getElementById("studentEmail").value = "";
      document.getElementById("studentPhone").value = "";
      document.getElementById("studentClass").value = "A/1";
      document.getElementById("studentLevel").value = "Grade 10";
      document.getElementById("studentStatus").value = "Active";
    });
  }

  const saveBtn = document.getElementById("saveStudentBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const name = document.getElementById("studentName").value.trim();
      if (!name) return;
      const payload = {
        id: state.editingStudentId || Date.now(),
        name,
        email: document.getElementById("studentEmail").value.trim(),
        phone: document.getElementById("studentPhone").value.trim(),
        class: document.getElementById("studentClass").value,
        level: document.getElementById("studentLevel").value,
        status: document.getElementById("studentStatus").value,
        attendance: 0,
        average: 0
      };

      if (state.editingStudentId) {
        const index = window.appData.students.findIndex(
          (s) => s.id === state.editingStudentId
        );
        window.appData.students[index] = { ...window.appData.students[index], ...payload };
      } else {
        window.appData.students.push(payload);
      }

      const modal = bootstrap.Modal.getInstance(document.getElementById("studentModal"));
      if (modal) modal.hide();
      showToast("Student saved successfully.", "success");
      renderStudentsTable();
    });
  }
};

const renderClasses = () => {
  const grid = document.getElementById("classesGrid");
  if (!grid) return;
  grid.innerHTML = window.appData.classes
    .map((cls) => {
      const count = cls.students.length;
      return `
        <div class="col-md-4">
          <div class="glass-card h-100">
            <h5>${cls.name}</h5>
            <div class="text-muted">${cls.teacher}</div>
            <div class="mt-2 small">${cls.schedule}</div>
            <div class="mt-3 d-flex justify-content-between">
              <span class="badge badge-purple">${count} Students</span>
              <a class="btn btn-outline-primary btn-sm" href="class-details.html?classId=${cls.id}">View Details</a>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
};

const renderClassDetails = () => {
  const title = document.getElementById("classTitle");
  if (!title) return;
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("classId")) || 1;
  const cls = window.appData.classes.find((c) => c.id === id) || window.appData.classes[0];
  document.getElementById("classTitle").textContent = cls.name;
  document.getElementById("classTeacher").textContent = cls.teacher;
  document.getElementById("classSchedule").textContent = cls.schedule;
  document.getElementById("classRoom").textContent = cls.room;

  const list = document.getElementById("classStudentList");
  const students = cls.students.map((sid) => getStudentById(sid));
  list.innerHTML = students
    .map(
      (s) => `
      <li class="list-group-item d-flex justify-content-between">
        <span>${s.name}</span>
        <span class="text-muted">${s.class}</span>
      </li>
    `
    )
    .join("");
};

const renderAttendanceTable = () => {
  const tbody = document.getElementById("attendanceTableBody");
  if (!tbody) return;
  tbody.innerHTML = window.appData.attendance
    .map((record) => {
      const student = getStudentById(record.studentId);
      const badgeClass = record.status === "Present" ? "badge-neon" : "badge-magenta";
      return `
      <tr>
        <td>${student.name}</td>
        <td>${record.date}</td>
        <td><span class="badge ${badgeClass}">${record.status}</span></td>
        <td><button class="btn btn-outline-primary btn-sm" data-attendance-id="${record.id}">Toggle</button></td>
      </tr>
    `;
    })
    .join("");
};

const initAttendanceInteractions = () => {
  const table = document.getElementById("attendanceTableBody");
  if (!table) return;
  table.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-attendance-id]");
    if (!btn) return;
    const record = window.appData.attendance.find(
      (a) => a.id === Number(btn.dataset.attendanceId)
    );
    record.status = record.status === "Present" ? "Absent" : "Present";
    renderAttendanceTable();
  });
};

const renderGradesTable = () => {
  const tbody = document.getElementById("gradesTableBody");
  if (!tbody) return;
  const isStudent = state.role === "student";
  const data = isStudent
    ? window.appData.grades.filter((g) => g.studentId === 1)
    : window.appData.grades;

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="empty-state">No grades available yet.</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = data
    .map((grade) => {
      const student = getStudentById(grade.studentId);
      return `
        <tr>
          <td>${student.name}</td>
          <td>${grade.subject}</td>
          <td>${grade.score}</td>
          <td>${grade.date}</td>
          <td><span class="badge badge-neon">${grade.score >= 85 ? "Excellent" : "Good"}</span></td>
        </tr>
      `;
    })
    .join("");
};

const populateGradeStudents = () => {
  const select = document.getElementById("gradeStudent");
  if (!select) return;
  select.innerHTML = "";
  window.appData.students.forEach((student) => {
    const option = document.createElement("option");
    option.value = student.id;
    option.textContent = student.name;
    select.appendChild(option);
  });
};

const initGradeModal = () => {
  const saveBtn = document.getElementById("saveGradeBtn");
  if (!saveBtn) return;
  saveBtn.addEventListener("click", () => {
    const studentId = Number(document.getElementById("gradeStudent").value);
    const subject = document.getElementById("gradeSubject").value.trim();
    const score = Number(document.getElementById("gradeScore").value);
    const date = document.getElementById("gradeDate").value || "2026-02-11";
    if (!studentId || !subject || !score) return;
    window.appData.grades.push({
      id: Date.now(),
      studentId,
      subject,
      score,
      date
    });
    const modal = bootstrap.Modal.getInstance(document.getElementById("gradeModal"));
    if (modal) modal.hide();
    showToast("Grade added successfully.", "success");
    renderGradesTable();
  });
};

const renderAssignments = () => {
  const list = document.getElementById("assignmentsList");
  if (!list) return;
  list.innerHTML = window.appData.assignments
    .map(
      (a) => `
      <div class="col-md-4">
        <div class="glass-card h-100">
          <h5>${a.title}</h5>
          <div class="text-muted">${a.subject}</div>
          <div class="mt-2 small">Due date: ${a.dueDate}</div>
          <div class="mt-3 d-flex justify-content-between align-items-center">
            <span class="badge ${a.status === "Closed" ? "badge-magenta" : "badge-neon"}">${a.status}</span>
            <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#assignmentModal">Upload/Submit</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
};

const initAssignmentUpload = () => {
  const fileInput = document.getElementById("assignmentFile");
  const fileName = document.getElementById("assignmentFileName");
  if (!fileInput || !fileName) return;
  fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files[0]?.name || "No file selected";
  });
};

const renderPaymentsTable = () => {
  const tbody = document.getElementById("paymentsTableBody");
  if (!tbody) return;
  const data = state.role === "student"
    ? window.appData.payments.filter((p) => p.studentId === 1)
    : window.appData.payments;

  tbody.innerHTML = data
    .map((payment) => {
      const student = getStudentById(payment.studentId);
      const badgeClass = payment.status === "Paid" ? "badge-neon" : "badge-magenta";
      return `
      <tr>
        <td>${student.name}</td>
        <td>${payment.amount} SAR</td>
        <td>${payment.dueDate}</td>
        <td><span class="badge ${badgeClass}">${payment.status}</span></td>
        <td>
          <button class="btn btn-primary btn-sm" data-pay-id="${payment.id}" data-role="student">Pay Now</button>
        </td>
      </tr>
    `;
    })
    .join("");

  applyRoleVisibility();
};

const initPaymentsInteractions = () => {
  const tbody = document.getElementById("paymentsTableBody");
  if (!tbody) return;
  tbody.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-pay-id]");
    if (!btn) return;
    const payment = window.appData.payments.find(
      (p) => p.id === Number(btn.dataset.payId)
    );
    if (!payment) return;
    payment.status = "Paid";
    showToast("Payment completed successfully.", "success");
    renderPaymentsTable();
  });
};

const renderNotifications = () => {
  const list = document.getElementById("notificationsList");
  if (!list) return;
  list.innerHTML = window.appData.notifications
    .map((n) => {
      const badge =
        n.type === "Important"
          ? "badge-magenta"
          : n.type === "Finance"
          ? "badge-purple"
          : "badge-neon";
      return `
      <div class="glass-card mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-1">${n.title}</h6>
          <span class="badge ${badge}">${n.type}</span>
        </div>
        <div class="small text-muted">${n.time}</div>
        <p class="mt-2 mb-0">${n.message}</p>
      </div>
    `;
    })
    .join("");
};

const renderProfile = () => {
  const nameField = document.getElementById("profileName");
  if (!nameField) return;
  const isTeacher = state.role === "teacher";
  const profile = isTeacher ? window.appData.teachers[0] : window.appData.students[0];
  document.getElementById("profileName").value = profile.name;
  document.getElementById("profileEmail").value = profile.email;
  document.getElementById("profilePhone").value = profile.phone;
  document.getElementById("profileRole").value = isTeacher ? "Teacher" : "Student";
};

const initProfileImagePreview = () => {
  const input = document.getElementById("profileImageInput");
  const preview = document.getElementById("profilePreview");
  if (!input || !preview) return;
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    preview.src = URL.createObjectURL(file);
  });
};

const showToast = (message, type = "info") => {
  const toastEl = document.getElementById("appToast");
  const toastBody = document.getElementById("appToastBody");
  if (!toastEl || !toastBody) return;
  toastBody.textContent = message;
  toastEl.classList.remove("text-bg-success", "text-bg-danger", "text-bg-info");
  if (type === "success") toastEl.classList.add("text-bg-success");
  if (type === "error") toastEl.classList.add("text-bg-danger");
  if (type === "info") toastEl.classList.add("text-bg-info");
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
  toast.show();
};

const renderAll = () => {
  populateClassOptions();
  populateGradeStudents();
  renderDashboard();
  renderTeachers();
  renderStudentsTable();
  renderClasses();
  renderClassDetails();
  renderAttendanceTable();
  renderGradesTable();
  renderAssignments();
  renderPaymentsTable();
  renderNotifications();
  renderProfile();
  applyRoleVisibility();
};

document.addEventListener("DOMContentLoaded", () => {
  if (!window.appData) return;
  initTheme();
  initRoleToggle();
  initRolePlacement();
  highlightActiveNav();
  renderAll();
  initStudentsInteractions();
  initAttendanceInteractions();
  initGradeModal();
  initAssignmentUpload();
  initPaymentsInteractions();
  initProfileImagePreview();
});



