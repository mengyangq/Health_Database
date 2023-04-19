$(document).ready(function () {
    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        const formData = $(this).serializeArray();
        const dataToSend = {};

        formData.forEach((item) => {
            if (Array.isArray(dataToSend[item.name])) {
                dataToSend[item.name].push(item.value);
            } else if (dataToSend.hasOwnProperty(item.name)) {
                dataToSend[item.name] = [dataToSend[item.name], item.value];
            } else {
                dataToSend[item.name] = item.value;
            }
        });
        
        
        $.get("vaccination_search.php", dataToSend, function (data) {
            $("#search-results").html(data);
        });
    });
});


$("#insert-vaccination-btn").on("click", function () {
    const formHtml = `
        <form id="insert-vaccination-form">
            <div class="form-group">
                <label for="eid-input">Employee ID</label>
                <input type="text" class="form-control" id="eid-input" name="eid" required>
            </div>
            <div class="form-group">
                <label for="fid-input">Facility ID (vaccinated in)</label>
                <input type="text" class="form-control" id="fid-input" name="fid" required>
            </div>
            <div class="form-group">
                  <label for="Nature">Brand*</label>
                  <select class="form-control" name="brand" required>
                      <option value="Pfizer">Pfizer</option>
                      <option value="Moderna">Moderna</option>
                      <option value="AstraZeneca">AstraZeneca</option>
                      <option value="Johnson&Johnson">Johnson&Johnson</option>
                  </select>
              </div>
            <div class="form-group">
                <label for="vdate-input">Vaccination Date</label>
                <input type="date" class="form-control" id="vdate-input" name="vdate" required>
            </div>
            <button type="submit" class="btn btn-primary">Add Record</button>
        </form>
    `;

    const insertVaccinationModal = `
        <div class="modal" tabindex="-1" role="dialog" id="insert-vaccination-modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Vaccination Record</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${formHtml}
                    </div>
                </div>
            </div>
        </div>
    `;

    $("body").append(insertVaccinationModal);
    $("#insert-vaccination-modal").modal("show");

    $("#insert-vaccination-form").on("submit", function (event) {
        event.preventDefault();

        const formData = $(this).serialize();

        $.post("vaccination_insert.php", formData, function (data) {
            const response = JSON.parse(data);
            console.log(response);
            if (response.status === "success") {
                alert("Vaccination record added successfully!");
                $("#insert-vaccination-modal").modal("hide");
                $("#insert-vaccination-modal").remove();

                // Fetch the newly inserted vaccination record
                $.get("vaccination_search.php", { "eid": response.eid, "fid": response.fid, "brand": response.brand, "vdate": response.vdate }, function (data) {
                    $("#search-results").html(data);
                });
            } else {
                alert("An error occurred while adding the vaccination record. Error details: " + response.error);
            }
        });
    });
});
/*
$(document).on("click", ".delete-btn", function () {
    const rowData = $(this).data("row");
    const eid = rowData.eid;
    const fid = rowData.fid;
    const brand = rowData.brand;
    const vdate = rowData.vdate;

    if (confirm("Are you sure you want to delete the vaccination record for EID: " + eid + ", FID: " + fid + ", Brand: " + brand + ", Vaccination Date: " + vdate + "?")) {
        $.post("vaccination_delete.php", { "eid": eid, "fid": fid, "brand": brand, "vdate": vdate }, function (data) {
            if (data === "success") {
                alert("Vaccination record deleted successfully!");
                $("#search-form").submit();
            } else {
                alert("An error occurred while deleting the vaccination record: " + data);
            }
        });
    }
});
*/

$(document).on("click", ".update-btn", function () {
    const data = $(this).data("row");

    let formContent = `
        <input type="hidden" id="update-eid" name="eid" value="${data.eid}">
        <input type="hidden" id="update-fid" name="fid" value="${data.fid}">
        <input type="hidden" id="update-brand" name="brand" value="${data.brand}">
        <input type="hidden" id="original-vdate" name="original_vdate" value="${data.vdate}">
        <div class="form-group">
            <label for="update-vdate">Vaccination Date</label>
            <input type="date" class="form-control" id="update-vdate" name="vdate" value="${data.vdate}" required>
        </div>
        <div class="form-group">
            <label for="update-dose-number">Dose Number</label>
            <input type="text" class="form-control" id="update-dose-number" name="dose_number" value="${data.dose_number}" readonly>
        </div>`;
    $("#update-vaccination-form").html(formContent);

    // Show the modal
    $("#update-vaccination-modal").modal("show");
});
function populateUpdateForm(rowData) {
    console.log(rowData);
    const form = $("#update-vaccination-form");
    form.empty();
    const fields = [
        { name: "EID", label: "Employee ID" },
        { name: "FID", label: "Facility ID" },
        { name: "Dose_Number", label: "Dose Number" },
        { name: "Brand", label: "Brand" },
        { name: "V_Date", label: "Vaccination Date", type: "date" },
    ];

    fields.forEach((field) => {
        let inputType = field.type || "text";
        let inputValue = rowData[field.name] || ""; // Add this line

        if (inputType === "date") {
            inputValue = inputValue.split(" ")[0]; // Add this line
        }

        form.append(`
            <div class="form-group">
                <label for="${field.name}">${field.label}</label>
                <input type="${inputType}" class="form-control" id="${field.name}" name="${field.name}" value="${inputValue}">
            </div>
        `);
    });
}

$(document).on("submit", "#update-vaccination-form", function (event) {
    event.preventDefault();
    const formData = $(this).serialize();

    $.post("vaccination_update.php", formData, function (data) {
        const response = JSON.parse(data);
        if (response.status === "success") {
            alert("Vaccination updated successfully!");
            $("#update-vaccination-modal").modal("hide");
            $("#search-form").submit();
        } else {
            alert("An error occurred while updating the vaccination: " + response.message);
        }
    });
});

