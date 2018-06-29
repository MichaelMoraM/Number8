function dateTimePicker() {
    var StartDate = $('#txt_StartDate').val();
    var NumberDays = $('#txt_NumberDays').val();
    var CountryCode = $('#txt_CountryCode').val();

    if (StartDate == "") {
        alert("Please select a Start Date");
        return;
    } else if (NumberDays == "") {
        alert("Please select a quantity of days");
        return;
    } else if (CountryCode == "") {
        alert("Please select a Country Code");
        return;
    }

    if (StartDate.includes('-')) {
        StartDate = StartDate.replace('-', '/').replace('-', '/')
    }
    //CreateDate(StartDate, NumberDays, CountryCode)

    Build(StartDate, NumberDays, CountryCode)

}

function Build(StartDate, NumberDays, CountryCode) {
    var NewDate = new Date(StartDate);
    var initDay = NewDate.getDate();
    var initMonth = NewDate.getMonth() + 1;
    var initYear = NewDate.getFullYear();
    var dtp = "";
    var headers = true;
    for (var i = 0; 0 < NumberDays; i++) {
        var cantDiasMes = diasMes(initMonth, initYear)

        var sendNumbers = (initDay != 1 ? cantDiasMes - initDay + 1 : (NumberDays > cantDiasMes ? cantDiasMes : NumberDays));
        dtp += HacerMes(sendNumbers, initDay, initMonth, initYear, cantDiasMes, headers)

        NumberDays = NumberDays - sendNumbers;

        initDay = 1;
        initYear = (initMonth == 12 ? initYear + 1 : initYear);
        initMonth = (initMonth == 12 ? 1 : initMonth + 1);

        headers = false;
    }
    var headers2 = "<table style='width:25px' class='calendar'> <tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr> </table>"
    $('#divNew').html(headers2 + " " + dtp);
}

function diasMes(mes, anno) {
    if ((mes == 1) || (mes == 3) || (mes == 5) || (mes == 7) || (mes == 8) || (mes == 10) || (mes == 12))
        return 31;
    else if ((mes == 4) || (mes == 6) || (mes == 9) || (mes == 11))
        return 30;
    else if (mes == 2) {
        if ((anno % 4 == 0) && (anno % 100 != 0) || (anno % 400 == 0))
            return 29;
        else
            return 28;
    }
}

function ClassOfWeek(day, month, year) {
    var classStyle = '';
    var NewDate = new Date(year + '/' + month + '/' + day);
    var dayNumber = NewDate.getDay();

    var Hollidays = ["1/1", "2/2", "3/3", "4/4", "5/5", "6/6", "7/7", "6/6", "25/12", "1/1", "14/2", "24/12"];

    if (Hollidays.includes(day + "/" + month))
        classStyle = 'Holidays';
    else if (dayNumber == 0 || dayNumber == 6)
        classStyle = 'WeekEnd';
    else
        classStyle = 'WeekDays';

    return classStyle;
}

function DayNumberId(day, month, year) {
    var NewDate = new Date(year + '/' + month + '/' + day);
    var dayNumber = NewDate.getDay();
    return dayNumber;
}

function HacerMes(CantidadDias, initDay, initMonth, initYear, cantDiasMes, headers) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var t = '<div class="month">' + monthNames[initMonth - 1] + " " + initYear + ' </div>';

    var dayNumber = 0, numberOfDays = 7, styleClass = "";

    t += "<table style='width:25px' class='calendar'>"

    var fill = true;
    for (i = 0 ; 0 <= CantidadDias; i++) {
        t += "<tr>";
        for (g = 0 ; g < numberOfDays ; g++) {
            dayNumber = DayNumberId(initDay, initMonth, initYear);
            styleClass = ClassOfWeek(initDay, initMonth, initYear);
            if (fill) {
                for (j = 0 ; j < dayNumber ; j++) {
                    t += '<td class="NoDays"> </td>';
                }
                fill = false;
            }
            t += '<td class="' + styleClass + '">' + (initDay) + '</td>';
            CantidadDias--;
            initDay++;
            if (initDay > cantDiasMes || dayNumber == numberOfDays - 1 || CantidadDias == 0) {

                for (l = 0 ; l < numberOfDays - dayNumber - 1 ; l++) {
                    t += '<td class="NoDays"> </td>';
                }
                break;
            }
        }
        t += "</tr>";
        if (initDay >= cantDiasMes || CantidadDias == 0) {
            break;
        }
    }
    t += "</table>"
    return t;
}