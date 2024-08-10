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
