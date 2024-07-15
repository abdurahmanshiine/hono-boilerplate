export default function customLogger(message: string, ...rest: string[]) {
  console.log(message, ...rest)
}
