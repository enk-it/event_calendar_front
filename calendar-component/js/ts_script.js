var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fetch_events = function () { return __awaiter(_this, void 0, void 0, function () {
    var url, response, json, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://lakes.api.gladyshdd.ru/api/v1/events/";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(url)];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Response status: ".concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 3:
                json = _a.sent();
                return [2 /*return*/, json];
            case 4:
                error_1 = _a.sent();
                console.error(error_1.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var get_today_year = function () {
    var date = new Date();
    return date.getFullYear();
};
var get_today_month = function () {
    var date = new Date();
    return date.getMonth();
};
var get_today_day = function () {
    var date = new Date();
    return date.getDate();
};
var fix_weekday = function (weekday) {
    if (weekday == 0) {
        return 6;
    }
    else {
        return weekday - 1;
    }
};
var get_current_month = function () {
    return new Date(get_today_year(), get_today_month(), 1);
};
var get_next_month = function (date) {
    var month = date.getMonth();
    var year = date.getFullYear();
    if (month !== 11) {
        var new_date = new Date(year, month + 1, 1);
        return new_date;
    }
    else {
        var new_date = new Date(year + 1, 0, 1);
        return new_date;
    }
};
var get_previous_month = function (date) {
    var month = date.getMonth();
    var year = date.getFullYear();
    if (month !== 0) {
        var new_date = new Date(year, month - 1, 1);
        return new_date;
    }
    else {
        var new_date = new Date(year - 1, 11, 1);
        return new_date;
    }
};
var get_month_days = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var result = [];
    var week_num = 0;
    for (var day = 1; day <= 31; day++) {
        var date_1 = new Date(year, month, day);
        if (date_1.getDate() !== day) {
            break;
        }
        result.push(new DayData(day, month, year, week_num, fix_weekday(date_1.getDay())));
        if (date_1.getDay() === 0) {
            week_num += 1;
        }
    }
    return result;
};
var pack_calendar_list = function (previous, current, next) {
    var today_day = get_today_day();
    var today_month = get_today_month();
    var today_year = get_today_year();
    var result = [];
    // Если месяц начинается не с понедельника, то "потерянные" дни недели берём с предыдущего месяцв
    if (current[0].week_day !== 0) {
        for (var i = previous.length - current[0].week_day; i < previous.length; i++) {
            var temp = previous[i];
            temp.main = false;
            temp.today = false;
            result.push(temp);
        }
    }
    for (var i = 0; i < current.length; i++) {
        var temp = current[i];
        temp.main = true;
        if (temp.date == today_day && temp.month == today_month && temp.year == today_year) {
            temp.today = true;
        }
        else {
            temp.today = false;
        }
        result.push(temp);
    }
    for (var i = 0; i < 14; i++) {
        var temp = next[i];
        temp.main = false;
        temp.today = false;
        result.push(temp);
    }
    return result;
};
var DayData = /** @class */ (function () {
    function DayData(date, month, year, week_num, week_day) {
        this.date = date;
        this.month = month;
        this.year = year;
        this.week_num = week_num;
        this.week_day = week_day;
        this.date_str = "".concat(this.year.toString(), "-").concat((this.month + 1).toString(), "-").concat(this.date.toString());
        this.main = false;
        this.today = false;
        this.event = false;
    }
    return DayData;
}());
var DayCell = /** @class */ (function () {
    function DayCell(element, index, onClick) {
        var _this = this;
        this.element = element;
        this.index = index;
        this.onClick = onClick;
        this.element.addEventListener('click', function () {
            var date_clicked = _this.element.getAttribute("data-calendar-date");
            onClick(date_clicked);
        });
    }
    DayCell.prototype.set_event = function (flag) {
        if (flag) {
            this.element.classList.add("event");
        }
        else {
            this.element.classList.remove("event");
        }
    };
    DayCell.prototype.set_main = function (flag) {
        if (flag) {
            this.element.classList.add("main");
            this.element.classList.remove("secondary");
        }
        else {
            this.element.classList.add("secondary");
            this.element.classList.remove("main");
        }
    };
    DayCell.prototype.set_today = function (flag) {
        if (flag) {
            this.element.getElementsByClassName('extra-text')[0].innerHTML = "Сегодня";
        }
        else {
            this.element.getElementsByClassName('extra-text')[0].innerHTML = "";
        }
    };
    DayCell.prototype.set_date = function (text) {
        this.element.getElementsByClassName('date')[0].innerHTML = text;
    };
    DayCell.prototype.set_date_attr = function (date) {
        this.element.setAttribute("data-calendar-date", date);
    };
    return DayCell;
}());
var is_dates_equal = function (date1, date2) {
    var date1_date = new Date(date1);
    var date2_date = new Date(date2);
    if (date1_date.getDate() !== date2_date.getDate()) {
        return false;
    }
    if (date1_date.getFullYear() !== date2_date.getFullYear()) {
        return false;
    }
    if (date1_date.getMonth() !== date2_date.getMonth()) {
        return false;
    }
    return true;
};
var Calendar = /** @class */ (function () {
    function Calendar(month_select, year_select, reset_date, day_cells) {
        var _this = this;
        this.month_select = month_select;
        this.year_select = year_select;
        this.reset_date = reset_date;
        this.day_cells = day_cells;
        this.events = [];
        this.reset_date.addEventListener('click', function () { _this.reset(); });
        this.month_select.addEventListener('change', function () {
            _this.update_calendar(new Date(parseInt(_this.year_select.value), parseInt(_this.month_select.value), 1));
        });
        this.year_select.addEventListener('change', function () {
            _this.update_calendar(new Date(parseInt(_this.year_select.value), parseInt(_this.month_select.value), 1));
        });
        this.reset();
    }
    Calendar.prototype.set_events = function (events) {
        this.events = events;
        this.reset();
    };
    Calendar.prototype.update_calendar = function (current_month) {
        var next_month = get_next_month(current_month);
        var previous_month = get_previous_month(current_month);
        var previous_month_days = get_month_days(previous_month);
        var current_month_days = get_month_days(current_month);
        var next_month_days = get_month_days(next_month);
        var total_calendar = pack_calendar_list(previous_month_days, current_month_days, next_month_days);
        for (var i = 0; i < this.day_cells.length; i++) {
            var current_day = total_calendar[i];
            var current_cell = this.day_cells[i];
            current_cell.set_date_attr(current_day.date_str);
            current_cell.set_event(false);
            for (var j = 0; j < this.events.length; j++) {
                if (is_dates_equal(current_day.date_str, this.events[j].date.split('T')[0])) {
                    current_cell.set_event(true);
                    break;
                }
            }
            current_cell.set_main(current_day.main);
            current_cell.set_today(current_day.today);
            current_cell.set_date(current_day.date);
        }
    };
    Calendar.prototype.update_selects = function (date) {
        this.month_select.value = date.getMonth().toString();
        this.year_select.value = date.getFullYear().toString();
    };
    Calendar.prototype.reset = function () {
        var today_month = get_current_month();
        this.update_selects(today_month);
        this.update_calendar(today_month);
    };
    return Calendar;
}());
var CalendarPopup = /** @class */ (function () {
    function CalendarPopup(image, title, body) {
        this.image = image;
        this.title = title;
        this.body = body;
        this.events = [];
        this.date = new Date();
    }
    CalendarPopup.prototype.set_events = function (events) {
        this.events = events;
    };
    CalendarPopup.prototype.update = function (date) {
        var current_day_events = [];
        for (var i = 0; i < this.events.length; i++) {
            if (is_dates_equal(date, this.events[i].date.split('T')[0]) === true) {
                current_day_events.push(this.events[i]);
            }
        }
        if (current_day_events.length !== 0) {
            this.update_title(current_day_events[0].title);
            this.update_body(current_day_events[0].body);
            this.update_image(current_day_events[0].img);
        }
        else {
            this.show_no_events();
        }
    };
    CalendarPopup.prototype.show_no_events = function () {
        this.update_title('В этот день нет событий');
        this.update_body('');
        this.update_image('https://media.istockphoto.com/id/1182676661/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA-%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D0%BB-x-%D0%B7%D0%BD%D0%B0%D0%BA-%D1%84%D0%BE%D1%80%D0%BC%D1%8B-%D0%BE%D0%B7%D0%BD%D0%B0%D1%87%D0%B0%D0%B5%D1%82-%D1%81%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C-%D0%BD%D0%B5%D1%82.jpg?s=612x612&w=is&k=20&c=W2eWwAIfYypJ1Unszd59tl_CK6aMMSw4rlQSJbyxqLw=');
    };
    CalendarPopup.prototype.update_title = function (title) {
        this.title.getElementsByTagName('h3')[0].innerHTML = title;
    };
    CalendarPopup.prototype.update_image = function (img) {
        this.image.setAttribute('src', img);
    };
    CalendarPopup.prototype.update_body = function (body) {
        this.body.innerHTML = body;
    };
    return CalendarPopup;
}());
var calendar_popup = new CalendarPopup(document.getElementsByClassName("calendar-popup-image")[0], document.getElementsByClassName("popup-title")[0], document.getElementsByClassName("calendar-popup-text")[0]);
var day_cells = [];
var cell_elements = document.getElementsByClassName("cell");
for (var i = 0; i < cell_elements.length; i++) {
    day_cells.push(new DayCell(cell_elements[i], i, function (date) { calendar_popup.update(date); }));
}
var calendar = new Calendar(document.getElementById("month"), document.getElementById("year"), document.getElementById("reset"), day_cells);
var events = fetch_events().then(function (result) {
    calendar_popup.set_events(result);
    calendar.set_events(result);
    console.log(result);
});
//todo получать events в global scope вместе с ними инициализировать CalendarPopup, в календерь и в дей целлс передавать коллбэк для обновления попапа
