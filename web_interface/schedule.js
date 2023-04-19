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
        
        $.get("schedule_search.php", dataToSend, function (data) {
            $("#search-results").html(data);
        });
    });
});

$("#insert-schedule-btn").on("click", function () {
    const formHtml = `
          <form id="insert-schedule-form">
              <div class="form-group">
                  <label for="EID">Employee ID*</label>
                  <input type="number" class="form-control" name="eid" value="123005" required>
              </div>
              <div class="form-group">
                  <label for="FID">Facility ID*</label>
                  <input type="number" class="form-control" name="fid" value="1005" required>
              </div>
              <div class="form-group">
                  <label for="Date">Date*</label>
                  <input type="date" class="form-control" name="date" required>
              </div>
              <div class="form-group">
                  <label for="Start_Time">Start Time*</label>
                  <input type="time" class="form-control" name="start_time" required>
              </div>
              <div class="form-group">
                  <label for="End_Time">End Time*</label>
                  <input type="time" class="form-control" name="end_time" required>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
          </form>
      `;

    const insertScheduleModal = `
        <div class="modal" tabindex="-1" role="dialog" id="insert-schedule-modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add a Schedule Entry (* means required)</h5>
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

    $("body").append(insertScheduleModal);
    $("#insert-schedule-modal").modal("show");

    $("#insert-schedule-form").on("submit", function (event) {
        event.preventDefault();

        const formData = $(this).serialize();

        $.post("schedule_insert.php", formData, function (data) {
            const response = JSON.parse(data);
            console.log(response);
            if (response.status === "success") {
                alert("Schedule entry added successfully!");
                $("#insert-schedule-modal").modal("hide");
                $("#insert-schedule-modal").remove();

                // Fetch the newly inserted schedule entry
                $.get("schedule_search.php", { "eid": response.eid, "fid": response.fid, "date": response.date, "start_time": response.start_time }, function (data) {
                    $("#search-results").html(data);
                });
            } else {
                alert("An error occurred while adding the schedule entry. Error details: " + response.error);
            }
        });
    });
});

$(document).on("click", ".delete-btn", function () {
    const rowData = $(this).data("row");
    const eid = rowData.EID;
    const fid = rowData.FID;
    const date = rowData.date;
    const startTime = rowData.start_time;
    const endTime = rowData.end_time;

    if (confirm("Are you sure you want to delete the schedule for EID: " + eid + ", FID: " + fid + ", Date: " + date + ", Start Time: " + startTime + ", End Time: " + endTime + "?")) {
        $.post("schedule_delete.php", { "eid": eid, "fid": fid, "date": date, "start_time": startTime, "end_time": endTime }, function (data) {
            if (data === "success") {
                alert("Schedule deleted successfully!");
                $("#search-form").submit();
            } else {
                alert("An error occurred while deleting the schedule: " + data);
            }
        });
    }
});

$(document).on("click", ".update-btn", function () {
    const data = $(this).data("row");


    let formContent = `
      <input type="hidden" id="update-eid" name="eid" value="${data.EID}">
      <input type="hidden" id="update-fid" name="fid" value="${data.FID}">
      <input type="hidden" id="original-start-time" name="original_start_time" value="${data.start_time}">
      <div class="form-group">
        <label for="update-date">Date</label>
        <input type="date" class="form-control" id="update-date" name="date" value="${data.date}" readonly>
      </div>
      <div class="form-group">
        <label for="update-start-time">Start Time</label>
        <input type="time" class="form-control" id="update-start-time" name="start_time" value="${data.start_time}" required>
      </div>
      <div class="form-group">
        <label for="update-end-time">End Time</label>
        <input type="time" class="form-control" id="update-end-time" name="end_time" value="${data.end_time}" required>
      </div>`;
    $("#update-schedule-form").html(formContent);

    // Show the modal
    $("#update-schedule-modal").modal("show");
});

$("#update-schedule-submit").on("click", function () {
    const formData = $("#update-schedule-form").serialize();

    $.post("schedule_update.php", formData, function (data) {
        const response = JSON.parse(data);
        if (response.status === "success") {
            alert("Schedule updated successfully!");
            $("#update-schedule-modal").modal("hide");
            $("#search-form").submit();
        } else {
            alert("An error occurred while updating the schedule: " + response.message);
        }
    });
});
