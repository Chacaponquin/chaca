import yargs from "yargs";
import { json } from "./json";
import { csv } from "./csv";
import { yaml } from "./yaml";
import { js } from "./js";
import { java } from "./java";
import { ts } from "./ts";
import { postgresql } from "./postgresql";

yargs.command(json);
yargs.command(csv);
yargs.command(yaml);
yargs.command(js);
yargs.command(java);
yargs.command(ts);
yargs.command(postgresql);

yargs.parse();
