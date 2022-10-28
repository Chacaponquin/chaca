import { faker } from "@faker-js/faker";
import { SchemaField } from "../SchemaField";

export class MusicSchema {
  public songName(): SchemaField {
    return new SchemaField<string>("songName", faker.music.songName, {});
  }

  public gender(): SchemaField {
    return new SchemaField<string>("gender", faker.music.genre, {});
  }
}
