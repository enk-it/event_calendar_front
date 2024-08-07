import {set_text_today, mark_event, unmark_event, mark_main, mark_secondary, set_text, clear_days} from "./elements.js";
import {get_current_month_year, get_next_month_year, get_previous_month_year, get_month_days, get_calendar_ready} from "./date_time.js";

function main() {
    const days = document.getElementsByClassName(
        "cell"
    )

    clear_days(days)


    const _current_my = get_current_month_year()
    const current_my = get_next_month_year(_current_my)



    const next_my = get_next_month_year(current_my)
    const previous_my = get_previous_month_year(current_my)

    const previous_month_days = get_month_days(previous_my)
    const current_month_days = get_month_days(current_my)
    const next_month_days = get_month_days(next_my)

    const rendered_calendar = get_calendar_ready(
            previous_month_days,
            current_month_days,
            next_month_days
        )

    console.log(days)
    console.log(rendered_calendar)


    for (let i = 0; i < days.length; i++) {
        let current_day = rendered_calendar[i]
        let current_day_element = days[i]

        if (current_day.main === true) {
            mark_main(current_day_element)
        }
        if (current_day.today === true) {
            set_text_today(current_day_element, "Сегодня")
        }
        // activate(current_day_element)
        set_text(current_day_element, current_day.date)
    }
}

/*
* написать метод который по паре месяц-год возвращал бы все дни месяца
* написать метод который бы возвращал по месяцу-году (два числа) готовый календарь)
*/

console.log("asdas")

main()