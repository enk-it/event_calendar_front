import {set_text_today, mark_event, unmark_event, mark_main, mark_secondary, set_text, clear_days} from "./elements.js";
import {get_current_month_year, get_next_month_year, get_previous_month_year, get_month_days, get_calendar_ready} from "./date_time.js";


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
})

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



reset()

const asd = "123"
