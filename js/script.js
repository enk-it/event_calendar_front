const mark_event = (day) => {
    day.classList.add("event")
}

const unmark_event = (day) => {
    day.classList.remove("event")
}

const activate  = (day) => {
    day.classList.add("active")
}

const deactivate  = (day) => {
    day.classList.remove("active")
}

const set_text = (day, text) => {
    day.innerHTML = text
}

const get_current_month = () => {

}

const get_today = () => {
    const date = new Date('2024-01-31');
    console.log(date);
    console.log(date.getDay());
    console.log(date.getDate());
}


const get_month_days = (year, month) => {
    result = []

    week_num = 0

    for (let i = 1; i <= 31; i++) {
        const date = new Date(
            year.toString() + '-' +
            month.toString() + '-' +
            i.toString()
        )

        if (date.getDate() !== i) {
            break
        }

        if (date.getDay() == 0){
            week_num += 1
        }

        result.push(
            {
                weekday: date.getDay(),
                date: date.getDate(),
                week: week_num
            }
        )

    }
    console.log(result)
    return result
}

const clear_days = (days) => {
    for (let i = 0; i < days.length; i++){
        unmark_event(days[i])
        deactivate(days[i])
        set_text(days[i], '')
    }
}


const get_all_days = (year) => {
    result = []
    for (let i = 1; i <= 365; i++){
        date = new Date(
            year.toString() + '-01-' + i.toString()
        )
        console.log(date)
    }
}

function main(){
    const days = document.getElementsByClassName(
        "day"
    )

    clear_days(days)


    month_days = get_month_days(2024, 8)

    for (i = 0; i < month_days.length; i++){
        current_day = month_days[i]
        current_day_element = days[7 * current_day.week + current_day.weekday - 1]

        activate(current_day_element)
        set_text(current_day_element, current_day.date)
    }


/*
* написать метод который бы возвращал текущий месяц-год (два числа)
* написать метод который по паре месяц-год возвращал бы все дни месяца
* написать метод который бы возвращал по месяцу-году (два числа) готовый календарь)
* написать метод который по паре месяц-год возвращал бы следующую пару месяц-год (следующий месяц)
* написать метод который по паре месяц-год возвращал бы предыдущую пару месяц-год (пред месяц)*/

// alert(days.length)

    console.log(days)
}

// get_all_days(2024)
// get_today()
get_month_days(2024, 2)
// main()