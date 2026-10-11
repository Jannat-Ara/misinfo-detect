const ADJECTIVES = ["Curious", "Sharp", "Careful", "Clever", "Sneaky", "Calm", "Bold", "Quiet", "Quick", "Wise"];
const ANIMALS = ["Owl", "Fox", "Otter", "Falcon", "Panda", "Lynx", "Heron", "Badger", "Koala", "Raven"];


function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function anonymousName(): string {
  const number = Math.floor(Math.random() * 90) + 10; 
  return `${pick(ADJECTIVES)} ${pick(ANIMALS)} ${number}`;
}