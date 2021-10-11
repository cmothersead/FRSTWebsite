gapi.load("client", init);

function init() {
    gapi.client.init({
        'apiKey': 'AIzaSyAjbzmiW3uXLXc72fsCloea3U9zO6bke0Y',
        'discoveryDocs': ['https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest']
    }).then(function() {
        loadCalendar();
    });
}

function loadCalendar() {
    return gapi.client.calendar.events.list({
            "calendarId": "c_classroom443edbdc@group.calendar.google.com",
            'orderBy': 'startTime',
            "singleEvents": true
        })
        .then(function(response) {
                events = response.result.items;
                fillCalendar(year, month)
            },
            function(err) {
                console.error("Execute error", err);
            })
}

var month = new Date().getMonth();
var year = new Date().getFullYear();
var validCells;
var events;

function changeMonth(forward) {
    if (forward) {
        if (month == 11) {
            year++;
            month = 0;
        } else {
            month++;
        }
    } else {
        if (month == 0) {
            year--;
            month = 11;
        } else {
            month--;
        }
    }
    destroyCalendar();
    createAndFillCalendar(year, month);
}

function destroyCalendar() {
    var calendar = document.getElementById("calendar");
    Array.from(calendar.children).forEach(child => calendar.removeChild(child));
}

function createAndFillCalendar(year, month) {
    createCalendar(year, month);
    fillCalendar(year, month);
}

function createCalendar(year, month) {
    var calendar = document.getElementById("calendar");
    var date = new Date(year, month, 1);
    var first = new Date(date.getFullYear(), date.getMonth(), 1);
    var last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var month = date.toLocaleString('default', {
        month: 'long'
    })
    var year = date.getFullYear();
    document.getElementById("month").innerHTML = month;
    document.getElementById("year").innerHTML = year;

    for (let i = 0; i < numWeeks(last.getDate(), first.getDay()); i++) {
        addRow(calendar);
    }

    var dates = [];
    var contents = [];
    var dateRows = Array.from(calendar.getElementsByClassName("date-row"));
    var contentRows = Array.from(calendar.getElementsByClassName("content-row"));
    dateRows.forEach(row => dates.push.apply(dates, Array.from(row.children)));
    contentRows.forEach(row => contents.push.apply(contents, Array.from(row.children)));
    var cells = dates.map((date, index) => date = {
        dateValue: 0,
        dateCell: dates[index],
        contentsCell: contents[index]
    })
    cells.forEach((cell, index) => {
        var value = index + 1 - first.getDay();
        if (value >= 1 && value <= last.getDate()) {
            cell.dateValue = value;
            cell.dateCell.innerHTML = value;
        } else {
            cell.dateCell.className = "empty";
            cell.contentsCell.className = "empty";
        }
    });
    validCells = cells.filter(cell => cell.dateValue != 0);
}

function fillCalendar(year, month) {
    if (events.length > 0) {
        events = Array.from(events);
        var practices = events.filter(event => event.summary.includes("Practice") && !event.summary.includes("No Practice"))
            .map(event => event = {
                start: new Date(event.start.dateTime ? event.start.dateTime : event.start.date),
                end: new Date(event.end.dateTime ? event.end.dateTime : event.end.date),
            })
            .filter(event => event.start.getFullYear() == year && event.start.getMonth() == month);
        practices.forEach(practice =>
            validCells[practice.start.getDate() - 1].contentsCell.innerHTML +=
            "<div" + (practice.start.getHours() < 12 ? " class=\"time-am\">" : ">") +
            practiceToString(practice) + "</div>");
    }
}

function practiceToString(practice) {
    return practice.start.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric'
    }).split(" ").join("") + '-' + practice.end.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric'
    }).split(" ").join("");
}

function numWeeks(numDays, startDay) {
    return Math.ceil((numDays + startDay) / 7);
}

function addRow(calendar) {
    var dateRow = document.createElement("tr");
    dateRow.className = "date-row";
    var contentRow = document.createElement("tr");
    contentRow.className = "content-row";
    for (let i = 0; i < 7; i++) {
        dateRow.appendChild(document.createElement("td"));
        contentRow.appendChild(document.createElement("td"));
    }
    calendar.appendChild(dateRow);
    calendar.appendChild(contentRow);
}