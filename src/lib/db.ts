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