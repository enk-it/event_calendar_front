const fetch_events = async () => {
    const url = "http://localhost:8081/api/v1/events/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error.message);
    }
}



const get_today_year = () => {
    const date = new Date()
    return date.getFullYear()
}

const get_today_month = () => {
    const date = new Date()
    return date.getMonth()
}

const get_today_day = () => {
    const date = new Date()
    return date.getDate()
}

const fix_weekday = (weekday) => {
    if (weekday == 0) {
        return 6
    }
    else {
        return weekday - 1
    }
}

const get_current_month = () => {
    return new Date(get_today_year(), get_today_month(), 1)
}

const get_next_month = (date) => {
    const month = date.getMonth()
    const year = date.getFullYear()

    if (month !== 11) {
        const new_date = new Date(year, month + 1, 1)
        return new_date
    }
    else {
        const new_date = new Date(year + 1, 0, 1)
        return new_date
    }
}

const get_previous_month = (date) => {
    const month = date.getMonth()
    const year = date.getFullYear()

    if (month !== 0) {
        const new_date = new Date(year, month - 1, 1)
        return new_date
    }
    else {
        const new_date = new Date(year - 1, 11, 1)
        return new_date
    }

}

const get_month_days = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    var result = []
    var week_num = 0

    for (let day = 1; day <= 31; day++) {
        const date = new Date(year, month, day)

        if (date.getDate() !== day) {
            break
        }

        result.push(
            {
                date: day,
                month: month,
                year: year,
                week_num: week_num,
                week_day: fix_weekday(date.getDay())
            }
        )

        if (date.getDay() === 0){
            week_num += 1
        }

    }
    return result
}

const pack_calendar_list = (previous, current, next) => {
    const today_day = get_today_day()
    const today_month = get_today_month()
    const today_year = get_today_year()

    var result = []


    // Если месяц начинается не с понедельника, то "потерянные" дни недели берём с предыдущего месяцв
    if (current[0].week_day !== 0) {
        for (let i = previous.length - current[0].week_day; i < previous.length ; i++) {
            let temp = previous[i]
            temp.main = false
            temp.today = false
            result.push(temp)
        }
    }


    for (let i = 0; i < current.length; i++){
        let temp = current[i]
        temp.main = true
        if (temp.date == today_day && temp.month == today_month && temp.year == today_year) {
            temp.today = true
        }
        else {
            temp.today = false
        }
        result.push(temp)
    }

    for (let i = 0; i < 14 ; i++) {
        let temp = next[i]
        temp.main = false
        temp.today = false
        result.push(temp)
    }


    return result
}




class DayCell {
    constructor(
        element,
        index,
        onClick
    ) {
        this.element = element
        this.index = index
        this.onClick = onClick

        this.element.addEventListener(
            'click',
            () => {
                let date_clicked = this.element.getAttribute("data-calendar-date")
                onClick(date_clicked)
            }
        )
    }

    set_event(flag){
        if (flag) {
            this.element.classList.add("event")
        }
        else {
            this.element.classList.remove("event")
        }
    }

    set_main(flag){
        if (flag) {
            this.element.classList.add("main")
            this.element.classList.remove("secondary")
        }
        else {
            this.element.classList.add("secondary")
            this.element.classList.remove("main")
        }
    }

    set_today(flag){
        if (flag) {
            this.element.getElementsByClassName('extra-text')[0].innerHTML = "Сегодня"
        }
        else {
            this.element.getElementsByClassName('extra-text')[0].innerHTML = ""
        }
    }

    set_date(text) {
        this.element.getElementsByClassName('date')[0].innerHTML = text
    }

    set_date_attr(date) {
        this.element.setAttribute("data-calendar-date", date)
    }


}


const is_dates_equal = (date1, date2) => {
    let date1_date = new Date(date1)
    let date2_date = new Date(date2)
    if (date1_date.getDate() !== date2_date.getDate()) {return false}
    if (date1_date.getFullYear() !== date2_date.getFullYear()) {return false}
    if (date1_date.getMonth() !== date2_date.getMonth()) {return false}
    return true
}

