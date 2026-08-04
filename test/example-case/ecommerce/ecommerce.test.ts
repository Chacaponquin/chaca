import { describe, expect, it } from "vitest";
import { ExampleCaseTest } from "../core/example-case";
import { ECOMMERCE_DATASET } from "./definitions/definition";

describe("Ecommerce case", () => {
  const example = new ExampleCaseTest({
    dataset: ECOMMERCE_DATASET,
    check: (data) => {
      const users = data["User"];
      const clients = data["Client"];
      const employees = data["Employee"];
      const orderDetails = data["OrderDetail"];
      const payments = data["Payment"];
      const orders = data["Order"];
      const products = data["Product"];
      const shipments = data["Shipment"];
      const tickets = data["SupportTicket"];

      describe("clients", () => {
        it("user clients length = clients length", () => {
          expect(clients.length).toBe(
            users.filter((u: { role: string }) => u.role === "client").length,
          );
        });

        it("all clients are from user clients", () => {
          for (const c of clients) {
            const found = users.find((u: { id: string }) => u.id === c.id);

            expect(found).not.toBeUndefined();
            expect(found.role).toBe("client");
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
      });

      describe("employees", () => {
        it("user employees length = employees length", () => {
          expect(employees.length).toBe(
            users.filter((u: { role: string }) => u.role === "employee").length,
          );
        });

        it("all employees are from user employee", () => {
          for (const c of employees) {
            const found = users.find((u: { id: string }) => u.id === c.id);

            expect(found).not.toBeUndefined();
            expect(found.role).toBe("employee");
          }
        });
      });

      describe("products", () => {
        it("price must be greater than or equal to cost", () => {
          for (const p of products) {
            expect(p.price).toBeGreaterThanOrEqual(p.cost);
          }
        });
      });

      describe("order details", () => {
        it("order products must be uniques", () => {
          for (const o of orderDetails) {
            for (const so of orderDetails) {
              if (so.order_id === o.order_id && so !== o) {
                expect(so.product_id).not.toBe(o.product_id);
              }
            }
          }
        });

        it("count must be between 1 and 10", () => {
          for (const d of orderDetails) {
            expect(d.count).toBeGreaterThanOrEqual(1);
            expect(d.count).toBeLessThanOrEqual(10);
          }
        });

        it("unit_price must be the price of the referenced product", () => {
          for (const d of orderDetails) {
            const product = products.find(
              (p: { id: string }) => p.id === d.product_id,
            );

            expect(product).not.toBeUndefined();
            expect(d.unit_price).toBe(product.price);
          }
        });

        it("subtotal must be count * unit_price", () => {
          for (const d of orderDetails) {
            expect(d.subtotal).toBe(d.count * d.unit_price);
          }
        });

        it("referenced product must be created before the order date", () => {
          for (const d of orderDetails) {
            const order = orders.find(
              (o: { id: string }) => o.id === d.order_id,
            );
            const product = products.find(
              (p: { id: string }) => p.id === d.product_id,
            );

            expect(order.order_date.getTime()).toBeGreaterThan(
              product.created_at.getTime(),
            );
          }
        });
      });

      describe("payments", () => {
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

        it("amount must be the total of the referenced order", () => {
          for (const p of payments) {
            const order = orders.find(
              (o: { id: string }) => o.id === p.order_id,
            );

            expect(p.amount).toBe(order.total);
          }
        });

        it("pay_date must be after the order date", () => {
          for (const p of payments) {
            const order = orders.find(
              (o: { id: string }) => o.id === p.order_id,
            );

            expect(p.pay_date.getTime()).toBeGreaterThanOrEqual(
              order.order_date.getTime(),
            );
          }
        });
      });

      describe("shipments", () => {
        it("an order can have at most one shipment", () => {
          for (const s of shipments) {
            const sameOrder = shipments.filter(
              (o: { order_id: string }) => o.order_id === s.order_id,
            );

            expect(sameOrder).toHaveLength(1);
          }
        });

        it("if order.status = 'delivered' => shipment.status = 'delivered'", () => {
          for (const s of shipments) {
            const order = orders.find(
              (o: { id: string }) => o.id === s.order_id,
            );

            expect(order).not.toBeUndefined();

            if (order.status === "delivered") {
              expect(s.status).toBe("delivered");
            }
          }
        });

        it("send_date only exists for shipments that left the warehouse", () => {
          for (const s of shipments) {
            if (s.status === "pending") {
              expect(s.send_date).toBeNull();
            } else {
              expect(s.send_date).not.toBeNull();

              const order = orders.find(
                (o: { id: string }) => o.id === s.order_id,
              );

              expect(s.send_date.getTime()).toBeGreaterThanOrEqual(
                order.order_date.getTime(),
              );
            }
          }
        });

        it("deliver_date only exists for 'delivered' and 'returned' shipments and is after send_date", () => {
          for (const s of shipments) {
            if (s.status === "delivered" || s.status === "returned") {
              expect(s.deliver_date).not.toBeNull();
              expect(s.deliver_date.getTime()).toBeGreaterThanOrEqual(
                s.send_date.getTime(),
              );
            } else {
              expect(s.deliver_date).toBeNull();
            }
          }
        });
      });

      describe("support tickets", () => {
        it("created_at must be after the order date", () => {
          for (const t of tickets) {
            const order = orders.find(
              (o: { id: string }) => o.id === t.order_id,
            );

            expect(order).not.toBeUndefined();
            expect(t.created_at.getTime()).toBeGreaterThanOrEqual(
              order.order_date.getTime(),
            );
          }
        });

        it("close_date only exists for closed tickets and is after created_at", () => {
          for (const t of tickets) {
            if (t.status === "closed") {
              expect(t.close_date).not.toBeNull();
              expect(t.close_date.getTime()).toBeGreaterThanOrEqual(
                t.created_at.getTime(),
              );
            } else {
              expect(t.close_date).toBeNull();
            }
          }
        });
      });
    },
  });

  example.execute();
});
