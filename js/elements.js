export const mark_event = (day) => {day.classList.add("event")}
export const unmark_event = (day) => {day.classList.remove("event")}
export const activate  = (day) => {day.classList.add("active")}
export const deactivate  = (day) => {day.classList.remove("active")}
export const set_text = (day, text) => {day.innerHTML = text}
export const clear_days = (days) => {
    for (let i = 0; i < days.length; i++){
        unmark_event(days[i])
        deactivate(days[i])
        set_text(days[i], '')
    }
}
