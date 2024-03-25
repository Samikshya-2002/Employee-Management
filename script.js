var employees = JSON.parse(localStorage.getItem("employees")) || [];

var isUpdating = false;
function addEmployee() {
  var name = document.getElementById("name").value;
  var id = document.getElementById("id").value;
  var role = document.getElementById("role").value;

  if (!name || !id || !role) {
    document.getElementById("error-message").textContent =
      "Please fill in all fields.";
    return;
  }

  if (!/^[a-zA-Z]+$/.test(name)) {
    alert("Name should only contain alphabetic characters.");
    return;
  }

  var employeeIndex = document.getElementById("employeeIndex").value;
  if (employeeIndex) {
    employees[employeeIndex] = { name: name, id: id, role: role };
    document.getElementById("employeeIndex").value = "";
    isUpdating = false;
    document.getElementById("submit-button").textContent = "Add Employee";
  } else {
    employees.push({ name: name, id: id, role: role });
  }
  localStorage.setItem("employees", JSON.stringify(employees));

  location.reload();
}

function updateEmployee() {
  var name = document.getElementById("name").value;
  var id = document.getElementById("id").value;
  var role = document.getElementById("role").value;

  if (!name || !id || !role) {
    document.getElementById("error-message").textContent =
      "Please fill in all fields.";
    return;
  }

  if (!/^[a-zA-Z]+$/.test(name)) {
    alert("Name should only contain alphabetic characters.");
    return;
  }

  for (var i = 0; i < employees.length; i++) {
    if (employees[i].id === id) {
      employees[i].name = name;
      employees[i].role = role;
    }
  }

  localStorage.setItem("employees", JSON.stringify(employees));
  // displayEmployees();
  location.reload();
}

function deleteEmployee(id) {
  var confirmDelete = confirm("Are you sure you want to delete this employee?");

  if (confirmDelete) {
    employees = employees.filter(function (employee) {
      return employee.id !== id;
    });

    localStorage.setItem("employees", JSON.stringify(employees));
    location.reload();
  }
}


function displayEmployees() {
  var employeeList = document.getElementById("employee-list");

  var table = document.createElement("table");
  table.classList.add("employee-table"); // Add CSS class for the table

  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = ["Name", "ID", "Role", "Action"];
  headers.forEach(function (header) {
    var th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  var tbody = document.createElement("tbody");

  employees.forEach(function (employee, index) {
    var row = document.createElement("tr");

    var nameCell = document.createElement("td");
    nameCell.textContent = employee.name;
    row.appendChild(nameCell);

    var idCell = document.createElement("td");
    idCell.textContent = employee.id;
    row.appendChild(idCell);

    var roleCell = document.createElement("td");
    roleCell.textContent = employee.role;
    row.appendChild(roleCell);

    var actionCell = document.createElement("td");

    var updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.classList.add("update-button"); // Add CSS class for update button
    updateButton.onclick = function () {
      document.getElementById("name").value = employee.name;
      document.getElementById("id").value = employee.id;
      document.getElementById("role").value = employee.role;
      document.getElementById("employeeIndex").value = index;
      isUpdating = true;
      document.getElementById("submit-button").textContent = "Update Employee";
    };
    actionCell.appendChild(updateButton);

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button"); // Add CSS class for delete button
    deleteButton.onclick = function () {
      deleteEmployee(employee.id);
    };
    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  employeeList.innerHTML = "";
  employeeList.appendChild(table);
}

displayEmployees();
