// src/lib/db.ts
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "customers.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'consultation',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(phone_number, source)
  )
`);

// safety net if you already had a customers.db from before the "source" column existed
try {
  db.exec(`ALTER TABLE customers ADD COLUMN source TEXT NOT NULL DEFAULT 'consultation'`);
} catch {
  // column already exists — ignore
}

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,
    plan_id TEXT NOT NULL,
    cycle TEXT NOT NULL,
    amount INTEGER NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    authority TEXT,
    ref_id TEXT,
    card_pan TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    fail_reason TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    paid_at TEXT
  )
`);

/* ------------------------------ customers ------------------------------ */

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  source: string;
  createdAt: string;
}

function mapRow(row: any): Customer {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    phoneNumber: row.phone_number,
    source: row.source,
    createdAt: row.created_at,
  };
}

export function insertCustomer(data: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  source?: string;
}): Customer {
  const source = data.source || "consultation";
  const info = db
    .prepare(
      `INSERT INTO customers (first_name, last_name, phone_number, source) VALUES (?, ?, ?, ?)`
    )
    .run(data.firstName, data.lastName, data.phoneNumber, source);
  return getCustomerById(info.lastInsertRowid as number)!;
}

export function getCustomerByPhoneAndSource(
  phoneNumber: string,
  source: string
): Customer | undefined {
  const row = db
    .prepare(`SELECT * FROM customers WHERE phone_number = ? AND source = ?`)
    .get(phoneNumber, source) as any;
  return row ? mapRow(row) : undefined;
}

export function getCustomerById(id: number): Customer | undefined {
  const row = db.prepare(`SELECT * FROM customers WHERE id = ?`).get(id) as any;
  return row ? mapRow(row) : undefined;
}

export function getAllCustomers(): Customer[] {
  return (db.prepare(`SELECT * FROM customers ORDER BY created_at DESC`).all() as any[]).map(
    mapRow
  );
}

export function getCustomersBySource(source: string): Customer[] {
  return (
    db
      .prepare(`SELECT * FROM customers WHERE source = ? ORDER BY created_at DESC`)
      .all(source) as any[]
  ).map(mapRow);
}

/* ------------------------------- orders -------------------------------- */

export type OrderStatus = "pending" | "paid" | "failed";

export interface Order {
  id: number;
  publicId: string;
  planId: string;
  cycle: "monthly" | "yearly";
  amount: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  authority: string | null;
  refId: string | null;
  cardPan: string | null;
  status: OrderStatus;
  failReason: string | null;
  createdAt: string;
  paidAt: string | null;
}

function mapOrder(row: any): Order {
  return {
    id: row.id,
    publicId: row.public_id,
    planId: row.plan_id,
    cycle: row.cycle,
    amount: row.amount,
    firstName: row.first_name,
    lastName: row.last_name,
    phoneNumber: row.phone_number,
    authority: row.authority,
    refId: row.ref_id,
    cardPan: row.card_pan,
    status: row.status,
    failReason: row.fail_reason,
    createdAt: row.created_at,
    paidAt: row.paid_at,
  };
}

export function createOrder(data: {
  publicId: string;
  planId: string;
  cycle: "monthly" | "yearly";
  amount: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}): Order {
  db.prepare(
    `INSERT INTO orders (public_id, plan_id, cycle, amount, first_name, last_name, phone_number)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    data.publicId,
    data.planId,
    data.cycle,
    data.amount,
    data.firstName,
    data.lastName,
    data.phoneNumber
  );
  return getOrderByPublicId(data.publicId)!;
}

export function getOrderByPublicId(publicId: string): Order | undefined {
  const row = db.prepare(`SELECT * FROM orders WHERE public_id = ?`).get(publicId) as any;
  return row ? mapOrder(row) : undefined;
}

export function setOrderAuthority(publicId: string, authority: string) {
  db.prepare(`UPDATE orders SET authority = ? WHERE public_id = ?`).run(authority, publicId);
}

export function markOrderPaid(publicId: string, refId?: string, cardPan?: string) {
  db.prepare(
    `UPDATE orders SET status = 'paid', ref_id = ?, card_pan = ?, fail_reason = NULL, paid_at = datetime('now')
     WHERE public_id = ?`
  ).run(refId ?? null, cardPan ?? null, publicId);
}

export function markOrderFailed(publicId: string, reason: string) {
  db.prepare(
    `UPDATE orders SET status = 'failed', fail_reason = ? WHERE public_id = ? AND status != 'paid'`
  ).run(reason, publicId);
}
