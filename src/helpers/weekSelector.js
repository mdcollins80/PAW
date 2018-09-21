const weekSelector = () => {
  const weeks = [ 
    "2018-09-11 00:00:00-04",
    "2018-09-18 00:00:00-04",
    "2018-09-25 00:00:00-04",
    "2018-10-02 00:00:00-04",
    "2018-10-09 00:00:00-04",
    "2018-10-16 00:00:00-04",
    "2018-10-23 00:00:00-04",
    "2018-10-30 00:00:00-04",
    "2018-11-06 00:00:00-05",
    "2018-11-13 00:00:00-05",
    "2018-11-20 00:00:00-05",
    "2018-11-27 00:00:00-05",
    "2018-12-04 00:00:00-05",
    "2018-12-11 00:00:00-05",
    "2018-12-18 00:00:00-05",
    "2018-12-25 00:00:00-05"
  ]
  
  const currentWeek = weeks.findIndex(week => {
    if (Date.parse(week) > Date.now()) {
      return week
    } else {
      return 0
    }
  })
  
  return currentWeek + 1
}

export default weekSelector

// if today is after an array item, return that index
