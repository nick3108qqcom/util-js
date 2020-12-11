/**
 * @desc 对象数组根据 时间 字段分组 
 */
function getDate(date = new Date(), formatType) {
  date = new Date(date);
  if (formatType instanceof Array) {
    return `${date.getFullYear()}${formatType[0]}${date.getMonth() + 1}${formatType[1]}${date.getDate()}${formatType[2]}`;
  } else {
    return `${date.getFullYear()}${formatType}${date.getMonth() + 1}${formatType}${date.getDate()}`;
  }
}

function groupByKey(arr, result = []) {
  const currentTime = getDate(new Date(), '-')
  arr.forEach(item => {
    const { time } = item;
    item['_time'] = getDate(new Date(time), '-');
    item['_showTime'] = currentTime == item['_time'] ? '今天' : getDate(new Date(time), ['年', '月', '日'])
  })

  arr.forEach(item => {
    if (result.length > 0) {
      let sameTimeIndex = result.findIndex(v => {
        return v._time == item._time
      })

      if (sameTimeIndex > -1) {
        result[sameTimeIndex].items.push(item)
      } else {
        result.push({
          _time: item._time,
          _showTime: item._showTime,
          items: [item]
        })
      }

    } else {
      result.push({
        _time: item._time,
        _showTime: item._showTime,
        items: [item]
      })
    }
  })
  return result
}

var data = [
  {
    time: '2020-12-11',
    value: 1
  },
  {
    time: '2020-01-02',
    value: 1
  },
  {
    time: '2020-01-02',
    value: 5
  },
  {
    time: '2020-01-03',
    value: 5
  },
]

console.log(groupByKey(data))