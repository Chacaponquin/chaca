import { chaca, modules } from "../../../../../../src";

export const TRANSPORTER_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.person.fullName(),
  phone: () => modules.phone.number(),
  email: () => modules.internet.email(),
});
