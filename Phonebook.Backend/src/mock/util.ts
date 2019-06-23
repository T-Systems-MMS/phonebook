export function generateArray(length: number, functionToExecute: Function, args = null) {
  let arr = new Array();
  for (let i = 0; i < length; i++) {
    if (args) {
      arr.push(functionToExecute(args));
    } else {
      arr.push(functionToExecute());
    }
  }

  return arr;
}
