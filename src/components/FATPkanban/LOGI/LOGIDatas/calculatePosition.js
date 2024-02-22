export default function GetXPositionOfGause(index, count) {
  var positionPercent = 50
  switch (count) {
    case 5:
      positionPercent = [10, 30, 50, 70, 90][index]
      break
    case 4:
      positionPercent = [10, 35, 60, 85][index]
      break
    case 3:
      positionPercent = [20, 50, 80][index]
      break
    case 2:
      positionPercent = [35, 65][index]
      break
    case 1:
      positionPercent = 50
      break
    default:
      positionPercent = 50
  }

  //let xxx = [`${positionPercent}%`, "50%"]
  //console.log(xxx)
  return positionPercent
}
