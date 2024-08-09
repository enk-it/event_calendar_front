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
    const year = date.getYear()

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
    const year = date.getYear()

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
        index
    ) {
        this.element = element
        this.index = index

        this.element.addEventListener(
            'click',
            () => {
                let date_clicked = this.element.getAttribute("data-calendar-date")
                console.log(date_clicked)
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


class Calendar {
    constructor(
        month_select,
        year_select,
        reset_date,
        day_cells
    ) {
        this.month_select = month_select
        this.year_select = year_select
        this.reset_date = reset_date
        this.day_cells = day_cells

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

    update_calendar(current_month) {
        this.clear()

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

            current_cell.set_date_attr(
                `${current_day.year.toString()}-${(current_day.month + 1).toString()}-${current_day.date.toString()}`
            )


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

    clear() {
        for (let i = 0; i < this.day_cells.length; i++){
            this.day_cells[i].set_event(true)
            this.day_cells[i].set_main(false)
            this.day_cells[i].set_date("")
        }
    }


}

let cell_elements = document.getElementsByClassName("cell")

var day_cells = []

for (let i = 0; i < cell_elements.length; i++) {
    day_cells.push(
        new DayCell(cell_elements[i], i)
    )
}


let calendar = new Calendar(
    document.getElementById("month"),
    document.getElementById("year"),
    document.getElementById("reset"),
    day_cells
)

