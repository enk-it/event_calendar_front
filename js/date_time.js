const fix_weekday = (weekday) => {
    if (weekday == 0) {
        return 6
    }
    else {
        return weekday - 1
    }
}

const get_today = () => {
    const date = new Date()
    return date.getDate()
}

export const get_current_month_year = () => {
    const date = new Date()
    return {month: date.getMonth(), year: date.getFullYear()}
}

export const get_next_month_year = ({month, year}) => {
    if (month !== 11) {
        return {month: month + 1, year: year}
    }
    else {
        return {month: 1, year: year + 1}
    }
}

export const get_previous_month_year = ({month, year}) => {
    if (month !== 0) {
        return {month: month - 1, year: year}
    }
    else {
        return {month: 11, year: year - 1}
    }
}

export const get_month_days = ({month, year}) => {
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


export const get_calendar_ready = (previous, current, next) => {
    const today = get_today()

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
        if (temp.date == today) {
            temp.today = true
        }
        else {
            temp.today = false
        }
        result.push(temp)
    }

    // Если месяц оканчивается не на воскресенье, то "потерянные" дни недели берём с предыдущего месяцв
    if (current[current.length - 1].week_day !== 6) {
        for (let i = 0; i < 10 ; i++) {
            let temp = next[i]
            temp.main = false
            temp.today = false
            result.push(temp)
        }
    }

    return result
}