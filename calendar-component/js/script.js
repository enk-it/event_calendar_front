const mark_event = (day) => {day.classList.add("event")}
const unmark_event = (day) => {day.classList.remove("event")}

const mark_main  = (day) => {
    day.classList.add("main")
    day.classList.remove("secondary")
}
const mark_secondary  = (day) => {
    day.classList.add("secondary")
    day.classList.remove("main")
}

const set_text = (day, text) => {day.getElementsByClassName('date')[0].innerHTML = text}
const set_date_attr = (day, date) => {day.setAttribute("data-calendar-date", date)}
const set_text_today = (day, text) => {day.getElementsByClassName('extra-text')[0].innerHTML = text}
const clear_days = (days) => {
    for (let i = 0; i < days.length; i++){
        mark_event(days[i])
        mark_main(days[i])
        set_text(days[i], '')
    }
}


//######################################################################################################################


const fix_weekday = (weekday) => {
    if (weekday == 0) {
        return 6
    }
    else {
        return weekday - 1
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

const get_current_month_year = () => {
    const date = new Date()
    return {month: date.getMonth(), year: date.getFullYear()}
}

const get_next_month_year = ({month, year}) => {
    if (month !== 11) {
        return {month: month + 1, year: year}
    }
    else {
        return {month: 1, year: year + 1}
    }
}

const get_previous_month_year = ({month, year}) => {
    if (month !== 0) {
        return {month: month - 1, year: year}
    }
    else {
        return {month: 11, year: year - 1}
    }
}

const get_month_days = ({month, year}) => {
    var result = []
    var week_num = 0

    for (let i = 1; i <= 31; i++) {
        const date = new Date(
            year.toString() + '-' +
            (month + 1).toString() + '-' +
            i.toString()
        )

        if (date.getDate() !== i) {
            break
        }

        let temp = {
            date: date.getDate(),
            month: month,
            year: year,
            week_num: week_num,
            week_day: fix_weekday(date.getDay())
        }

        result.push(
            temp
        )

        if (date.getDay() === 0){
            week_num += 1
        }

    }
    return result
}


const get_calendar_ready = (previous, current, next) => {
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


//######################################################################################################################


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
const save_events = () => {}


const update_current_event = (date) => {
    console.log(date)
}


//######################################################################################################################


const add_leading_zero = (number) => {
    if (number.length == 2) {
        return number
    }
    return '0' + number

}

async function main() {
    function set_options ({month, year}) {
        month_select.value = month.toString()
        year_select.value = year.toString()
    }


    function update_calendar(month_year) {
        clear_days(days)

        const next_my = get_next_month_year(month_year)
        const previous_my = get_previous_month_year(month_year)

        const previous_month_days = get_month_days(previous_my)
        const current_month_days = get_month_days(month_year)
        const next_month_days = get_month_days(next_my)

        const rendered_calendar = get_calendar_ready(
            previous_month_days,
            current_month_days,
            next_month_days
        )


        for (let i = 0; i < days.length; i++) {
            let current_day = rendered_calendar[i]
            let current_day_element = days[i]

            set_date_attr(
                current_day_element,
                current_day.year.toString() + "-" +
                add_leading_zero((current_day.month + 1).toString()) + "-" +
                add_leading_zero(current_day.date.toString())
            )

            if (current_day.main === true) {
                mark_main(current_day_element)
            }
            else {
                mark_secondary(current_day_element)
            }
            if (current_day.today === true) {
                set_text_today(current_day_element, "Сегодня")
            }
            else {
                set_text_today(current_day_element, "")
            }
            // activate(current_day_element)
            set_text(current_day_element, current_day.date)
        }
    }


    function reset() {
        const current_my = get_current_month_year()
        set_options(current_my)
        update_calendar(current_my)
    }

    const days = document.getElementsByClassName(
        "cell"
    )

    const month_select = document.getElementById("month")
    const year_select = document.getElementById("year")
    const reset_span = document.getElementById("reset")

    reset_span.addEventListener('click', () => {reset()})
    month_select.addEventListener('change', () => {
        update_calendar(
            {
                month: parseInt(month_select.value),
                year: parseInt(year_select.value)
            }
        )
    })
    year_select.addEventListener('change', () => {
        update_calendar(
            {
                month: parseInt(month_select.value),
                year: parseInt(year_select.value)
            }
        )
    }
    )



    for (let i = 0; i < days.length; i++) {
        days[i].addEventListener(
            'click',
            (e) => {
                let date_clicked = days[i].getAttribute("data-calendar-date")
                update_current_event(date_clicked)
            }
        )
    }

    reset()
    let result = await fetch_events()
    console.log(result)
}

main()



