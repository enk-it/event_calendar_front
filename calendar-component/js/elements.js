export const mark_event = (day) => {day.classList.add("event")}
export const unmark_event = (day) => {day.classList.remove("event")}

export const mark_main  = (day) => {
    day.classList.add("main")
    day.classList.remove("secondary")
}
export const mark_secondary  = (day) => {
    day.classList.add("secondary")
    day.classList.remove("main")
}

export const set_text = (day, text) => {day.getElementsByClassName('date')[0].innerHTML = text}
export const set_text_today = (day, text) => {day.getElementsByClassName('extra-text')[0].innerHTML = text}
export const clear_days = (days) => {
    for (let i = 0; i < days.length; i++){
        mark_event(days[i])
        mark_main(days[i])
        set_text(days[i], '')
    }
}
