



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

            let temp = `${current_day.year.toString()}-${(current_day.month + 1).toString()}-${current_day.date.toString()}`

            // console.log(
            //     temp
            // )
            current_cell.set_date_attr(
                temp
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


class CalendarPopup {
    constructor(
        image,
        title,
        body,
        events_list
    ) {
        this.image = image
        this.title = title
        this.body = body
        this.events_list = events_list

        this.events = []
    }

    update(date) {

    }

    update_title() {}
    update_image() {}
    update_body() {}
    update_events_list() {}


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


//todo получать events в global scope вместе с ними инициализировать CalendarPopup, в календерь и в дей целлс передавать коллбэк для обновления попапа

