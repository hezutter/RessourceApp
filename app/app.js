const consultants = [
  {
    id: 1,
    name: "Consultant 1",
    weeklyCapacity: 40,
    weeklyPlan: [40, 40, 40, 32],
    yearlyHours: 1640,
  },
  {
    id: 2,
    name: "Consultant 2",
    weeklyCapacity: 40,
    weeklyPlan: [20, 20, 16, 20],
    yearlyHours: 920,
  },
  {
    id: 3,
    name: "Consultant 3",
    weeklyCapacity: 40,
    weeklyPlan: [40, 40, 40, 40],
    yearlyHours: 1840,
  },
  {
    id: 4,
    name: "Consultant 4",
    weeklyCapacity: 32,
    weeklyPlan: [18, 22, 24, 28],
    yearlyHours: 1180,
  },
];

const monthlyWeeks = ["KW 1", "KW 2", "KW 3", "KW 4"];

const utilizationStatus = (planned, capacity) => {
  const ratio = planned / capacity;
  if (ratio < 0.3) return { label: "< 30%", className: "red" };
  if (ratio < 0.6) return { label: "30–60%", className: "yellow" };
  if (ratio > 0.9) return { label: "> 90%", className: "blue" };
  return { label: "> 60%", className: "green" };
};

const renderMonthView = () => {
  const container = document.getElementById("monthView");
  container.innerHTML = "";

  consultants.forEach((consultant) => {
    const row = document.createElement("div");
    row.className = "month-row";

    const label = document.createElement("div");
    label.innerHTML = `<strong>${consultant.name}</strong><br /><span>${consultant.weeklyCapacity}h Vertrag</span>`;
    row.appendChild(label);

    consultant.weeklyPlan.forEach((hours, index) => {
      const slot = document.createElement("div");
      slot.className = "week-slot";
      slot.dataset.consultantId = consultant.id;
      slot.dataset.weekIndex = index;
      slot.addEventListener("dragover", handleDragOver);
      slot.addEventListener("drop", handleDrop);

      const card = document.createElement("div");
      card.className = "week-card";
      card.draggable = true;
      card.dataset.consultantId = consultant.id;
      card.dataset.weekIndex = index;
      card.innerHTML = `<strong>${monthlyWeeks[index]}</strong><span>${hours}h geplant</span>`;
      card.addEventListener("dragstart", handleDragStart);

      slot.appendChild(card);
      row.appendChild(slot);
    });

    container.appendChild(row);
  });
};

const renderWeeklyTable = () => {
  const table = document.getElementById("weeklyTable");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Consultant</th>
        <th>KW 1</th>
        <th>KW 2</th>
        <th>KW 3</th>
        <th>KW 4</th>
        <th>Auslastung</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");
  consultants.forEach((consultant) => {
    const planned = consultant.weeklyPlan.reduce((sum, hours) => sum + hours, 0);
    const capacity = consultant.weeklyCapacity * consultant.weeklyPlan.length;
    const status = utilizationStatus(planned, capacity);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${consultant.name}</td>
      <td>${consultant.weeklyPlan[0]}h</td>
      <td>${consultant.weeklyPlan[1]}h</td>
      <td>${consultant.weeklyPlan[2]}h</td>
      <td>${consultant.weeklyPlan[3]}h</td>
      <td><span class="status ${status.className}">${status.label}</span></td>
    `;
    tbody.appendChild(row);
  });
};

const renderYearlyTable = () => {
  const table = document.getElementById("yearlyTable");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Consultant</th>
        <th>Jahresstunden</th>
        <th>Kapazität</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");
  consultants.forEach((consultant) => {
    const capacity = consultant.weeklyCapacity * 52;
    const status = utilizationStatus(consultant.yearlyHours, capacity);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${consultant.name}</td>
      <td>${consultant.yearlyHours}h</td>
      <td>${capacity}h</td>
      <td><span class="status ${status.className}">${status.label}</span></td>
    `;
    tbody.appendChild(row);
  });
};

let draggedCard = null;

const handleDragStart = (event) => {
  draggedCard = event.currentTarget;
  event.dataTransfer.effectAllowed = "move";
};

const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

const handleDrop = (event) => {
  event.preventDefault();
  const slot = event.currentTarget;
  if (!draggedCard) return;

  const fromConsultantId = Number(draggedCard.dataset.consultantId);
  const fromWeekIndex = Number(draggedCard.dataset.weekIndex);
  const toConsultantId = Number(slot.dataset.consultantId);
  const toWeekIndex = Number(slot.dataset.weekIndex);

  if (fromConsultantId !== toConsultantId) {
    return;
  }

  const consultant = consultants.find((item) => item.id === fromConsultantId);
  const [moved] = consultant.weeklyPlan.splice(fromWeekIndex, 1);
  consultant.weeklyPlan.splice(toWeekIndex, 0, moved);

  renderAll();
};

const renderAll = () => {
  renderMonthView();
  renderWeeklyTable();
  renderYearlyTable();
};

renderAll();
