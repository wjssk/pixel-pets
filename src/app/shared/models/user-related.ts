export class User {
  username: string;
  email: string;
  level: number;
  xp: number;
  coins: number;
  hasPet: boolean;
  pet: Pet;

  constructor(
    username: string,
    email: string,
    level: number,
    xp: number,
    coins: number,
    hasPet: boolean,
    pet: Pet,
  ) {
    this.username = username;
    this.email = email;
    this.level = level;
    this.xp = xp;
    this.coins = coins;
    this.hasPet = hasPet;
    this.pet = pet;
  }
}

export class Pet {
  name: string;
  mood: Mood;

  constructor(name: string, mood: Mood) {
    this.name = name;
    this.mood = mood;
  }
}

export class Mood {
  happiness: number;
  toilet: number;
  hunger: number;
  attention: number;
  dirtiness: number;

  constructor(
    happiness: number,
    toilet: number,
    hunger: number,
    attention: number,
    dirtiness: number,
  ) {
    this.happiness = happiness;
    this.toilet = toilet;
    this.hunger = hunger;
    this.attention = attention;
    this.dirtiness = dirtiness;
  }
}

export enum Spirit {
  PLAYFUL = "I'm feeling playful!",
  TIRED = "I'm so tired...",
  HAPPY = "I'm so happy!",
  WALK = 'I could go for a walk...',
  HUNGRY = "I'm hungry!",
  BATH = 'I could use a bath...',
}
