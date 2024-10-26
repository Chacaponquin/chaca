import { chaca, modules } from "../../../../../../../src";

export const CREDENTIAL = chaca.schema({
  user_id: chaca.ref("User.id"),
  provider_key: chaca.key(() => chaca.utils.replaceSymbols("############")),
  provider_id: chaca.key(() =>
    chaca.utils.oneOfArray(["google", "facebook", "twitter", "email"]),
  ),
  hasher: chaca.enum(["md5", "sha1", "sha256"]),
  password_hash: () => modules.internet.password(),
  password_salt: () => modules.internet.password(),
});
