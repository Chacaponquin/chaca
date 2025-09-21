import { describe, expect, it } from "vitest";
import { ExampleCaseTest } from "./core/example-case";
import { ECOMMERCE_DATASET } from "./core/definitions/ecommerce/definition";

describe("Ecommerce case", () => {
  const example = new ExampleCaseTest({
    dataset: ECOMMERCE_DATASET,
    filename: "ecommerce",
    location: "ecommerce",
    check: (data) => {
      const users = data["User"];
      const clients = data["Client"];
      const employees = data["Employee"];
      const orderDetails = data["OrderDetail"];
      const payments = data["Payment"];
      const orders = data["Order"];

      it("all clients are from user clients", () => {
        for (const c of clients) {
          const found = users.find((u: { id: string }) => u.id === c.id);

          expect(found).not.toBeUndefined();
          expect(found.role).toBe("client");
        }
      });

      it("all employees are from user employee", () => {
        for (const c of employees) {
          const found = users.find((u: { id: string }) => u.id === c.id);

          expect(found).not.toBeUndefined();
          expect(found.role).toBe("employee");
        }
      });

      it("more normal clients than the others", () => {
        let normalCount = 0;
        let premiumCount = 0;
        let vipCount = 0;

        for (const c of clients) {
          if (c.level === "normal") {
            normalCount++;
          } else if (c.level === "premium") {
            premiumCount++;
          } else if (c.level === "vip") {
            vipCount++;
          }
        }

        expect(normalCount).toBeGreaterThan(vipCount);
        expect(normalCount).toBeGreaterThan(premiumCount);
      });

      it("order products must be uniques", () => {
        for (const o of orderDetails) {
          for (const so of orderDetails) {
            if (so.order_id === o.order_id && so !== o) {
              expect(so.product_id).not.toBe(o.product_id);
            }
          }
        }
      });

      describe("payment status", () => {
        it("if order.status = 'delivered' => payment.status = 'completed'", () => {
          for (const p of payments) {
            const order = orders.find(
              (o: { status: string; id: string }) => o.id === p.order_id,
            );

            expect(order).not.toBeUndefined();

            if (order.status === "delivered") {
              expect(p.status).toBe("completed");
            }
          }
        });
      });
    },
  });

  example.execute();
});
