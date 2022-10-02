import { faker } from "@faker-js/faker";
import { SchemaField } from "../utils/SchemaField";

export class MusicSchema {
  public songName(): SchemaField {
    return new SchemaField("songName", faker.music.songName, {});
  }

  public gender(): SchemaField {
    return new SchemaField("gender", faker.music.genre, {});
  }
}
