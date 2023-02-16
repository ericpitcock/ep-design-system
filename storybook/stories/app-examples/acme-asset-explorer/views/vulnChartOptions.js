import faker from 'faker'

const categories = [
  'Low',
  'Medium',
  'High',
  'Critical'
]

// generate X number of concurrent dates
const fakeArrayOfDates = (length) => {
  let arr = []
  let date = new Date()
  for (let i = 0; i < length; i++) {
    arr.push(date.getTime())
    date.setDate(date.getDate() - 1)
  }
  return arr.reverse()
}


const fakeArrayOfNumbers = (length) => {
  let arr = []
  for (let i = 0; i < length; i++) {
    arr.push(faker.datatype.number({ min: 0, max: 30, precision: 1 }))
  }
  return arr
}

const stackedColumnSeries = () => {
  let array = []
  
  categories.forEach((category, index) => {
    array.push({
      name: category,
      data: fakeArrayOfNumbers(30)
    })
  })
  return array
}

const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color')

const vulnChartOptions = {
  chart: {
    backgroundColor: undefined,
    style: {
      fontFamily: 'Proxima Nova, sans-serif'
    },
    styledMode: true,
    type: 'column'
  },
  colors: ['#e74c3c', '#f39c12', '#f1c40f', '#bdc3c7'],
  plotOptions: {
    column: {
      dataLabels: {
        enabled: false,
        // color: textColor,
        // position: 'left',
        verticalAlign: 'top'
      }
    },
    series: {
      groupPadding: 0.2,
      stacking: 'normal'
      // dataLabels: {
      //   enabled: true // IT'S HERE
      // }
    }
  },
  series: stackedColumnSeries(),
  xAxis: {
    categories: fakeArrayOfDates(30),
    labels: {
      formatter: function () {
        // let value = this.value
        var value = new Date(this.value)
        return value.toLocaleDateString({
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      },
      style: {
        color: textColor,
        fontSize: '12px'
      }
    },
    type: 'datetime'
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Total Vulnerabilities',
      style: {
        color: textColor,
        fontSize: '12px'
      }
    },
    labels: {
      style: {
        color: textColor,
        fontSize: '12px'
      }
    },
    reversedStacks: false
  }
}

export default vulnChartOptions