class Calendar {
    constructor(
        month_select,
        year_select,
        reset_date,
        day_cells,
    ) {
        this.month_select = month_select
        this.year_select = year_select
        this.reset_date = reset_date
        this.day_cells = day_cells
        this.events = []


        this.reset_date.addEventListener(
            'click',
            () => {this.reset()}
        )

        this.month_select.addEventListener(
            'change',
            () =>
            {
                this.update_calendar(
                    new Date(
                        parseInt(this.year_select.value),
                        parseInt(this.month_select.value),
                        1
                    )
                )
            }
        )

        this.year_select.addEventListener(
            'change',
            () =>
            {
                this.update_calendar(
                    new Date(
                        parseInt(this.year_select.value),
                        parseInt(this.month_select.value),
                        1
                    )
                )
            }
        )

        this.reset()

    }

    set_events(events) {
        this.events = events
        this.reset()
    }

    update_calendar(current_month) {
        const next_month = get_next_month(current_month)
        const previous_month = get_previous_month(current_month)

        const previous_month_days = get_month_days(previous_month)
        const current_month_days = get_month_days(current_month)
        const next_month_days = get_month_days(next_month)

        const total_calendar = pack_calendar_list(
            previous_month_days,
            current_month_days,
            next_month_days
        )

        for (let i = 0; i < this.day_cells.length; i++) {
            let current_day = total_calendar[i]
            let current_cell = this.day_cells[i]

            let date_str = `${current_day.year.toString()}-${(current_day.month + 1).toString()}-${current_day.date.toString()}`

            current_cell.set_date_attr(
                date_str
            )


            for (let j = 0; j < this.events.length; j++) {
                current_cell.set_event(
                    is_dates_equal(date_str, this.events[j].date.split('T')[0])
                )
            }




            current_cell.set_main(current_day.main)
            current_cell.set_today(current_day.today)

            current_cell.set_date(current_day.date)
        }


    }

    update_selects(date) {
        this.month_select.value = date.getMonth().toString()
        this.year_select.value = date.getFullYear().toString()
    }

    reset() {
        const today_month = get_current_month()
        this.update_selects(today_month)
        this.update_calendar(today_month)
    }

}


class CalendarPopup {
    constructor(
        image,
        title,
        body,
    ) {
        this.image = image
        this.title = title
        this.body = body

        this.events = []
        this.date = new Date()
    }

    set_events(events) {
        this.events = events
    }

    update(date) {
        let current_day_events = []
        for (let i = 0; i < this.events.length; i++) {
            if (is_dates_equal(date, this.events[i].date.split('T')[0]) === true) {
                current_day_events.push(this.events[i])
            }
        }

        console.log(current_day_events)
        console.log(current_day_events)

        if (current_day_events.length !== 0) {
            this.update_title(
                current_day_events[0].title
            )
            this.update_body(
                current_day_events[0].body
            )
            this.update_image(
                current_day_events[0].img
            )
        }
        else{
            this.show_no_events()
        }
        console.log(current_day_events)
    }

    show_no_events() {

    }

    update_title(title) {
        this.title.getElementsByTagName('h3')[0].innerHTML = title
    }
    update_image(img) {
        this.image.setAttribute('src', img)
    }
    update_body(body) {
        this.body.innerHTML = body
    }


}



let calendar_popup = new CalendarPopup(
    document.getElementsByClassName("calendar-popup-image")[0],
    document.getElementsByClassName("popup-title")[0],
    document.getElementsByClassName("calendar-popup-text")[0],
)


let day_cells = []
let cell_elements = document.getElementsByClassName("cell")
for (let i = 0; i < cell_elements.length; i++) {
    day_cells.push(
        new DayCell(
            cell_elements[i],
            i,
            (date) => {calendar_popup.update(date)}
        )
    )
}


let calendar = new Calendar(
    document.getElementById("month"),
    document.getElementById("year"),
    document.getElementById("reset"),
    day_cells
)


let events = fetch_events().then(
    (result) => {
        calendar_popup.set_events(result)
        calendar.set_events(result)
        console.log(calendar_popup.events)
    }
)


//todo получать events в global scope вместе с ними инициализировать CalendarPopup, в календерь и в дей целлс передавать коллбэк для обновления попапа

