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
var normalSchedule = [
    [],
    ["6:00PM-8:00PM"],
    ["5:45AM-7:00AM", "6:00PM-8:00PM"],
    ["6:00PM-8:00PM"],
    ["5:45AM-7:00AM", "6:00PM-8:00PM"],
    ["5:30PM-7:00PM"],
    ["10:00AM-12:00PM"]
]

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

        // Practices
        events.filter(event => event.hasOwnProperty('summary') && event.summary.includes("Practice") && !event.summary.includes("No Practice"))
            .map(event => event = new Practice(event, normalSchedule))
            .filter(practice => practice.start.getFullYear() == year && practice.start.getMonth() == month)
            .forEach(practice => practice.addTo(validCells[practice.start.getDate() - 1].contentsCell));

        // Club Meets
        events.filter(event => event.organizer.displayName == "Meets")
            .map(event => event = new Meet(event))
            .filter(meet => meet.getDates().some(date => date.getFullYear() == year && date.getMonth() == month))
            .filter(meet => !meet.name.includes("MS"))
            .forEach(meet => {
                meet.getDates()
                    .forEach(date => meet.addTo(validCells[date.getDate()].contentsCell))
            });
    }
}

class Practice {
    constructor(event, normalSchedule) {
        this.start = new Date(event.start.dateTime ? event.start.dateTime : event.start.date);
        this.end = new Date(event.end.dateTime ? event.end.dateTime : event.end.date);
        this.location = event.location;
        this.isNormalTime = function() {
            return normalSchedule[this.start.getDay()].includes(this.toString())
        };
        this.toString = function() {
            return this.start.toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric'
            }).split(" ").join("") + '-' + this.end.toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric'
            }).split(" ").join("");
        }
        this.addTo = function(container) {
            var div = document.createElement("div");
            div.innerHTML = this.toString();
            if (!this.isNormalTime()) {
                div.className = "time-changed";
            } else if (this.start.getHours() < 12) {
                div.className = "time-am";
            } else if (this.start.getDay() == 5 && this.toString() == "5:30PM-7:00PM") {
                div.className = "time-friday";
            }
            container.appendChild(div);
            if (this.location.includes("Franklin Community Middle School")) {
                var loc = document.createElement("div");
                loc.className = "location-fcms";
                container.appendChild(loc);
            } else if (this.location.includes("Franklin Family Aquatic Center")) {
                var loc = document.createElement("div");
                loc.className = "location-ffac";
                container.appendChild(loc);
            }
        }
    }
}

class Meet {
    constructor(event) {
        this.name = event.summary;
        this.start = new Date(event.start.dateTime ? event.start.dateTime : event.start.date);
        this.end = new Date(event.end.dateTime ? event.end.dateTime : event.end.date);
        this.getDates = function() {
            var array = [];
            var current = new Date(this.start);
            while (current < this.end) {
                array.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
            return array;
        }
        this.addTo = function(container) {
            var img = document.createElement("img");
            var clubName = /^[A-Z]{2,5}/.exec(this.name)[0];
            var eventName = /(?<=^[A-Z]{2,5}\s).*/.exec(this.name)[0];
            img.src = `/images/calendar/${clubName}.png`
            img.className = "meet-badge";
            var div = document.createElement("div");
            div.innerHTML = eventName;
            div.className = "meet-name";
            container.appendChild(img);
            container.appendChild(div);
            container.classList.add("clickable");
        }
    }
}

function addPractice(container, practice) {

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