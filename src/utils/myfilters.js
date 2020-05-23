export const timeformat = (data, spe) => {
  spe = spe || '/'
  var year = new Date(data).getFullYear()
  var month = new Date(data).getMonth() + 1
  var day = new Date(data).getDate()
  return year + spe + month + spe + day
}
