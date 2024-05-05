export default function censorMessage(msg) {
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (phoneRegex.test(msg) || emailRegex.test(msg)) {
    return msg.replace(msg, "**************");
  }

  return msg;
}
