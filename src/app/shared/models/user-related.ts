export class User {
  username: string;
  id: number;
  level: number;
  xp: number;

  constructor(username: string, id: number, level: number, xp: number) {
    this.username = username;
    this.id = id;
    this.level = level;
    this.xp = xp;
  }
}

export class Pet {
  name: string;
  owner: User;
  mood: Mood;

  constructor(name: string, owner: User, mood: Mood) {
    this.name = name;
    this.owner = owner;
    this.mood = mood;
  }
}

export class Mood {
  happiness: number;
  toilet: number;
  hunger: number;
  attention: number;
  dirtiness: number;
}

export enum Spirit {
  PLAYFUL = "I'm feeling playful!",
  TIRED = "I'm so tired...",
  HAPPY = "I'm so happy!",
  WALK = "I could go for a walk...",
  HUNGRY = "I'm hungry!",
  BATH = "I could use a bath..."
}
